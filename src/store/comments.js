import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
export const comments = {
    namespaced: true,
    state: {
        commentSnapshot: [],
        usuario: {},
        movieActive: "",
        allUsers: [],
    },
    getters: {
        getComments(state) {
            return state.commentSnapshot
        },
        getLengthComments(state) {
            return state.commentSnapshot.length
        },
        getUserActive(state) {
            return state.usuario.id
        },
    },
    mutations: {
        SET_ID_USER(state, arrayUser) {
            state.usuario = arrayUser
        },
        SET_MOVIE_ACTIVE(state, idMovie) {
            state.movieActive = idMovie
        },
        ADD_COMMENTS_TO_MOVIE(state, comentario) {
            state.commentSnapshot.push(comentario)
        },
        CLEAR_COMMENTS_ACTIVE(state) {
            state.commentSnapshot = []
        },
        CLEAR_MOVIE_ACTIVE(state) {
            state.movieActive = ""
        },
        SET_ALL_COMMENTS(state, allComments) {
            state.commentSnapshot = allComments
        },
        SET_ALL_USERS(state, users) {
            state.allUsers = users
        },
        UPDATE_ARRAY_COMMENTS(state, newArrayComments) {
            state.commentSnapshot = newArrayComments
        },
        ADD_LIKE_TO_COMMENT(state, arreglo) {
            state.commentSnapshot[arreglo.idComment].likes.push(arreglo.idUser)
        },
        ADD_DISLIKE_TO_COMMENT(state, arreglo) {
            state.commentSnapshot[arreglo.idComment].dislikes.push(arreglo.idUser)
        },
        REMOVE_LIKE(state, arreglo) {
            state.commentSnapshot[arreglo.idComment].likes.splice(arreglo.index, 1)
        },
        REMOVE_DISLIKE(state, arreglo) {
            state.commentSnapshot[arreglo.idComment].dislikes.splice(arreglo.index, 1)
        }
    },
    actions: {
        async vaciarComentariosActivos(context) {
            context.commit("CLEAR_COMMENTS_ACTIVE")
        },
        async setUser(context, arrayUser) {
            context.commit("SET_ID_USER", arrayUser)
        },
        async setIdMovieActive(context, idMovie) {
            context.commit("SET_MOVIE_ACTIVE", idMovie)
        },
        async addCommentsToMovie({ dispatch, rootGetters, state, commit }, comentario) {
            const consultarExistencia = await getDoc(doc(rootGetters["system/getFirestore"], "comments", state.movieActive));
            if (consultarExistencia.exists()) {
                let nuevoComentario = { id: comentario.id, name: "", comment: comentario.comment, date: comentario.date, avatar: "", likes: [], dislikes: [] }
                commit("ADD_COMMENTS_TO_MOVIE", nuevoComentario)
                let nuevaColeccionComentarios = { comentarios: state.commentSnapshot }
                await setDoc(doc(collection(rootGetters["system/getFirestore"], "comments"), state.movieActive), nuevaColeccionComentarios);
                dispatch("traerComentarios")
            } else {
                let nuevoComentario = { comentarios: [{ id: comentario.id, name: "", comment: comentario.comment, date: comentario.date, avatar: "", likes: [], dislikes: [] }] }
                await setDoc(doc(collection(rootGetters["system/getFirestore"], "comments"), state.movieActive), nuevoComentario);
                dispatch("traerComentarios")
            }
        },
        async vaciarPeliculaActiva(context) {
            context.commit("CLEAR_MOVIE_ACTIVE")
        },
        async traerComentarios({ commit, rootGetters, dispatch, state }) {
            let consultarComentarios = [];
            const commentsDB = await getDoc(doc(rootGetters["system/getFirestore"], "comments", state.movieActive));
            if (commentsDB.exists()) {
                consultarComentarios = commentsDB.data().comentarios
                commit("SET_ALL_COMMENTS", consultarComentarios)
                dispatch("crearArregloComentarios")
            } else {
                console.log("Esta película aún no tiene comentarios.")
                commit("SET_ALL_COMMENTS", [])
            }
        },
        async crearArregloComentarios({ state, commit }) {
            let commentsPrimitive = state.commentSnapshot
            let usuariosActivos = state.allUsers
            let indexInfoUser = 0
            commentsPrimitive.forEach((comment) => {
                console.log(comment.id);
                indexInfoUser = usuariosActivos.findIndex(user => user.id == comment.id)
                // console.log("index of: "+indexInfoUser);
                if (indexInfoUser >= 0) {
                    comment.avatar = usuariosActivos[indexInfoUser].avatar
                    comment.name = usuariosActivos[indexInfoUser].nombre
                }
            })
            commit("UPDATE_ARRAY_COMMENTS", commentsPrimitive)
        },
        async traerTodosUsuarios({ commit, rootGetters }) {
            let consultarUsuarios = [];
            const usersDB = await getDocs(collection(rootGetters["system/getFirestore"], "users"));
            usersDB.forEach((doc) => {
                consultarUsuarios.push({ id: doc.id, nombre: doc.data().name, avatar: doc.data().avatar })
            });
            commit("SET_ALL_USERS", consultarUsuarios)
        },
        async agregarLike({ commit, state, dispatch, rootGetters }, idLike) {
            let consultarLike = state.commentSnapshot[idLike].likes.findIndex(like => like == state.usuario.id)
            let consultarDislike = state.commentSnapshot[idLike].dislikes.findIndex(dislike => dislike == state.usuario.id)
            if (consultarLike >= 0) {
                console.log("Ya existe un Like de este usuario. Por lo que se eliminará el Like.")
                dispatch("eliminarLike", idLike)
            } else if (consultarDislike >= 0) {
                console.log("Existe un Dislike de este usuario. Por lo que se eliminará el Dislike para agregar el Like.")
                dispatch("eliminarDislike", idLike)
                commit("ADD_LIKE_TO_COMMENT", { idComment: idLike, idUser: state.usuario.id })
                let nuevaColeccionComentarios = { comentarios: state.commentSnapshot }
                await setDoc(doc(collection(rootGetters["system/getFirestore"], "comments"), state.movieActive), nuevaColeccionComentarios);
                dispatch("traerComentarios")
            } else {
                commit("ADD_LIKE_TO_COMMENT", { idComment: idLike, idUser: state.usuario.id })
                let nuevaColeccionComentarios = { comentarios: state.commentSnapshot }
                await setDoc(doc(collection(rootGetters["system/getFirestore"], "comments"), state.movieActive), nuevaColeccionComentarios);
                dispatch("traerComentarios")
            }
        },
        async agregarDislike({ commit, state, dispatch, rootGetters }, idDislike) {
            let consultarLike = state.commentSnapshot[idDislike].likes.filter(like => like == state.usuario.id)
            let consultarDislike = state.commentSnapshot[idDislike].dislikes.filter(dislike => dislike == state.usuario.id)
            if (consultarDislike.length > 0) {
                console.log("Ya existe un Like de este usuario. Por lo que se eliminará el Dislike.")
                dispatch("eliminarDislike", idDislike)
            } else if (consultarLike.length > 0) {
                console.log("Existe un Like de este usuario. Por lo que se eliminará el Like para agregar el Dislike.")
                dispatch("eliminarLike", idDislike)
                commit("ADD_DISLIKE_TO_COMMENT", { idComment: idDislike, idUser: state.usuario.id })
                let nuevaColeccionComentarios = { comentarios: state.commentSnapshot }
                await setDoc(doc(collection(rootGetters["system/getFirestore"], "comments"), state.movieActive), nuevaColeccionComentarios);
                dispatch("traerComentarios")
            } else {
                commit("ADD_DISLIKE_TO_COMMENT", { idComment: idDislike, idUser: state.usuario.id })
                let nuevaColeccionComentarios = { comentarios: state.commentSnapshot }
                await setDoc(doc(collection(rootGetters["system/getFirestore"], "comments"), state.movieActive), nuevaColeccionComentarios);
                dispatch("traerComentarios")
            }
        },
        async eliminarLike({ commit, dispatch, state, rootGetters }, idLike) {
            let likeEncontrado = state.commentSnapshot[idLike].likes.findIndex(like => like == state.usuario.id)
            commit("REMOVE_LIKE", { idComment: idLike, index: likeEncontrado })
            let nuevaColeccionComentarios = { comentarios: state.commentSnapshot }
            await setDoc(doc(collection(rootGetters["system/getFirestore"], "comments"), state.movieActive), nuevaColeccionComentarios);
            dispatch("traerComentarios")
        },
        async eliminarDislike({ commit, dispatch, state, rootGetters }, idDislike) {
            let dislikeEncontrado = state.commentSnapshot[idDislike].likes.findIndex(like => like == state.usuario.id)
            commit("REMOVE_DISLIKE", { idComment: idDislike, index: dislikeEncontrado })
            let nuevaColeccionComentarios = { comentarios: state.commentSnapshot }
            await setDoc(doc(collection(rootGetters["system/getFirestore"], "comments"), state.movieActive), nuevaColeccionComentarios);
            dispatch("traerComentarios")
        }
    },
}