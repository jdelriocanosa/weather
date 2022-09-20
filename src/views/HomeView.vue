<template>
  <div class="widget">
    <drawer-menu />
    <search />
    <city-time />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    Search: () => import("@/components/home/Search"),
    CityTime: () => import("@/components/home/CityTime"),
    DrawerMenu: () => import("@/components/DrawerMenu")
  }
};
</script>
<style scoped>
.widget {
  margin: 0 auto;
  padding: 20px 30px 20px 100px;
}
@media only screen and (max-width: 600px) {
  .widget {
    margin: 0 auto;
    padding: 20px 20px 20px 72px;
  }
}
</style>
