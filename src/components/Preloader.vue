<script>
export default {};
</script>
<template>
  <div class="modal">
    <span class="loader"></span>
    <p>Приложение загружается, ожидайте</p>
  </div>
</template>
<style lang="scss">
.modal {
  width: 500px;
  height: 500px;
  margin: 200px auto;
  text-align: center;
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: blue;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
