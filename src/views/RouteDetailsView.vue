<script>
import { mapState } from "vuex";
export default {
  name: "RouteDetailsView",
  data() {
    return {
      forwardStops: [],
      reverseStops: [],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getStopsDirection(filter) {
      return this.selectedStops.filter(filter).map((stop) => ({
        id: "" + stop.ID + stop.Num,
        name: stop.Name,
        lat: stop.Lat,
        lon: stop.Lon,
      }));
    },
    updateStops() {
      this.forwardStops = this.getStopsDirection((stop) => stop.Forward);
      this.reverseStops = this.getStopsDirection((stop) => !stop.Forward);
    },
  },
  computed: {
    ...mapState(["selectedStops", "routeName", "routeDescription"]),
  },
  mounted() {
    this.updateStops();
  },
  watch: {
    selectedStops: function () {
      this.updateStops();
    },
  },
};
</script>
<template>
  <div class="route-details">
    <div class="route-description">
      <button @click="goBack">Назад</button>
      <span>Маршрут: {{ this.routeName }}</span>
      <span>Описание: {{ this.routeDescription }}</span>
      <span>Количество прямых остановок: {{ this.forwardStops.length }}</span>
      <span>Количество обратных остановок: {{ this.reverseStops.length }}</span>
    </div>
    <div class="route-stops">
      <div class="forward-stops">
        <h3>Прямые остановки</h3>
        <ul>
          <li v-for="stop in forwardStops">
            {{ stop.name }}
          </li>
        </ul>
      </div>
      <div class="reverse-stops">
        <h3>Обратные остановки</h3>
        <ul>
          <li v-for="stop in reverseStops">
            {{ stop.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.route-details {
  display: flex;
  gap: 32px;
}
.route-description {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.route-stops {
  display: flex;
  flex-direction: column;
}
.forward-stops {
  color: blue;
}
.reverse-stops {
  color: red;
}
li {
  list-style-type: none;
}
ul {
  margin-left: 0;
  padding-left: 0;
}
</style>
