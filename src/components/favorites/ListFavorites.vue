<template>
  <div>
    <div class="no-favorite" v-if="listFavorites.length == 0">
      <h2 class="title2">No tienes ningún favorito</h2>
    </div>
    <div class="cards-flex">
      <v-slide-y-transition transition="slide-x-reverse-transition">
        <v-alert
          class="already-saved"
          v-if="showAlert"
          :color="colorAlert"
          :type="typeAlert"
          transition="slide-x-reverse-transition"
          >{{ messageAlert }}
        </v-alert>
      </v-slide-y-transition>
      <div
        v-for="(listFavorite, i) in listFavorites"
        :key="i"
        cols="2"
        class="product"
      >
        <div class="weather-actual">
          <img
            class="weather_board__card__background_image"
            :src="
              require(`../../assets/weather/${listFavorite.responseWeather.weather[0].main.toLowerCase()}.jpg`)
            "
          />
          <p style="background-image: url('img_girl.jpg');"></p>
          <span
            @click="deletecity(listFavorite.responseWeather)"
            class="material-symbols-outlined delete-icon"
          >
            delete
          </span>
          <h2 class="title5">{{ listFavorite.responseWeather.name }}</h2>
          <img
            class="city-icon"
            :src="
              'http://openweathermap.org/img/wn/' +
                listFavorite.responseWeather.weather[0].icon +
                '@2x.png'
            "
            alt=""
          />
          <div class="temperature">
            <span class="material-symbols-outlined thermometer">
              thermometer
            </span>
            <h2 class="title5">
              {{ Math.round(listFavorite.responseWeather.main.temp) }}ºC
            </h2>
          </div>
        </div>
        <div class="next-days">
          <div
            class="next-days-individual"
            v-for="(responseWeatherDay, i) in listFavorite.responseWeatherDays"
            :key="i"
          >
            <h2 class="title5 number-day">
              {{ responseWeatherDay.dt | moment("ddd DD") }}
            </h2>
            <img
              class="city-icon"
              :src="
                'http://openweathermap.org/img/wn/' +
                  responseWeatherDay.weather[0].icon +
                  '@2x.png'
              "
              alt=""
            />
            <div class="temperature-days">
              <span class="material-symbols-outlined thermometer">
                thermometer
              </span>
              <h2 class="title5">
                {{ Math.round(responseWeatherDay.temp.day) }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListFavorites",
  data: () => ({
    listFavorites: {},
    showAlert: "",
    messageAlert: "",
    colorAlert: ""
  }),
  mounted() {
    this.listFavorites = JSON.parse(localStorage.getItem("favorite"));
  },
  methods: {
    deletecity(data) {
      var a = JSON.parse(localStorage.getItem("favorite") || "[]");
      var filtered = a.filter(function(el) {
        return el.responseWeather.name != data.name;
      });
      localStorage.setItem("favorite", JSON.stringify(filtered));
      this.listFavorites = JSON.parse(localStorage.getItem("favorite"));
      this.messageAlert = "Eliminado";
      this.typeAlert = "success";
      this.colorAlert = "#7ecd81";
      this.showAlert = true;
      setTimeout(() => (this.showAlert = false), 2000);
    }
  }
};
</script>
<style scoped>
.no-favorite {
  text-align: center;
  margin-top: 50px;
}
.cards-flex {
  display: grid;
  margin: 24px auto;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.product {
  background: white;
  border-radius: 8px;
  padding: 11px 15px 20px;
  overflow: hidden;
  position: relative;
  text-align: center;
  z-index: 1;
}
.product .title5 {
  color: white;
  text-shadow: 2px 2px 4px #bbbbbb;
}
.delete-icon {
  cursor: pointer;
  position: absolute;
  right: 15px;
  color: white;
}
.temperature {
  display: flex;
  justify-content: center;
}
.temperature .thermometer {
  color: white;
}
.weather_board__card__background_image {
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.8;
  width: 100%;
  height: 100%;
}
.already-saved {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 3;
}
.next-days {
  background: #ffffff61;
  border-radius: 10px;
  margin-top: 12px;
}
.next-days-individual {
  display: flex;
  justify-content: center;
}
.next-days-individual .number-day {
  margin: auto 8px auto auto;
}
.next-days-individual .number-day {
  margin: auto 8px auto auto;
}
.next-days-individual .city-icon {
  width: 50px;
  height: 50px;
}
.next-days-individual .temperature-days {
  margin: auto auto auto 8px;
  display: flex;
  justify-content: center;
}
</style>
