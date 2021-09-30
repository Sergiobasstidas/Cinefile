import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
      homeMovies: [],
    },
    listedMovies: [],
    listedSeries: [],

    API_KEY: "21b858443ab2bbdbb90fa7c26e40b421",
    BASE_URL: "https://api.themoviedb.org/3",
    POSTER_URL: "https://www.themoviedb.org/t/p/w220_and_h330_face",
  },
  mutations: {
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
    async getMovieByCategory({ state, commit }, { category, page = 1 }) {
      try {
        const {
          data: { results },
        } = await axios.get(`${state.BASE_URL}/movie/${category}`, {
          params: {
            api_key: state.API_KEY,
            page: page,
          },
        });
        console.log(`${category}:`, results);
        commit("SET_LISTED_MOVIES", results);
        return results;
      } catch (e) {
        console.log(e);
      }
    },

    async getSeriesByCategory({ state, commit }, { category, page = 1 }) {
      try {
        const {
          data: { results },
        } = await axios.get(`${state.BASE_URL}/tv/${category}`, {
          params: {
            api_key: state.API_KEY,
            page: page,
          },
        });
        console.log(`${category}:`, results);

        commit("SET_LISTED_SERIES", results);
        return results;
      } catch (e) {
        console.log(e);
      }
    },

    async setUpHomeCategories({ commit, dispatch }, { type, category }) {
      if (type == "movie") {
        try {
          const movies = await dispatch("getMovieByCategory", {
            category: category,
            page: 1,
          });
          commit("SETUP_HOME", movies);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const series = await dispatch("getSeriesByCategory", {
            category: category,
            page: 1,
          });
          commit("SETUP_HOME", series);
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
  modules: {},
});
