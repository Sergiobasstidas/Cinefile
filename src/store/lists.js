import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

export const lists = {
  namespaced: true,
  state: {
    listsCollection: {},
    userLists: [],
  },
  getters: {},
  mutations: {
    SET_USER_LISTS_COLLECTION(state, listsCollection) {
      state.listsCollection = listsCollection;
    },
    SET_USER_LISTS(state, userLists) {
      state.userLists = userLists;
    },
  },
  actions: {
    async fillNewUserLists({ rootGetters }, userId) {
      const favoritos = {
        name: "Favoritos",
        movies: [],
        userId: userId,
        default: true,
      };
      const verMasTarde = {
        name: "Ver más tarde",
        movies: [],
        userId: userId,
        default: true,
      };
      const listsCollection = collection(
        rootGetters["system/getFirestore"],
        "lists"
      );
      await addDoc(listsCollection, favoritos);
      await addDoc(listsCollection, verMasTarde);
    },

    // busca las listas del usuario y las coloca en userLists.
    async updateUserLists({ rootGetters, commit }) {
      const currentUserId = rootGetters["user/userId"];
      const listsCollection = collection(
        rootGetters["system/getFirestore"],
        "lists"
      );
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
      { rootGetters, dispatch },
      { listName, newMovie }
    ) {
      const requestedList = await dispatch("getListRefByName", listName);
      const listMovies = requestedList.data().movies;
      const movieInListIndex = listMovies.findIndex((movie) => {
        return movie.id === newMovie.id && movie.type === newMovie.type;
      });
      const docRef = doc(
        rootGetters["system/getFirestore"],
        "lists",
        requestedList.id
      );
      if (movieInListIndex < 0) {
        console.log(
          `La pelicula ${newMovie.id} de tipo ${newMovie.type} esta siendo agregada a la lista ${listName}`
        );
        listMovies.push(newMovie);
        listMovies.forEach((movie) => {
          console.log(movie);
        });
        // await updateDoc(docRef, { movies: listMovies });
        await updateDoc(docRef, { movies: arrayUnion(newMovie) });
      } else {
        console.log(
          `La pelicula ${newMovie.id} de tipo ${newMovie.type} se ha eliminada de la lista ${listName}`
        );
        listMovies.splice(movieInListIndex, 1);
        await updateDoc(docRef, { movies: listMovies });
      }
      dispatch("updateUserLists");
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

    async deleteList({ dispatch, rootGetters }, listName) {
      console.log(listName);
      const listRef = await dispatch("getListRefByName", listName);
      const listToDelete = doc(
        rootGetters["system/getFirestore"],
        "lists",
        listRef.id
      );
      console.log(listToDelete);
      await deleteDoc(listToDelete);
      dispatch("updateUserLists");
    },
  },
};
