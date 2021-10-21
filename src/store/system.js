import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const system = {
  namespaced: true,
  state: {
    logedUser: false,
    drawer: false,
  },
  actions: {
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
    logInUser({ commit, dispatch }, logedUser) {
      console.log(logedUser.mail, logedUser.password);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, logedUser.mail, logedUser.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          commit("SET_USER", user);
          dispatch("user/setUserInfo", logedUser.mail, { root: true });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async logOut({ commit }) {
      const auth = getAuth();
      await signOut(auth);
      commit("SET_USER", false);
    },
    toggleDrawer({ commit }) {
      commit("SET_DRAWER");
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.logedUser = payload;
    },
    SET_DRAWER(state) {
      state.drawer = !state.drawer;
    },
  },
};
