<template>
  <div class="container my-5" style="max-width: 500px;">
    <h2>Create a New Recipe</h2>
    <form @submit.prevent="submitRecipe">
      <div class="mb-3">
        <label for="title" class="form-label">Recipe Title</label>
        <input v-model="title" type="text" id="title" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea v-model="description" id="description" class="form-control" rows="4" required></textarea>
      </div>

      <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
      <div v-if="successMsg" class="alert alert-success">{{ successMsg }}</div>

      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Saving...' : 'Save Recipe' }}
      </button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
    setup() {
    const auth = useAuthStore()
    return { auth }
  },
  data() {
    return {
      title: '',
      description: '',
      loading: false,
      errorMsg: '',
      successMsg: '',
    };
  },
  methods: {
    async submitRecipe() {
      this.errorMsg = '';
      this.successMsg = '';
      this.loading = true;

      try {
       const formData = new URLSearchParams();
        formData.append('title', this.title);
        formData.append('description', this.description);
        formData.append('user_id', this.auth.userId);

        // const response = await fetch('../InterfaceData/create.php', {
        const response = await fetch('https://mercury.swin.edu.au/cos30043/s104817068/hd-interface/InterfaceData/create.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        });


        const result = await response.json();

        if (result.success) {
          this.successMsg = 'Recipe created successfully!';
          this.title = '';
          this.description = '';
          this.$router.push('/my-recipe')
        } else {
          this.errorMsg = result.message || 'Failed to create recipe.';
        }
      } catch (error) {
        console.log(error);
        this.errorMsg = 'Error connecting to server.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
