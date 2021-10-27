import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";

export const user = {
  namespaced: true,
  state: {
    user: {
      userId: "",
      userInfo: "",
    },
  },
  getters: {
    userId(state) {
      return state.user.userId;
    },
  },

  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.user.userInfo = userInfo;
    },
    SET_USER_ID(state, userId) {
      state.user.userId = userId;
    },
  },
  actions: {
    // Si el usuario ya existe esta funcion busca por el mail y llena la store con los datos del usuario,
    // sus listas y sus likes.
    async setUserInfo({ state, commit, dispatch, rootGetters }, mail) {
      const querySnapshot = await getDocs(
        collection(rootGetters["system/getFirestore"], "users")
      );
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

    async createNewUser({ dispatch, rootGetters }, user) {
      user.avatar =
        "https://i.ibb.co/7S1s3xZ/4043260-avatar-male-man-portrait-113269.png";
      const docref = await addDoc(
        collection(rootGetters["system/getFirestore"], "users"),
        user
      );
      dispatch("lists/fillNewUserLists", docref.id, { root: true });
      dispatch("setUserInfo", user.mail);
    },

    // userInfo = {
    //   name: "",
    //   nick: "",
    //   mail: "",
    // }

    async updateUserInfo({ state, commit, rootGetters }, updatedUserInfo) {
      // console.log(state.user.userId);
      await setDoc(
        doc(rootGetters["system/getFirestore"], `users/${state.user.userId}`),
        updatedUserInfo
      );

      commit("SET_USER_INFO", updatedUserInfo);
    },

    async verifyIfMailExists({ rootGetters, dispatch }, mail) {
      const querySnapshot = await getDocs(
        collection(rootGetters["system/getFirestore"], "users")
      );
      let mailExists = false;
      querySnapshot.forEach((doc) => {
        if (doc.data().mail == mail) {
          console.log(`El mail ${mail}, ya se encuentra registrado`);
          mailExists = true;
        }
      });
      mailExists
        ? await dispatch("setUserInfo", mail)
        : await dispatch("createNewUser", { mail: mail });
      return;
    },
  },
};
