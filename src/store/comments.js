
import {
    getFirestore,
    collection,
    getDocs,
    // getDoc,
    //addDoc,
    //setDoc,
    //doc,
} from "firebase/firestore";
export const comments = {
    namespaced: true,
    state: {
        firestore: {},
        commentSnapshot: [
            {
                id: 1,
                name: "Matías Morales",
                avatar: "../avatar.png",
                date: "24-09-2021,  22:30",
                comment: "En la línea solipsista del Christopher Nolan de Dunkerque (2017) o del Zack Snyder de Watchmen (2009), pero cada uno, claro, fiel a su estilo único e intransferible. Hay muy pocos directores capaces de hacerse cargo de un proyecto de presupuesto desorbitado y cargado de estrellas de primer nivel -Dune parece un all-stars: Timothée Chalamet, Zendaya, Rebecca Ferguson, Oscar Isaac, Jason Momoa, Dave Bautista, Stellan Skarsgård, Javier Bardem, Josh Brolin, Charlotte Rampling, etc- y tener la valentía de hacer con él una película tan tremendamente personal, ajena a cualquier moda imperante y que, con ello, siga resultando un espectáculo inabarcable de primer nivel. Porque esa era la sensación que me abrasaba mientras veía la película: el del espectáculo totémico que sólo puedes mirar con la boca abierta y los ojos en spinning continuo. Las imágenes que construye Villeneuve, son majestuosa...",
                likes: 12,
                dislikes: 7,
            },
            {
                id: 2,
                name: "Sergio Bastidas",
                avatar: "../avatar.png",
                date: "24-09-2021,  22:30",
                comment: "Es tal el aparataje audiovisual que uno está con el botón de fascinación en modo ON todo el rato. Cada mundo nuevo que aparece, cada castillo, cada nave, cada objeto -que fetichismo le aplica Villeneuve a los objetos sobre los que hace pivotar el relato continuamente, ya sea una cornamenta de toro, ya sea el cuchillo que acaba empuñando Paul Atreides-, están pensados hasta el último detalle, magníficamente diseñados y construidos para que sirvan al mismo tiempo de decorado y de explicación de los propios personajes. Y desde Lawrence de Arabia (1962) nadie había captado tan bien la esencia del desierto. ",
                likes: 5,
                dislikes: 1,

            },
        ],
        usuario: {},
        movieActive: 0,
    },
    getters: {
        getComments(state) {
            return state.commentSnapshot
        },
        getLengthComments(state) {
            return state.commentSnapshot.length
        }
    },
    mutations: {
        SET_FIRESTORE(state, firestore) {
            state.firestore = firestore;
        },
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
            state.movieActive = 0
        },
        SET_ALL_COMMENTS(state, allComments) {
            state.commentSnapshot = allComments
        }
    },
    actions: {
        getFirestore({ commit }) {
            const firestore = getFirestore();
            commit("SET_FIRESTORE", firestore);
        },
        async vaciarComentariosActivos(context) {
            context.commit("CLEAR_COMMENTS_ACTIVE")
        },
        async setUser(context, arrayUser) {
            context.commit("SET_ID_USER", arrayUser)
        },
        async setIdMovieActive(context, idMovie) {
            context.commit("SET_MOVIE_ACTIVE", idMovie)
        },
        async addCommentsToMovie(context, comentario) {
            //let nuevoComentario = { idUser: comentario.idUser, comment: comentario.comentario, date: comentario.fechaComentario, like: {}, dislike: {} }
            let nuevoComentario = { idUser: comentario.idUser, name: comentario.name, comment: comentario.comentario, date: comentario.fechaComentario, avatar: comentario.avatar, likes: [], dislikes: [] }
            context.commit("ADD_COMMENTS_TO_MOVIE", nuevoComentario)
        },
        async vaciarPeliculaActiva(context) {
            context.commit("CLEAR_MOVIE_ACTIVE")
        },
        async traerComentarios(context) {
            let consultarComentarios = [];
            const commentsDB = await getDocs(collection(context.state.firestore, "comments"));
            commentsDB.forEach((doc) => {
                console.log(doc.data())
                consultarComentarios.push(doc.data())
            });
            context.commit("SET_ALL_COMMENTS", consultarComentarios)
        }
    },
}