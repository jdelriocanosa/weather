<template>
  <div class="widget">
    <h2 class="title2">Favoritos</h2>
    <drawer-menu />
    <list-favorites />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    ListFavorites: () => import("@/components/favorites/ListFavorites"),
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
    padding: 20px 12px 20px 72px;
  }
}
</style>
