import { firebaseApp } from "@/components/firebaseConfig.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
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
    async googleLogin({ commit, dispatch }) {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);

        GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        commit("SET_USER", user);
        await dispatch("user/verifyIfMailExists", user.email, { root: true });
        return true;
      } catch {
        return false;
      }
    },
    async recoveryPassword({commit}, user) {
      const auth = getAuth();
      try {
        await sendPasswordResetEmail(auth, user.mail);
        commit("SET_USER", null);
        return true;
      } catch (e) {
        console.log(e);
      }
    },

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
