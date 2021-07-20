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
      username: "",
      password: "",
    };
  },
  computed: {

  },
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
          window.localStorage.setItem('token', result.data.token);
          this.$router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="css">
.jumbotron {
  margin: unset;
  background: url(https://scontent-hkg4-2.xx.fbcdn.net/v/t1.18169-9/26230647_2025678734376646_8716683300838614448_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=19026a&_nc_ohc=-mX8O-Ngzg4AX9IsCo9&tn=aYXSSniwU4XMkkl4&_nc_ht=scontent-hkg4-2.xx&oh=08d92a3579af00df5289dcd113fec3c6&oe=60FBDA92);
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
