import { firebaseApp } from "@/components/firebaseConfig.js";
import {
  getAuth,
  // signInWithPopup,
  // GoogleAuthProvide,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const system = {
  namespaced: true,
  state: {
    firebase: null,
    firestore: null,
    logedUser: false,
    drawer: false,
  },
  mutations: {
    SET_FIRESTORE(state, firestore) {
      state.firestore = firestore;
    },
    SET_FIREBASE(state, firebase) {
      state.firebase = firebase;
    },

    SET_USER(state, payload) {
      state.logedUser = payload;
    },
    SET_DRAWER(state) {
      state.drawer = !state.drawer;
    },
  },
  getters: {
    getFirestore(state) {
      return state.firestore;
    },
  },
  actions: {
    async initializeApp({ dispatch }) {
      dispatch("initializeFirebase");
      await dispatch("getGenreLists", null, { root: true });
      dispatch("initializeHome", null, { root: true });
    },

    initializeFirebase({ commit }) {
      const firestore = getFirestore();
      commit("SET_FIREBASE", firebaseApp);
      commit("SET_FIRESTORE", firestore);
    },

    registerNewUser({ commit, dispatch }, newUser) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, newUser.mail, newUser.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          commit("SET_USER", user);
          dispatch("user/createNewUser", newUser, { root: true });
        })
        .catch((error) => {
          console.log(error);
          // ..
        });
    },
    // googleLogin({ commit, dispatch }, provider) {
    //   const auth = getAuth();
    //   signInWithPopup(auth, provider)
    //     .then((result) => {
    //       // This gives you a Google Access Token. You can use it to access the Google API.
    //       const credential = GoogleAuthProvider.credentialFromResult(result);
    //       const token = credential.accessToken;
    //       // The signed-in user info.
    //       const user = result.user;
    //       commit("SET_USER", user);
    //       dispatch("user/createNewUser", newUser, { root: true });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       // ..
    //     });
    // },
    async logInUser({ commit, dispatch }, logedUser) {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          logedUser.mail,
          logedUser.password
        );
        if (userCredential) {
          commit("SET_USER", userCredential);
          dispatch("user/setUserInfo", logedUser.mail, { root: true });
          return true;
        }
      } catch {
        return false;
      }
    },

    async logOut({ commit }) {
      const auth = getAuth();
      await signOut(auth);
      commit("SET_USER", null);
    },
    toggleDrawer({ commit }) {
      commit("SET_DRAWER");
    },
  },
};
