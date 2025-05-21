<template>
  <div class="container my-5">
    <h2 class="mb-4">My Recipes</h2>

    <div v-if="loading" class="text-muted">Loading recipes...</div>
    <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

    <div v-if="recipes.length" class="row g-4">
      <div class="col-md-6" v-for="recipe in recipes" :key="recipe.id">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">{{ recipe.title }}</h5>
            <p class="card-text">{{ recipe.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!loading" class="text-muted">No recipes found.</div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  data() {
    return {
      recipes: [],
      loading: true,
      errorMsg: '',
    };
  },
  async mounted() {
    await this.fetchRecipes();
  },
  methods: {
    async fetchRecipes() {
      this.loading = true;
      this.errorMsg = '';

      const auth = useAuthStore();
      const formData = new URLSearchParams();
      formData.append('user_id', auth.userId);  // Use Pinia state here

      try {
        const response = await fetch('http://localhost/interface/getrecipe.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        });

        const result = await response.json();

        if (result.success) {
          this.recipes = result.recipes;
        } else {
          this.errorMsg = result.message || 'Failed to fetch recipes.';
        }
      } catch (error) {
        this.errorMsg = 'Error connecting to server.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

