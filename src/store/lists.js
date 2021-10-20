import {
  getFirestore,
  collection,
  getDocs,
  // getDoc,
  addDoc,
  updateDoc,
  // setDoc,
  doc,
} from "firebase/firestore";

export const lists = {
  namespaced: true,
  state: {
    firestore: {},
    listsCollection: {},
    userLists: [],
  },
  getters: {},
  mutations: {
    SET_FIRESTORE(state, firestore) {
      state.firestore = firestore;
    },
    SET_USER_LISTS_COLLECTION(state, listsCollection) {
      state.listsCollection = listsCollection;
    },
    SET_USER_LISTS(state, userLists) {
      state.userLists = userLists;
    },
  },
  actions: {
    getFirestore({ commit }) {
      console.log("setting firestore");
      //   console.log("User id from lists module: ", rootGetters["user/userId"]);

      const firestore = getFirestore();
      commit("SET_FIRESTORE", firestore);
    },

    async fillNewUserLists({ state }, userId) {
      const favoritos = {
        name: "Favoritos",
        movies: [],
        userId: userId,
      };
      const verMasTarde = {
        name: "Ver más tarde",
        movies: [],
        userId: userId,
      };
      const listsCollection = collection(state.firestore, "lists");
      await addDoc(listsCollection, favoritos);
      await addDoc(listsCollection, verMasTarde);
    },

    // busca las listas del usuario y las coloca en userLists.
    async updateUserLists({ state, rootGetters, commit }) {
      const currentUserId = rootGetters["user/userId"];
      const listsCollection = collection(state.firestore, "lists");
      const listsCollectionData = await getDocs(listsCollection);

      const currentUserLists = [];
      listsCollectionData.forEach((doc) => {
        if (doc.data().userId === currentUserId) {
          currentUserLists.push(doc.data());
        }
      });

      commit("SET_USER_LISTS_COLLECTION", listsCollection);
      commit("SET_USER_LISTS", currentUserLists);
    },

    // Busca una lista por el nombre y retorna su referencia para luego llamar a agregarPelicula o borrarPeliculaDeLista
    async getListRefByName({ state, rootGetters }, listName) {
      const currentUserId = rootGetters["user/userId"];
      const listsCollectionData = await getDocs(state.listsCollection);
      let requestedList = {};
      listsCollectionData.forEach((doc) => {
        const docName = doc.data().name ? doc.data().name : "";
        if (
          docName.split(" ").join("").toLowerCase() ===
            listName.split(" ").join("").toLowerCase() &&
          doc.data().userId === currentUserId
        ) {
          requestedList = doc;
        }
      });
      return requestedList;
    },

    //  Toma el nombre de la lista, toma la refencia de las listas del usuario y modifica la lista.
    async addOrRemoveMovieFromList(
      { state, dispatch },
      { listName, newMovie }
    ) {
      const requestedList = await dispatch("getListRefByName", listName);
      const listMovies = requestedList.data().movies;
      const movieInListIndex = listMovies.findIndex((movie) => {
        return movie.id === newMovie.id && movie.type === newMovie.type;
      });
      const docRef = doc(state.firestore, "lists", requestedList.id);
      if (movieInListIndex < 0) {
        console.log(
          `La pelicula ${newMovie.id} de tipo ${newMovie.type} esta siendo agregada a la lista ${listName}`
        );
        listMovies.push(newMovie);
        await updateDoc(docRef, { movies: listMovies });
      } else {
        console.log(`La pelicula esta en el index ${movieInListIndex}`);
        console.log(
          `La pelicula ${newMovie.id} de tipo ${newMovie.type} se ha eliminada de la lista ${listName}`
        );
        listMovies.splice(movieInListIndex, 1);
        await updateDoc(docRef, { movies: listMovies });
      }
      dispatch("updateUserLists");

      // await updateDoc(listsRef, {});
    },

    // Toma el objeto de listas completo y lo vuelve a subir a firestore.
    //  async createNewList(){}

    async createNewList({ state, dispatch, rootGetters }, newListName) {
      const userLists = state.userLists;
      const nameExists = userLists.some((list) => {
        return (
          list.name.split(" ").join("").toLowerCase() ===
          newListName.split(" ").join("").toLowerCase()
        );
      });
      if (!nameExists) {
        console.log(`Creando lista ${newListName}`);
        const newList = {
          name: newListName,
          movies: [],
          userId: rootGetters["user/userId"],
        };
        await addDoc(state.listsCollection, newList);
        dispatch("updateUserLists");
      } else {
        throw `La lista ${newListName} ya existe`;
      }
    },
  },
};
