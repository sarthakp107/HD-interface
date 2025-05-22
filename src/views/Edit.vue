<template>
  <div class="container my-5">
    <h2>Edit Recipe</h2>

    <form @submit.prevent="updateRecipe">
      <div class="mb-3">
        <label for="oldTitle" class="form-label">Current Title of Recipe</label>
        <input
          type="text"
          id="oldTitle"
          v-model="oldTitle"
          class="form-control"
          placeholder="Enter current recipe title"
          required
        />
      </div>

      <div class="mb-3">
        <label for="newTitle" class="form-label">New Title</label>
        <input
          type="text"
          id="newTitle"
          v-model="newTitle"
          class="form-control"
          placeholder="Enter new title"
          required
        />
      </div>

      <div class="mb-3">
        <label for="newDescription" class="form-label">New Description</label>
        <textarea
          id="newDescription"
          v-model="newDescription"
          class="form-control"
          rows="4"
          placeholder="Enter new description"
          required
        ></textarea>
      </div>

      <button type="submit" class="btn btn-success">Update Recipe</button>
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
      oldTitle: "",
      newTitle: "",
      newDescription: "",
      message: "",
      alertClass: "",
    };
  },
  methods: {
    async updateRecipe() {
      const formData = new URLSearchParams();
      formData.append("original_title", this.oldTitle);
      formData.append("new_title", this.newTitle);
      formData.append("new_description", this.newDescription);

      try {
        const response = await fetch(
          "https://mercury.swin.edu.au/cos30043/s104817068/hd-interface/InterfaceData/editrecipe.php",
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
          this.message = "Recipe updated successfully!";
          this.alertClass = "alert-success";
          this.$router.push('/my-recipe')
        } else {
          this.message = result.message || "Failed to update recipe.";
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
