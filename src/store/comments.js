import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
export const comments = {
    namespaced: true,
    state: {
        commentSnapshot: [
            // {
            //     id: 1,
            //     name: "Matías Morales",
            //     avatar: "../avatar.png",
            //     date: "24-09-2021, 22:30",
            //     comment: "En la línea solipsista del Christopher Nolan de Dunkerque (2017) o del Zack Snyder de Watchmen (2009), pero cada uno, claro, fiel a su estilo único e intransferible. Hay muy pocos directores capaces de hacerse cargo de un proyecto de presupuesto desorbitado y cargado de estrellas de primer nivel -Dune parece un all-stars: Timothée Chalamet, Zendaya, Rebecca Ferguson, Oscar Isaac, Jason Momoa, Dave Bautista, Stellan Skarsgård, Javier Bardem, Josh Brolin, Charlotte Rampling, etc- y tener la valentía de hacer con él una película tan tremendamente personal, ajena a cualquier moda imperante y que, con ello, siga resultando un espectáculo inabarcable de primer nivel. Porque esa era la sensación que me abrasaba mientras veía la película: el del espectáculo totémico que sólo puedes mirar con la boca abierta y los ojos en spinning continuo. Las imágenes que construye Villeneuve, son majestuosa...",
            //     likes: 12,
            //     dislikes: 7,
            // },
            // {
            //     id: 2,
            //     name: "Sergio Bastidas",
            //     avatar: "../avatar.png",
            //     date: "24-09-2021, 22:30",
            //     comment: "Es tal el aparataje audiovisual que uno está con el botón de fascinación en modo ON todo el rato. Cada mundo nuevo que aparece, cada castillo, cada nave, cada objeto -que fetichismo le aplica Villeneuve a los objetos sobre los que hace pivotar el relato continuamente, ya sea una cornamenta de toro, ya sea el cuchillo que acaba empuñando Paul Atreides-, están pensados hasta el último detalle, magníficamente diseñados y construidos para que sirvan al mismo tiempo de decorado y de explicación de los propios personajes. Y desde Lawrence de Arabia (1962) nadie había captado tan bien la esencia del desierto. ",
            //     likes: 5,
            //     dislikes: 1,

            // },
        ],
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
        getUsers(state) {
            return state.comment
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
                consultarComentarios.push(commentsDB.data().comentarios)
                commit("SET_ALL_COMMENTS", consultarComentarios)
                dispatch("crearArregloComentarios")
            } else {
                console.log("Esta película aún no tiene comentarios.")
                commit("SET_ALL_COMMENTS", [])
            }
        },
        async crearArregloComentarios({ state, commit }) {
            let commentsPrimitive = state.commentSnapshot[0]
            let usuariosActivos = state.allUsers
            commentsPrimitive.forEach((comentario) => {
                let arrayInfoUser = usuariosActivos.filter(user => user.id == comentario.id)
                comentario.avatar = arrayInfoUser[0].avatar
                comentario.name = arrayInfoUser[0].nombre
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
        async agregarLike({ commit, state, dispatch, rootGetters }, arrayLike) {
            let consultarLike = state.commentSnapshot[arrayLike.idComment].likes.filter(like => like == arrayLike.idUser)
            let consultarDislike = state.commentSnapshot[arrayLike.idComment].dislikes.filter(dislike => dislike == arrayLike.idUser)
            if (consultarLike.length > 0) {
                console.log("Ya existe un Like de este usuario. Por lo que se eliminará el Like.")
                dispatch("eliminarLike", arrayLike)
            } else if (consultarDislike.length > 0) {
                console.log("Existe un Dislike de este usuario. Por lo que se eliminará el Dislike para agregar el Like.")
                dispatch("eliminarDislike", arrayLike)
                commit("ADD_LIKE_TO_COMMENT", arrayLike)
                let nuevaColeccionComentarios = { comentarios: state.commentSnapshot }
                await setDoc(doc(collection(rootGetters["system/getFirestore"], "comments"), state.movieActive), nuevaColeccionComentarios);
                dispatch("traerComentarios")
            } else {
                commit("ADD_LIKE_TO_COMMENT", arrayLike)
                let nuevaColeccionComentarios = { comentarios: state.commentSnapshot }
                await setDoc(doc(collection(rootGetters["system/getFirestore"], "comments"), state.movieActive), nuevaColeccionComentarios);
                dispatch("traerComentarios")
            }
        },
        async agregarDislike({ commit, state, dispatch, rootGetters }, arrayDislike) {
            let consultarLike = state.commentSnapshot[arrayDislike.idComment].likes.filter(like => like == arrayDislike.idUser)
            let consultarDislike = state.commentSnapshot[arrayDislike.idComment].dislikes.filter(dislike => dislike == arrayDislike.idUser)
            if (consultarDislike.length > 0) {
                console.log("Ya existe un Like de este usuario. Por lo que se eliminará el Dislike.")
                dispatch("eliminarDislike", arrayDislike)
            } else if (consultarLike.length > 0) {
                console.log("Existe un Like de este usuario. Por lo que se eliminará el Like para agregar el Dislike.")
                dispatch("eliminarLike", arrayDislike)
                commit("ADD_DISLIKE_TO_COMMENT", arrayDislike)
                let nuevaColeccionComentarios = { comentarios: state.commentSnapshot }
                await setDoc(doc(collection(rootGetters["system/getFirestore"], "comments"), state.movieActive), nuevaColeccionComentarios);
                dispatch("traerComentarios")
            } else {
                commit("ADD_DISLIKE_TO_COMMENT", arrayDislike)
                let nuevaColeccionComentarios = { comentarios: state.commentSnapshot }
                await setDoc(doc(collection(rootGetters["system/getFirestore"], "comments"), state.movieActive), nuevaColeccionComentarios);
                dispatch("traerComentarios")
            }
        },
        async eliminarLike({ commit, dispatch, state, rootGetters }, arrayLike) {
            let likeEncontrado = state.commentSnapshot[arrayLike.idComment].likes.findIndex(like => like == arrayLike.idUser)
            commit("REMOVE_LIKE", { idComment: arrayLike.idComment, index: likeEncontrado })
            let nuevaColeccionComentarios = { comentarios: state.commentSnapshot }
            await setDoc(doc(collection(rootGetters["system/getFirestore"], "comments"), state.movieActive), nuevaColeccionComentarios);
            dispatch("traerComentarios")
        },
        async eliminarDislike({ commit, dispatch, state, rootGetters }, arrayDislike) {
            let dislikeEncontrado = state.commentSnapshot[arrayDislike.idComment].likes.findIndex(like => like == arrayDislike.idUser)
            commit("REMOVE_DISLIKE", { idComment: arrayDislike.idComment, index: dislikeEncontrado })
            let nuevaColeccionComentarios = { comentarios: state.commentSnapshot }
            await setDoc(doc(collection(rootGetters["system/getFirestore"], "comments"), state.movieActive), nuevaColeccionComentarios);
            dispatch("traerComentarios")
        }
    },
}