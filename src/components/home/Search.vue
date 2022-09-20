<template>
  <v-container>
    <v-row>
      <v-col
        style="display:flex;padding:12px 0!important"
        cols="12"
        sm="12"
        md="12"
      >
        <v-text-field
          v-model="city"
          hide-details="auto"
          solo
          label="Ciudad"
          @keyup.enter="search(city)"
          @input="searchClick = false"
        >
          <template v-if="!searchClick" v-slot:append>
            <v-btn
              :disabled="!city"
              depressed
              text
              class="button2"
              @click="search(city)"
            >
              Buscar
            </v-btn>
          </template>
          <template v-else v-slot:append>
            <v-btn
              :disabled="!city"
              depressed
              text
              class="button2 button-clearable-search"
              @click="clearable()"
            >
              <span class="material-symbols-outlined">
                close
              </span>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-slide-y-transition transition="slide-x-reverse-transition">
      <v-alert
        class="not-found"
        v-if="errorCity"
        :color="colorAlert"
        :type="typeAlert"
        transition="slide-x-reverse-transition"
        >{{ message }}
      </v-alert>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HelloWorld",
  data: () => ({
    city: "",
    message: "",
    errorCity: false,
    searchClick: false
  }),
  methods: {
    ...mapActions(["getWeather", "getWeatherDays"]),
    clearable() {
      this.searchClick = false;
      this.city = "";
    },
    async search() {
      this.searchClick = true;
      let response = await this["getWeather"](this.city);
      if (response.status !== 200) {
        this.errorCity = true;
        this.message = "Prueba con otra ciudad";
        this.typeAlert = "error";
        this.colorAlert = "#ff6e63";
        setTimeout(() => (this.errorCity = false), 2000);
      } else {
        let params = {};
        params.lat = response.data.coord.lat;
        params.lon = response.data.coord.lon;
        params.days = "7";
        await this["getWeatherDays"](params);
        this.errorCity = false;
      }
    }
  }
};
</script>
<style scoped>
.material-symbols-outlined {
  cursor: pointer;
}
.container {
  max-width: 100%;
}
.button-search {
  box-shadow: none;
  background: white;
  margin: auto 0;
}
.dialog-add-city {
  padding: 12px;
  background: white;
  border-radius: 12px;
}
.not-found {
  position: absolute;
  top: 24px;
  right: 24px;
}
</style>
