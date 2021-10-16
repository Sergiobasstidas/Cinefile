import firebaseConfig from "@/components/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

export const user = {
  namespaced: true,
  state: {
    firebaseApp: "",
    firestore: "",
    user: {
      userId: "",
      userInfo: "",
    },
    lists: [],
  },
  mutations: {
    SET_FIREBASE(state, firebaseApp) {
      state.firebaseApp = firebaseApp;
    },
    SET_FIRESTORE(state, firestore) {
      state.firestore = firestore;
    },
    SET_USER_INFO(state, userInfo) {
      state.user.userInfo = userInfo;
    },
    SET_USER_ID(state, userId) {
      state.user.userId = userId;
    },
  },
  actions: {
    initializeFirebase({ commit }) {
      const firebaseApp = initializeApp(firebaseConfig);
      const firestore = getFirestore();
      commit("SET_FIREBASE", firebaseApp);
      commit("SET_FIRESTORE", firestore);
    },

    // Si el usuario ya existe esta funcion busca por el mail y llena la store con los datos del usuario,
    // sus listas y sus likes.
    async setUserInfo({ state, commit }, mail) {
      const querySnapshot = await getDocs(collection(state.firestore, "users"));
      let user = state.user;
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().mail}`);
        if (doc.data().mail == mail) {
          return (user = { userInfo: doc.data(), userId: doc.id });
        }
      });
      commit("SET_USER_INFO", user.userInfo);
      commit("SET_USER_ID", user.userId);

      console.log(state.user.userId);
    },

    async createNewUser({ state, dispatch }, user) {
      const docref = await addDoc(collection(state.firestore, "users"), user);
      console.log(docref.id);
      dispatch("fillNewUserLists", docref.id);
      dispatch("setUserInfo", user.mail);
    },

    // userInfo = {
    //   name: "",
    //   nick: "",
    //   mail: "",
    //   avatarIndex: 0,
    // }

    async updateUserInfo({ state, commit }, updatedUserInfo) {
      console.log(state.user.userId);
      await setDoc(
        doc(state.firestore, `users/${state.user.userId}`),
        updatedUserInfo
      );

      commit("SET_USER_INFO", updatedUserInfo);
    },

    async fillNewUserLists({ state }, userId) {
      const lista = {
        listas: [
          {
            name: "Favoritos",
            movies: [],
          },
          {
            name: "Ver más tarde",
            movies: [],
          },
        ],
      };
      await setDoc(doc(state.firestore, `lists/${userId}`), lista);
    },

    // async getLists(){}
  },
};
