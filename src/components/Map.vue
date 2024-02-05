<script>
import { icon } from "leaflet";
import {
  LMap,
  LImageOverlay,
  LMarker,
  LTooltip,
  LPolyline,
  LTileLayer,
  LControlZoom,
  LIcon,
} from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import { mapState } from "vuex";
export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LImageOverlay,
    LMarker,
    LTooltip,
    LPolyline,
    LIcon,
    LControlZoom,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      forwardIcon: icon({
        iconUrl: "/src/assets/forward-marker.svg",
        iconSize: [32, 37],
      }),
      reverseIcon: icon({
        iconUrl: "/src/assets/reverse-marker.svg",
        iconSize: [32, 37],
      }),
      travel: [],
      forwardStops: [],
      reverseStops: [],
      center: [57.288915, 55.472213],
      zoom: 12,
    };
  },
  computed: {
    ...mapState(["selectedPoints", "selectedStops", "showMap", "routeName"]),
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    getStopsDirection(filter) {
      return this.selectedStops.filter(filter).map((stop) => ({
        id: "" + stop.ID + stop.Num,
        name: stop.Name,
        lat: stop.Lat,
        lon: stop.Lon,
      }));
    },
    zoomCalculate() {
      let latMin = Infinity;
      let lonMin = Infinity;
      let latMax = -Infinity;
      let lonMax = -Infinity;
      this.selectedStops.map((st) => {
        latMin = Math.min(latMin, st.Lat);
        lonMin = Math.min(lonMin, st.Lon);
        latMax = Math.max(latMax, st.Lat);
        lonMax = Math.max(lonMax, st.Lon);
      });
      return Math.max(
        8,
        Math.round(
          Math.max(
            Math.abs(12 - (latMax - latMin) * 10),
            Math.abs(12 - (lonMax - lonMin) * 10)
          )
        )
      );
    },
    updateMap() {
      const length = this.selectedStops.length;
      this.travel = this.selectedPoints;
      this.forwardStops = this.getStopsDirection((stop) => stop.Forward);
      this.reverseStops = this.getStopsDirection((stop) => !stop.Forward);
      this.centerUpdated([
        this.selectedStops[Math.round(length / 4)].Lat,
        this.selectedStops[Math.round(length / 4)].Lon,
      ]);
      this.zoomUpdated(this.zoomCalculate());
    },
  },
  watch: {
    showMap: function () {
      this.updateMap();
    },
  },
};
</script>
<template>
  <div class="map">
    <l-map
      style="border-radius: 5px"
      :center="center"
      :zoom="zoom"
      ref="map"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
    >
      <l-marker
        v-for="stop in forwardStops"
        :key="stop.id"
        :lat-lng="stop"
        :icon="forwardIcon"
      >
        <l-tooltip>{{ stop.name }}</l-tooltip>
      </l-marker>
      <l-marker
        v-for="stop in reverseStops"
        :key="stop.id"
        :lat-lng="stop"
        :icon="reverseIcon"
      >
        <l-tooltip>{{ stop.name }}</l-tooltip>
      </l-marker>
      <l-tile-layer :url="url" />
      <l-polyline :lat-lngs="travel">
        <l-tooltip>{{ routeName }}</l-tooltip>
      </l-polyline>
    </l-map>
  </div>
</template>

<style lang="scss">
.map {
  flex-grow: 3;
  margin-top: 50px;
}
</style>
