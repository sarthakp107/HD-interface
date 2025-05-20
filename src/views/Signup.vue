<template>
  <div class="container my-5" style="max-width: 500px;">
    <h2 class="mb-4 text-center">Sign Up</h2>

    <form @submit.prevent="handleSignup" novalidate>
      <div class="mb-3">
        <label for="name" class="form-label">Full Name</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter your full name"
        />
        <div v-if="nameError" class="text-danger small">{{ nameError }}</div>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter email"
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
        />
        <div v-if="passwordError" class="text-danger small">{{ passwordError }}</div>
      </div>

      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input
          v-model="confirmPassword"
          type="password"
          class="form-control"
          id="confirmPassword"
          placeholder="Confirm password"
        />
        <div v-if="confirmPasswordError" class="text-danger small">{{ confirmPasswordError }}</div>
      </div>

      <div v-if="signupError" class="alert alert-danger">
        {{ signupError }}
      </div>

      <button type="submit" class="btn btn-success w-100">Create Account</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      nameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      signupError: "",
    };
  },
  methods: {
    handleSignup() {
      // Reset all errors
      this.nameError = this.emailError = this.passwordError = this.confirmPasswordError = this.signupError = "";

      // Validation
      if (this.name.trim().length < 2) {
        this.nameError = "Please enter your full name.";
      }
      if (!this.email.includes("@")) {
        this.emailError = "Enter a valid email.";
      }
      if (this.password.length < 6) {
        this.passwordError = "Password must be at least 6 characters.";
      }
      if (this.confirmPassword !== this.password) {
        this.confirmPasswordError = "Passwords do not match.";
      }

      // Stop if any error exists
      if (
        this.nameError ||
        this.emailError ||
        this.passwordError ||
        this.confirmPasswordError
      ) {
        return;
      }

      // Dummy success (replace with API call)
      if (this.email === "existing@example.com") {
        this.signupError = "An account with this email already exists.";
      } else {
        alert("Account created successfully!");
        this.$router.push("/login"); // Redirect to login page
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
