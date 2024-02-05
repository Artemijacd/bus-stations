<script>
import { mapState } from "vuex";
export default {
  props: {
    value: String,
    name: String,
    handler: Function,
  },
  computed: {
    ...mapState(["picked"]),
  },
};
</script>
<template>
  <div>
    <input
      class="rd-btn"
      :checked="picked == value"
      type="radio"
      id="value"
      value="value"
      @change="handler"
    />
    <label class="rd-btn-lb" for="value">{{ name }}</label>
  </div>
</template>
<style lang="scss">
.rd-btn {
  cursor: pointer;
}
.rd-btn-lb {
  cursor: pointer;
}
</style>
