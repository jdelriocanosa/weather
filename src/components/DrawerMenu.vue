<template>
  <div class="menu">
    <v-navigation-drawer
      class="drawer"
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      absolute
    >
      <v-list-item>
        <v-list-item-icon>
          <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>
        </v-list-item-icon>
        <v-list-item-title>Tiempo</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <router-link style="text-decoration: none" :to="'/'">
          <v-list-item class="icons" link>
            <v-list-item-icon>
              <span class="material-symbols-outlined">
                search
              </span>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Buscar</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link style="text-decoration: none" :to="'/favoritos'">
          <v-list-item class="icons" link>
            <v-list-item-icon>
              <span class="material-symbols-outlined">
                star
              </span>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Favoritos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data: () => ({
    drawer: true,
    items: [
      { title: "Buscar", icon: "mdi-home-city" },
      { title: "Favoritos", icon: "mdi-account" }
    ],
    mini: true
  })
};
</script>
<style>
.icons {
  justify-content: center;
  margin-bottom: 8px;
}
.drawer {
  min-width: 70px;
  z-index: 3;
}
@media only screen and (max-width: 600px) {
  .drawer {
    min-width: 60px;
  }
}
</style>
