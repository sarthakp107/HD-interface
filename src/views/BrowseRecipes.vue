<template>
  <div class="container my-5">
    <h2 class="mb-4">Browse Recipes</h2>

      <input v-model="searchQuery" @input="fetchRecipes" class="form-control" placeholder="Search recipes..." />


    <div v-if="loading" class="text-muted">Loading recipes...</div>
    <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

    <div v-if="recipes.length" class="row g-4">
      <div class="col-md-6" v-for="recipe in recipes" :key="recipe.id">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">{{ recipe.title }}</h5>
            <p class="card-text">{{ recipe.description }}</p>
            <p class="text-muted">Likes: {{ recipe.likes }}</p>
            <p v-if="recipe.comment" class="text-primary">Comment: {{ recipe.comment }}</p>

            <button class="btn btn-outline-primary btn-sm me-2" @click="likeRecipe(recipe.id)">Like</button>

            <!-- Add comment input -->
            <input v-model="recipe.newComment" type="text" class="form-control mt-2 mb-2" placeholder="Add a comment" />
            <button class="btn btn-outline-success btn-sm" @click="submitComment(recipe.id, recipe.newComment)">Submit Comment</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!loading" class="text-muted">No recipes found.</div>
  </div>
</template>

<script>
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
      try {
        const response = await fetch('https://mercury.swin.edu.au/cos30043/s104817068/hd-interface/InterfaceData/get_all_recipes.php');
        const result = await response.json();

        if (result.success) {
          // Add `newComment` field to each recipe object
          this.recipes = result.recipes.map(r => ({ ...r, newComment: '' }));
        } else {
          this.errorMsg = result.message || 'Failed to load recipes.';
        }
      } catch (err) {
        this.errorMsg = 'Error connecting to server.';
      } finally {
        this.loading = false;
      }
    },

    async likeRecipe(recipeId) {
      const formData = new URLSearchParams();
      formData.append('recipe_id', recipeId);

      try {
        const response = await fetch('https://mercury.swin.edu.au/cos30043/s104817068/hd-interface/InterfaceData/like_recipe.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString(),
        });

        const result = await response.json();
        if (result.success) {
          this.fetchRecipes();
        } else {
          alert(result.message || 'Failed to like recipe.');
        }
      } catch (error) {
        alert('Error connecting to server.');
      }
    },

    async submitComment(recipeId, comment) {
      if (!comment) {
        alert("Comment cannot be empty.");
        return;
      }

      const formData = new URLSearchParams();
      formData.append('recipe_id', recipeId);
      formData.append('comment', comment);

      try {
        const response = await fetch('https://mercury.swin.edu.au/cos30043/s104817068/hd-interface/InterfaceData/add_comment.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString(),
        });

        const result = await response.json();
        if (result.success) {
          this.fetchRecipes();
        } else {
          alert(result.message || 'Failed to add comment.');
        }
      } catch (error) {
        alert('Error submitting comment.');
      }
    },
  },
};
</script>
