<template>
  <div class="container my-5" style="max-width: 400px;">
    <h2 class="mb-4 text-center">Login</h2>
    <form @submit.prevent="handleLogin" novalidate>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter email"
          required
        />
        <div v-if="emailError" class="text-danger small">{{ emailError }}</div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Enter password"
          required
        />
        <div v-if="passwordError" class="text-danger small">{{ passwordError }}</div>
      </div>

      <div v-if="loginError" class="alert alert-danger">
        {{ loginError }}
      </div>

      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      loginError: "",
    };
  },
  methods: {
    handleLogin() {
      this.emailError = "";
      this.passwordError = "";
      this.loginError = "";

      // Basic validation
      if (!this.email.includes("@")) {
        this.emailError = "Please enter a valid email address.";
      }
      if (this.password.length < 6) {
        this.passwordError = "Password must be at least 6 characters.";
      }

      if (this.emailError || this.passwordError) return;

      // Dummy login logic (replace with API/auth check)
      if (this.email === "user@example.com" && this.password === "password123") {
        this.$emit("login-success", this.email); // Pass email to parent if needed
        this.$router.push("/recipes"); // Redirect to another page
      } else {
        this.loginError = "Invalid credentials. Try again.";
      }
    },
  },
};
</script>

<style scoped>
input:invalid {
  border-color: #dc3545;
}
</style>
