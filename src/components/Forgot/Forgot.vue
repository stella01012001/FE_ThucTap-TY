<template>
  <div class="jumbotron full-height">
    <div class="row justify-content-md-center align-items-center">
      <div class="col-4 custom-frm">
        <form @submit.prevent="handleSubmit()">
          <div class="form-group">
            <h2>Forgot Password</h2>
          </div>

          <div class="form-group">
            <label for="email">Email: </label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Username"
              v-model="user.email"
            />
          </div>
          <button type="submit" class="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        email: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      axios
        .post("forgot", this.user)
        .then((result) => {
          this.$swal({
              icon: "success",
              title: result.data.mess,
              showConfirmButton: false,
            });
            window.localStorage.setItem("token", result.data.token);
        })
        .catch((err) => {
          this.$swal({
              icon: "error",
              title: err,
              showConfirmButton: false,
            });
        });
    },
  },
};
</script>

<style scoped></style>
