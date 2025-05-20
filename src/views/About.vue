<template>
  <div class="container my-5">
    <h2 class="mb-4 text-center text-primary">About Our Recipe Sharing Platform</h2>

    <p class="lead text-muted mb-5 text-justify">
      Welcome to our Recipe Sharing Platform, a vibrant community for food lovers to explore, share, and organize their favorite recipes! Discover mouthwatering dishes with photos, ingredients, and step-by-step instructions, and filter by cuisine, ingredients, or dietary needs like vegan or gluten-free. Log in to save recipes, post your own creations, rate dishes you love, and plan meals with ease.
    </p>

    <div class="row g-4">
      <!-- User Input Section -->
      <div class="col-12 col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title mb-3">Tell Us About You</h5>
            <div class="mb-3">
              <label for="firstName" class="form-label">First Name</label>
              <input
                v-model="firstName"
                type="text"
                class="form-control"
                id="firstName"
                placeholder="Enter your first name"
                aria-label="First name"
              />
            </div>
            <div class="mb-3">
              <label for="lastName" class="form-label">Last Name</label>
              <input
                v-model="lastName"
                type="text"
                class="form-control"
                id="lastName"
                placeholder="Enter your last name"
                aria-label="Last name"
              />
            </div>
            <p v-if="welcomeMessage" class="alert alert-info mt-3" role="alert">
              {{ welcomeMessage }}
            </p>
          </div>
        </div>
      </div>

      <!-- Preference and Image Section -->
      <div class="col-12 col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title mb-3">What Do You Like the Most?</h5>
            <fieldset class="mb-3">
              <div class="form-check mb-2">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="selectedImage"
                  value="momo"
                  id="momo"
                  name="image"
                />
                <label class="form-check-label" for="momo">Momo</label>
              </div>
              <div class="form-check mb-2">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="selectedImage"
                  value="risotto"
                  id="risotto"
                  name="image"
                />
                <label class="form-check-label" for="risotto">Risotto</label>
              </div>
            </fieldset>

            <div v-if="selectedImage == 'momo'" class="text-center">
              <img src="../assets/momo.jpg" class="img-fluid rounded shadow" alt="Momo" />
            </div>
            <div v-if="selectedImage == 'risotto'" class="text-center">
              <img src="../assets/risotto.jpg" class="img-fluid rounded shadow" alt="Risotto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      firstName: '',
      lastName: '',
      selectedImage: '',
    };
  },
  computed: {
    welcomeMessage() {
      if (!this.firstName && !this.lastName) return '';
      return `Welcome, ${this.firstName || 'Guest'} ${this.lastName || ''}! Enjoy exploring our delicious recipes!`;
    },
  },
};
</script>

<style scoped>
.alert {
  font-size: 1.1rem;
}
img {
  transition: opacity 0.3s ease-in-out;
  max-height: 250px;
}
</style>
