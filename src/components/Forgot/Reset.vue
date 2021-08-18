<template>
  <div class="jumbotron full-height">
    <div class="row justify-content-md-center align-items-center">
      <div class="col-4 custom-frm">
        <form @submit.prevent="handleSubmit()">
          <div class="form-group">
            <h2>Reset</h2>
          </div>
          <div class="form-group">
            <label for="pwd">Password:</label>
            <input
              type="password"
              class="form-control"
              placeholder="Enter Password"
              v-model="user.pass"
            />
          </div>
          <div class="form-group">
            <label for="pwd">Confirm:</label>
            <input
              type="password"
              class="form-control"
              placeholder="Enter Confirm"
              v-model="user.checkpass"
            />
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
  data() {
    return {
      user: {
        pass: "",
        checkpass: "",
        token: localStorage.getItem("token"),
      },
    };
  },
  methods: {
    handleSubmit() {
      if (this.user.pass.trim() === this.user.checkpass.trim()) {
        axios
          .post("reset", this.user)
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
      } else {
        this.$swal({
          icon: "error",
          title: "Confirm not match Password",
          showConfirmButton: false,
        });
      }
    },
  },
};
</script>

<style scoped>
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
