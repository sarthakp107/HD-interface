<template>
  <div class="container my-5">
    <h2>Delete Recipe by Title</h2>

    <form @submit.prevent="deleteRecipe" class="mt-3">
      <div class="mb-3">
        <label for="title" class="form-label">Recipe Title</label>
        <input
          type="text"
          id="title"
          v-model="title"
          class="form-control"
          placeholder="Enter recipe title"
          required
        />
      </div>

      <button type="submit" class="btn btn-danger">Delete</button>
    </form>

    <div v-if="message" class="alert mt-3" :class="alertClass">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      message: "",
      alertClass: "",
    };
  },
  methods: {
    async deleteRecipe() {
      const formData = new URLSearchParams();
      formData.append("title", this.title);

      try {
        const response = await fetch(
          "https://mercury.swin.edu.au/cos30043/s104817068/hd-interface/InterfaceData/deleterecipe.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
          }
        );

        const result = await response.json();

        if (result.success) {
          this.message = "Recipe deleted successfully!";
          this.alertClass = "alert-success";
          this.title = "";
          this.$router.push('/')
        } else {
          this.message = result.message || "Failed to delete recipe.";
          this.alertClass = "alert-danger";
        }
      } catch (error) {
        this.message = "Error connecting to server.";
        this.alertClass = "alert-danger";
      }
    },
  },
};
</script>
