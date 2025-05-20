<template>
  <div class="container my-5">
    <h1 class="text-center mb-4 text-primary display-5">Welcome to <strong>Recipe Haven</strong></h1>

    <p class="lead text-center text-muted mb-5">
      Discover delicious recipes for every occasion — from quick weeknight dinners to indulgent desserts. <br />
      <strong>Recipe Haven</strong> has it all!
    </p>

    <div class="row g-4">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
          <img
            src="../assets/pasta.jpg"
            alt="Pasta Dish"
            class="card-img-top img-fluid rounded-top hover-zoom"
          />
          <div class="card-body text-center">
            <h5 class="card-title mb-0">Savory Pasta</h5>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
          <img
            src="../assets/cake.jpg"
            alt="Chocolate Cake"
            class="card-img-top img-fluid rounded-top hover-zoom"
          />
          <div class="card-body text-center">
            <h5 class="card-title mb-0">Chocolate Delight</h5>
          </div>
        </div>
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
  transition: transform 0.3s ease;
}

.hover-zoom:hover {
  transform: scale(1.03);
}

.card-title {
  font-weight: 600;
  font-size: 1.2rem;
  color: #6c757d;
}
</style>
