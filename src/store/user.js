import { firebaseApp } from "@/components/firebaseConfig.js";
// import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  // getDoc,
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
    allUsers: []
  },
  getters: {
    userId(state) {
      return state.user.userId;
    },
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
    SET_ALL_USERS(state, users) {
      state.allUsers = users
    }
  },
  actions: {
    initializeFirebase({ commit, dispatch }) {
      const firestore = getFirestore();

      // TEMPORAL!!!!!!!!!!!!!!!
      dispatch("lists/getFirestore", null, { root: true });
      /////////////////////////////////////////////////

      commit("SET_FIREBASE", firebaseApp);
      commit("SET_FIRESTORE", firestore);
    },

    // Si el usuario ya existe esta funcion busca por el mail y llena la store con los datos del usuario,
    // sus listas y sus likes.
    async setUserInfo({ state, commit, dispatch }, mail) {
      const querySnapshot = await getDocs(collection(state.firestore, "users"));
      let user = state.user;
      querySnapshot.forEach((doc) => {
        if (doc.data().mail == mail) {
          return (user = { userInfo: doc.data(), userId: doc.id });
        }
      });
      commit("SET_USER_INFO", user.userInfo);
      commit("SET_USER_ID", user.userId);
      dispatch("lists/updateUserLists", null, { root: true });

      console.log(
        `Usuario logeado: ${state.user.userInfo.mail} con id ${state.user.userId}`
      );
    },

    async createNewUser({ state, dispatch }, user) {
      const docref = await addDoc(collection(state.firestore, "users"), user);
      console.log(`Usuario creado con id ${docref.id} y nombre ${user.mail}`);
      dispatch("lists/fillNewUserLists", docref.id, { root: true });
      dispatch("setUserInfo", user.mail);
    },

    // userInfo = {
    //   name: "",
    //   nick: "",
    //   mail: "",
    // }

    async updateUserInfo({ state, commit }, updatedUserInfo) {
      // console.log(state.user.userId);
      await setDoc(
        doc(state.firestore, `users/${state.user.userId}`),
        updatedUserInfo
      );

      commit("SET_USER_INFO", updatedUserInfo);
    },
    async traerTodosUsuarios({ state, commit }) {
      let consultarUsuarios = [];
      const usersDB = await getDocs(collection(state.firestore, "users"));
      usersDB.forEach((doc) => {
        consultarUsuarios.push(doc.data())
      });
      commit("SET_ALL_USERS", consultarUsuarios)
    }
  },
};
