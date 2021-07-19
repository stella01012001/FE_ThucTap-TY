<template>
  <div>
    <form action="/action_page.php" @submit.prevent="handleSubmit()">
      <div class="form-group">
        <label for="email">Username: </label>

        <input
          type="email"
          class="form-control"
          placeholder="Enter Username"
          v-model="username"
        />
      </div>
      <div class="form-group">
        <label for="pwd">Password:</label>
        <input
          type="password"
          class="form-control"
          placeholder="Enter password"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {},
  methods: {
    handleSubmit() {
      const data = {
        username: this.username,
        password: this.password,
      };
      console.log(data);
      axios
        .post("login", data)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
/* @import "./assets/scss/login.scss"; */
label {
  color: red;
}
</style>