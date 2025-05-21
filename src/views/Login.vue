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

      <button type="submit" class="btn btn-primary w-100" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: "Login",
   setup() {
    const auth = useAuthStore()
    return { auth }
  },
  data() {
    return {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      loginError: "",
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.emailError = "";
      this.passwordError = "";
      this.loginError = "";

      if (!this.email.includes("@")) {
        this.emailError = "Please enter a valid email address.";
      }
      if (this.password.length < 6) {
        this.passwordError = "Password must be at least 6 characters.";
      }
      if (this.emailError || this.passwordError) return;

      this.loading = true;

      try {
        const formData = new FormData();
        formData.append("email", this.email);
        formData.append("password", this.password);

        const response = await fetch("http://localhost/interface/login.php", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
            this.auth.login(this.email, result.name, result.id); 
          this.$router.push("/");
        } else {
          this.loginError = result.message || "Login failed. Please try again.";
        }
      } catch (error) {
        console.log("login error: ", error);
        this.loginError = "Error Connecting";
      } finally {
        this.loading = false;
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
