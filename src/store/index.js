import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainLink: "https://220.transflow.ru/api/public/v1/routes_data?key=012345678abc",
    picked: 'Routes',
    columnDefs: null,
    rowData: null,
    fetchedData: [],
    routes: [],
    stops: [],
    selectedStops: [],
    selectedPoints: [],
    loading: true,
    showMap: false,
    routeName: null,
    routeDescription: null,
    fetchError: null,
  },
  getters: {
  },
  mutations: {
    showRoutes(state) {
      state.picked = 'Routes'
      if (!state.routes.length) {
        state.routes = state.fetchedData.map(route => {
          return {...route, Count: route.Stops.length }
        });
      }
      state.rowData = state.routes;
      state.columnDefs = [
        { field: "Name", headerName: "Название" },
        { field: "Count", headerName: "Количество остановок" },
      ]
    },
    showStops(state) {
      state.picked = 'Stops'
      if (!state.stops.length) {
        const routesCount = {};
        const prepData = state.fetchedData.map(row => {
          return row.Stops.map((stop) => {
            routesCount[stop.ID] 
            ? routesCount[stop.ID]++
            : routesCount[stop.ID] = 1;
          return {...stop, Count: routesCount[stop.ID], Direction: stop.Forward ? "Прямой" : "Обратный"};
          });
        })
        state.stops = prepData.flat();
      }
      state.rowData = state.stops;

      state.columnDefs = [
        { field: "Name", headerName: "Название" },
        { field: "Count", headerName: "Количество маршрутов" },
        { field: "Direction", headerName: "Направление" },
      ]
    },
    setData(state, payload) {
      state.fetchedData = payload;
      state.loading = !state.loading
    },
    setSelectedStops(state, payload) {
      if (state.picked == 'Routes') {
        state.selectedStops = payload.Stops;
      } else {
        state.selectedStops = [payload]
      }
    },
    setSelectedPoints(state, payload) {
      if (state.picked == 'Routes') {
        state.routeName = payload.Name
        state.routeDescription = payload.Description
        state.selectedPoints = payload.Points.map((point) => [point.Lat, point.Lon])
      } else {
        state.selectedPoints = [[payload.Lat, payload.Lon]]
      }
    },
    showMap(state) {
      state.showMap = !state.showMap
    },
    throwError(state, payload) {
      state.fetchError = payload;
    }
  },
  actions: {
    setSelectedStops({ commit }, payload) {
      commit('setSelectedStops', payload)
      commit('setSelectedPoints', payload)
    },
    showRoutes({ commit }) {
      commit('showRoutes')
    },
    showStops({ commit }) {
      commit('showStops')
    },
    showMap({ commit }) {
      commit('showMap')
    },
    fetchData({ commit }) {

      axios.get(this.state.mainLink, {
      })
      .then(function (response) {
        commit('setData', response.data)
        commit('showStops')
        commit('showRoutes')
      })
      .catch(function (error) {
        commit('throwError', error.message);
      })
    },
  },
})
