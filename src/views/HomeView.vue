<script>
import List from "../components/List.vue";
import Map from "../components/Map.vue";
import Error from "../components/Error.vue";
import Preloader from "../components/Preloader.vue";
import { mapActions } from "vuex";
export default {
  name: "HomeView",
  components: {
    List,
    Map,
    Error,
    Preloader,
  },
  data() {
    return {
      toogle: true,
      error: false,
    };
  },
  methods: {
    ...mapActions(["fetchData"]),
  },
  beforeMount() {
    this.fetchData();
  },
  watch: {
    "$store.state.loading": function () {
      this.toogle = !this.toogle;
    },
    "$store.state.fetchError": function () {
      this.error = true;
    },
  },
};
</script>
<template>
  <Error v-if="error" />
  <Preloader v-else-if="toogle" />
  <div v-else class="container">
    <List />
    <Map />
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  height: 85vh;
  padding: 15px;
  gap: 15px;
}
</style>
