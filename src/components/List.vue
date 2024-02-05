<script>
import { AgGridVue } from "ag-grid-vue";
import { mapActions, mapState } from "vuex";
import "ag-grid-enterprise";
import RadioButton from "./RadioButton.vue";
export default {
  name: "List",
  components: {
    AgGridVue,
    RadioButton,
  },
  computed: {
    ...mapState(["columnDefs", "rowData"]),
  },
  methods: {
    ...mapActions(["setSelectedStops", "showMap", "showRoutes", "showStops"]),
    onRowClicked(params) {
      this.setSelectedStops(params.node.data);
      this.showMap();
    },
    getContextMenuItems(params) {
      const result = [
        {
          name: "Подробнее",
          action: () => {
            this.setSelectedStops(params.node.data);
            this.$router.push({
              name: "RouteDetails",
              params: { id: params.node.data.ID },
            });
          },
        },
      ];
      return result;
    },
  },
};
</script>
<template>
  <div class="list">
    <div class="list-buttons">
      <radio-button :value="'Routes'" :name="'Маршруты'" :handler="showRoutes" />
      <radio-button :value="'Stops'" :name="'Остановки'" :handler="showStops" />
    </div>
    <ag-grid-vue
      @rowClicked="onRowClicked"
      style="width: 100%; height: 95%"
      class="ag-theme-quartz"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :getContextMenuItems="getContextMenuItems"
    >
    </ag-grid-vue>
  </div>
</template>

<style lang="scss">
@import "~ag-grid-community/styles/ag-grid.css";
@import "~ag-grid-community/styles/ag-theme-quartz.css";

.list {
  flex-grow: 1;
}

.list-buttons {
  margin: 15px;
  display: flex;
  gap: 15px;
}
</style>
