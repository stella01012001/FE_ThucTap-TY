<template>
  <div class="jumbotron full-height">
    <div class="row justify-content-md-center align-items-center">
      <div class="col-4 custom-frm">
        <form @submit.prevent="handleSubmit()">
          <div class="form-group">
            <h2>Login</h2>
          </div>

          <div class="form-group">
            <label for="email">Username: </label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': erorrs.username }"
              placeholder="Enter Username"
              v-model="user.username"
            />
            <div v-if="erorrs.username" class="invalid-feedback">
              {{ erorrs.username[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="pwd">Password:</label>
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': erorrs.password }"
              placeholder="Enter password"
              v-model="user.password"
            />
            <div v-if="erorrs.password" class="invalid-feedback">
              {{ erorrs.password[0] }}
            </div>
          </div>
          <div class="forgot-pass">
            <span @click="switchForgot">Forgot password?</span>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      erorrs: {},
    };
  },
  computed: {},
  methods: {
    switchForgot() {
      this.$router.push("/forgot");
    },

    handleSubmit() {
      axios
        .post("login", this.user)
        .then((result) => {
          console.log(result);
          console.log(result.data.username);
          if (result.data.status == 1) {
            //console.log(result);
            this.$swal({
              icon: "success",
              title: "Đăng nhập thành công!!!",
              showConfirmButton: false,
            });
            window.localStorage.setItem("token", result.data.accessToken);
            window.localStorage.setItem("id", result.data.id);
            window.localStorage.setItem("user", result.data.username);
            window.localStorage.setItem("idRole", result.data.idRole);
            this.$store.dispatch("id", result.data.id);
            this.$store.dispatch("user", result.data.username);
            this.$store.dispatch("idRole", result.data.idRole);
            this.$router.push("/menu");
          } else if (result.data.status == 0) {
            this.$swal({
              icon: "error",
              title: "Tài khoản đã bị khóa",
              showConfirmButton: false,
            });
          } else {
            this.$swal({
              icon: "error",
              title: result.data.username,
              showConfirmButton: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.forgot-pass span {
  color: #007bff !important;
  font-weight: 600;
  cursor: pointer;
}

.forgot-pass span:hover {
  text-decoration: underline;
}

.jumbotron {
  margin: unset;

  background: url(https://img.freepik.com/free-vector/silhouette-skyline-illustration_53876-78786.jpg?size=626&ext=jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

.row {
  height: 100%;
}

.full-height {
  height: 100vh;
}

.custom-frm {
  background: #fff;
  border-radius: 25px;
  padding: 25px;
  -webkit-box-shadow: 0px 0px 15px 0px #6b6b6b;
  box-shadow: 0px 0px 15px 0px #6b6b6b;
}
</style>
