<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({})
};
</script>
<style>
.v-main__wrap {
  background: aliceblue;
}
@import "./assets/main.scss";
</style>
