<template>
  <div>
    <div class="not-search" v-if="!responseWeather">
      <h2 class="title2">Busca una ciudad</h2>
    </div>
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
    <div v-if="responseWeather" class="city">
      <span @click="saveFavorite()" class="material-symbols-outlined save-icon">
        star
      </span>
      <a
        class="link-more-information"
        target="_blank"
        :href="'https://openweathermap.org/city/' + responseWeather.id"
      >
        <span class="material-symbols-outlined">
          add_circle
        </span>
        <h2 class="title5">Información</h2>
      </a>
      <div class="current-weather" v-if="responseWeather">
        <img
          class="weather_board__card__background_image"
          :src="
            require(`../../assets/weather/${responseWeather.weather[0].main.toLowerCase()}.jpg`)
          "
        />
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <span class="material-symbols-outlined location-icon">
              location_on
            </span>
            <h2 class="title3">{{ responseWeather.name }}</h2></v-col
          >
          <v-col cols="12" sm="4" md="4"
            ><div class="climate-current">
              <img
                class="city-icon"
                :src="
                  'http://openweathermap.org/img/wn/' +
                    responseWeather.weather[0].icon +
                    '@2x.png'
                "
                alt=""
              />
              <h1 class="title1">
                {{ Math.round(responseWeather.main.temp) }}ºC
              </h1>
            </div></v-col
          >
          <v-col cols="12" sm="4" md="4">
            <span class="material-symbols-outlined calendar-icon">
              calendar_month
            </span>
            <h2 class="title3">
              {{ responseWeather.dt | moment("dddd, DD MMMM") }}
            </h2></v-col
          >
        </v-row>
      </div>
      <v-divider></v-divider>
      <div class="next-days">
        <div
          class="days"
          v-for="(responseWeatherDay, i) in responseWeatherDays"
          :key="i"
        >
          <h2 class="title5">{{ responseWeatherDay.dt | moment("ddd DD") }}</h2>
          <img
            class="city-icon"
            :src="
              'http://openweathermap.org/img/wn/' +
                responseWeatherDay.weather[0].icon +
                '@2x.png'
            "
            alt=""
          />
          <div class="temperature">
            <span class="material-symbols-outlined">
              thermometer
            </span>
            <h2 class="title5">
              {{ Math.round(responseWeatherDay.temp.day) }}ºC
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    weatherCity: "",
    weatherCurrent: "",
    weatherCurrentIcon: "",
    showAlert: "",
    messageAlert: "",
    colorAlert: ""
  }),
  computed: {
    responseWeather() {
      return this.$store.state.response_weather;
    },
    responseWeatherDays() {
      let filterDate = this.$store.state.response_weather_days;
      return filterDate.slice(1);
    }
  },
  methods: {
    saveFavorite() {
      var a = JSON.parse(localStorage.getItem("favorite") || "[]");
      var index = a.findIndex(x => x.name == this.responseWeather.name);
      if (index === -1) {
        a.push(this.responseWeather);
        this.messageAlert = "Guardado";
        this.typeAlert = "success";
        this.colorAlert = "#7ecd81";
        this.showAlert = true;
      } else {
        this.messageAlert = "Ya esta guardado como favorito";
        this.typeAlert = "error";
        this.colorAlert = "#ff6e63";
        this.showAlert = true;
      }
      localStorage.setItem("favorite", JSON.stringify(a));
      setTimeout(() => (this.showAlert = false), 2000);
    }
  }
};
</script>
<style scoped>
.not-search {
  text-align: center;
  margin-top: 50px;
}
.city {
  background: white;
  border-radius: 10px;
  padding: 24px;
  position: relative;
}
.already-saved {
  position: absolute;
  top: 24px;
  right: 24px;
}
.save-icon {
  position: absolute;
  right: 24px;
  cursor: pointer;
}
.link-more-information {
  position: absolute;
  display: flex;
  text-decoration: none;
}
.link-more-information .material-symbols-outlined {
  color: #23174a;
  margin-right: 4px;
}
.current-weather {
  display: flex;
  margin: 40px auto;
  position: relative;
  z-index: 1;
  padding: 20px 0;
}
.current-weather .col-sm-4 {
  text-align: center;
  margin: auto;
}
.current-weather .col-sm-4 h2,
.current-weather .col-sm-4 h1 {
  color: white;
  text-shadow: 2px 2px 4px #bbbbbb;
}
.calendar-icon,
.location-icon {
  color: white;
  text-shadow: 2px 2px 4px #bbbbbb;
}
.current-weather .title1 {
  margin: auto 0;
}
.current-weather .title2,
.current-weather .title5 {
  margin: auto 0;
}
.current-weather .climate-current {
  margin: auto 0;
}
.next-days {
  display: grid;
  margin: 24px auto;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.next-days .title5 {
  text-align: center;
  text-transform: capitalize;
}
.next-days .days {
  border-radius: 8px;
  padding: 11px 15px 20px;
  overflow: hidden;
  text-align: center;
  border: 1px solid #0000001f;
}
.next-days .days .temperature {
  display: flex;
  justify-content: center;
}
.weather_board__card__background_image {
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.7;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
}
@media only screen and (max-width: 600px) {
  .city {
    padding: 12px;
  }
}
</style>
