<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["fetchError"]),
  },
};
</script>
<template>
  <div class="modal">
    <h1>Произошла ошибка!</h1>
    <p style="color: red">{{ fetchError }}</p>
  </div>
</template>
