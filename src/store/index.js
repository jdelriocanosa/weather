import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    response_weather: "",
    response_weather_days: []
  },
  actions: {
    async getWeather({ commit }, data) {
      let endPoint =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        data +
        "&cnt=5&appid=167ac02e1c6c89bb8c5bbc67ae389ffe&units=metric";
      try {
        const response = await axios.get(endPoint);
        const isError = response instanceof Error;
        if (!isError) {
          commit("SET_WEATHER", { data: response.data });
          return response;
        } else {
          return response;
        }
      } catch (error) {
        return error.response;
      }
    },
    async getWeatherDays({ commit }, data) {
      let endPoint =
        "https://api.openweathermap.org/data/3.0/onecall?lat=" +
        data.lat +
        "&lon=" +
        data.lon +
        "&cnt=" +
        data.days +
        "&exclude=alerts,hourly&appid=167ac02e1c6c89bb8c5bbc67ae389ffe&units=metric";
      try {
        const response = await axios.get(endPoint);
        const isError = response instanceof Error;
        if (!isError) {
          commit("SET_WEATHER_DAYS", { data: response.data.daily });
          return response;
        } else {
          return response;
        }
      } catch (error) {
        return error.response;
      }
    }
  },
  mutations: {
    SET_WEATHER(state, actions) {
      state.response_weather = actions.data;
    },
    SET_WEATHER_DAYS(state, actions) {
      state.response_weather_days = actions.data;
    }
  }
});
