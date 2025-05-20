<template>
  <div class="container my-4">
    <h1 class="text-center mb-4">Welcome to Recipe Haven</h1>
    <p class="lead text-center">
      Discover delicious recipes for every occasion. From quick weeknight dinners to indulgent desserts, Recipe Haven has it all!
    </p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <img src="../assets/pasta.jpg" alt="Pasta Dish" class="img-fluid rounded" />
      </div>
      <div class="col-md-6 mb-3">
        <img src="../assets/cake.jpg" alt="Chocolate Cake" class="img-fluid rounded" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
img {
  max-height: 300px;
  object-fit: cover;
}
</style>