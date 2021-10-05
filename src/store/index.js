import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// import Movie from "./movieClass";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    home: {
      homeSections: [
        {
          title: "Popular",
          category: "popular",
          type: "movie",
        },
        {
          title: "Mejor Valoradas",
          category: "top_rated",
          type: "movie",
        },
        {
          title: "Proximamente",
          category: "upcoming",
          type: "movie",
        },
        {
          title: "Series de TV",
          category: "popular",
          type: "tv",
        },
      ],
      homeMovies: [], // Array que se llena con los arrays de peliculas que se piden al abrir el home.
    },
    listedMovies: [], // Peliculas que seran mostradas en la seccion peliculas
    listedSeries: [], // Series que seran mostradas en la seccion Series
    detailed: {},

    API_KEY: "21b858443ab2bbdbb90fa7c26e40b421",
    BASE_URL: "https://api.themoviedb.org/3",
    POSTER_URL: "https://www.themoviedb.org/t/p/w220_and_h330_face",
    GENRES: [],
  },
  getters: {},

  mutations: {
    SET_GENRES_LIST(state, genres) {
      state.GENRES = genres;
    },
    SET_LISTED_MOVIES(state, movies) {
      state.listedMovies = movies;
    },
    SET_LISTED_SERIES(state, series) {
      state.listedSeries = series;
    },
    SETUP_HOME(state, list) {
      state.home.homeMovies.push(list);
    },
  },

  actions: {
    async getByCategory({ state, commit }, { category, type, page = 1 }) {
      try {
        const {
          data: { results },
        } = await axios.get(`${state.BASE_URL}/${type}/${category}`, {
          params: {
            api_key: state.API_KEY,
            page: page,
          },
        });
        const resultsWithType = [];
        // Agregando la key type para poder diferenciar entre pelicula o serie.
        results.forEach((result) => {
          result.type = type;
          resultsWithType.push(result);
        });
        //////////////////////////////////////////
        console.log(`${category}, ${type}:`, resultsWithType);
        type == "movie"
          ? commit("SET_LISTED_MOVIES", resultsWithType)
          : commit("SET_LISTED_SERIES", resultsWithType);
        return resultsWithType;
      } catch (e) {
        console.log(e);
      }
    },

    async initializeHome({ commit, dispatch }, { type, category }) {
      try {
        const movieArray = await dispatch("getByCategory", {
          category: category,
          page: 1,
          type: type,
        });
        commit("SETUP_HOME", movieArray);
      } catch (e) {
        console.log(e);
      }
    },

    async getGenreLists({ commit }) {
      const {
        data: { genres: movieGenres },
      } = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
        params: { api_key: "21b858443ab2bbdbb90fa7c26e40b421" },
      });
      const {
        data: { genres: tvGenres },
      } = await axios.get("https://api.themoviedb.org/3/genre/tv/list", {
        params: { api_key: "21b858443ab2bbdbb90fa7c26e40b421" },
      });
      const genres = [movieGenres, tvGenres];
      commit("SET_GENRES_LIST", genres);
    },

    async getMovieDetails({ state }, id) {
      const params = {
        params: {
          api_key: state.API_KEY,
        },
      };
      try {
        const { data: movie } = await axios.get(
          `${state.BASE_URL}/movie/${id}`,
          params
        );
        console.log(movie);
        // const {data: cast} = await axios.get(
        //   `${state.BASE_URL}/movie/${id}`,
        //   params
        // );
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: {},
});
