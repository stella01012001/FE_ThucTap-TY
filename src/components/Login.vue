<template>
  <div class="jumbotron full-height">
    <div class="row justify-content-md-center align-items-center">
      <div class="col-4 custom-frm">
        <form action="/action_page.php" @submit.prevent="handleSubmit()">
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
    handleSubmit() {
      axios
        .post("login", this.user)
        .then((result) => {
          console.log(result);
          if (result.data.status == 1) {
            console.log(result);
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
          } else {
            this.$swal({
              icon: "error",
              title: "Tài khoản đã bị khóa",
              showConfirmButton: false,
            });
          }
        })
        .catch((err) => {
          this.erorrs = err.response.data.errors;
          console.log(err.response.data.errors);
        });
    },
  },
};
</script>

<style lang="css">
.jumbotron {
  margin: unset;
  /* background: url(https://scontent-hkg4-2.xx.fbcdn.net/v/t1.18169-9/26230647_2025678734376646_8716683300838614448_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=19026a&_nc_ohc=-mX8O-Ngzg4AX9IsCo9&tn=aYXSSniwU4XMkkl4&_nc_ht=scontent-hkg4-2.xx&oh=08d92a3579af00df5289dcd113fec3c6&oe=60FBDA92); */
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
