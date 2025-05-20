<template>
  <div class="container my-4">
    <h2>Recipe List (Search: "chicken")</h2>

    <div v-if="loading" class="text-center">Loading recipes...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-else class="row">
      <div
        v-for="recipe in paginatedRecipes"
        :key="recipe.idMeal"
         class="col-12 col-sm-6 col-md-6 col-lg-4 mb-4"

      >
        <div class="card h-100">
          <img
            :src="recipe.strMealThumb"
            class="card-img-top"
            :alt="recipe.strMeal"
          />
          <div class="card-body">
            <h5 class="card-title">{{ recipe.strMeal }}</h5>
            <p class="card-text">{{ recipe.strArea }} cuisine</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav class="mt-4" v-if="totalPages > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">
            Previous
          </button>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
          <button class="page-link" @click="currentPage = page">
            {{ page }}
          </button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "RecipeList",
  data() {
    return {
      recipes: [],
      loading: false,
      error: null,
      currentPage: 1,
      itemsPerPage: 9,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.recipes.length / this.itemsPerPage);
    },
    //to show for only specific page
    paginatedRecipes() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.recipes.slice(start, start + this.itemsPerPage); // slice(0,6) -> 6 is not included; index = 0 to 5
    },
  },
  mounted() {
    this.fetchRecipes();
  },
  methods: {
    async fetchRecipes() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
        );
        const data = await response.json();
        this.recipes = data.meals || [];
        this.currentPage = 1;
      } catch (err) {
        this.error = "Failed to fetch recipes.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
