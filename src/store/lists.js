import {
  getFirestore,
  collection,
  getDocs,
  // getDoc,
  addDoc,
  // setDoc,
  // doc,
} from "firebase/firestore";

export const lists = {
  namespaced: true,
  state: {
    firestore: {},
    listsCollection: {},
    userLists: [],
  },
  getters: {
    // async userLists(state) {
    //   const listsData = await getDoc(state.listsReference);
    //   return listsData.data();
    // },
  },
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
      //   const lista = {
      //     userLists: [
      //       {
      //         name: "Favoritos",
      //         movies: [],
      //       },
      //       {
      //         name: "Ver más tarde",
      //         movies: [],
      //       },
      //     ],
      //   };
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
    // async getListByName({state, rootGetters}, listName){}

    //  Funcion para verificar que la lista existe. Sirve para verificar que no hayan nombres repetidos y para encontrar listas.
    // nameExists(){}

    //  Toma el nombre de la lista, toma la refencia de las listas del usuario y modifica la lista.
    // async addNewMovieToList({state, dispatch}){

    //     const newMovie = {
    //         type: "movie",
    //         id: 580489,
    //     }
    //     const listsRef = state.listsReference
    //     await updateDoc(listsRef,{

    //     })
    // }

    // Toma el objeto de listas completo y lo vuelve a subir a firestore.
    //  async updateUserLists(){}

    // async createNewList(){}

    // Se asegura que el nombre de la nueva lista o el nombre modificado no exista en otra lista.
    // verifyListName(){}
  },
};
