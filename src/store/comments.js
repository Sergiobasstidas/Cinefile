
export const comments = {
    namespaced: true,
    state: {
        commentsActive: [
            {
                id: 1,
                user: "Matías Morales",
                avatar: "../avatar.png",
                date: "24-09-2021,  22:30",
                text: "En la línea solipsista del Christopher Nolan de Dunkerque (2017) o del Zack Snyder de Watchmen (2009), pero cada uno, claro, fiel a su estilo único e intransferible. Hay muy pocos directores capaces de hacerse cargo de un proyecto de presupuesto desorbitado y cargado de estrellas de primer nivel -Dune parece un all-stars: Timothée Chalamet, Zendaya, Rebecca Ferguson, Oscar Isaac, Jason Momoa, Dave Bautista, Stellan Skarsgård, Javier Bardem, Josh Brolin, Charlotte Rampling, etc- y tener la valentía de hacer con él una película tan tremendamente personal, ajena a cualquier moda imperante y que, con ello, siga resultando un espectáculo inabarcable de primer nivel. Porque esa era la sensación que me abrasaba mientras veía la película: el del espectáculo totémico que sólo puedes mirar con la boca abierta y los ojos en spinning continuo. Las imágenes que construye Villeneuve, son majestuosa...",
                likes: 12,
                dislikes: 7,
                answers: false,
            },
            {
                id: 2,
                user: "Sergio Bastidas",
                avatar: "../avatar.png",
                date: "24-09-2021,  22:30",
                text: "Es tal el aparataje audiovisual que uno está con el botón de fascinación en modo ON todo el rato. Cada mundo nuevo que aparece, cada castillo, cada nave, cada objeto -que fetichismo le aplica Villeneuve a los objetos sobre los que hace pivotar el relato continuamente, ya sea una cornamenta de toro, ya sea el cuchillo que acaba empuñando Paul Atreides-, están pensados hasta el último detalle, magníficamente diseñados y construidos para que sirvan al mismo tiempo de decorado y de explicación de los propios personajes. Y desde Lawrence de Arabia (1962) nadie había captado tan bien la esencia del desierto. ",
                likes: 5,
                dislikes: 1,

            },
        ],
        usuario: 0
    },
    getters: {
        getComments(state){
            return state.commentsActive
        }
    },
    mutations: {
        SET_ID_USER(arrayUser){
            this.state.usuario = arrayUser
        }
    },
    actions: {
        async getUser({ rootState, commit }){
            commit("SET_ID_USER", {id: rootState.user.user.userId, info: rootState.user.user.userInfo})
        }
    },
}