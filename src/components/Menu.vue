<template>
  <el-container style="height: 100vh">
    <el-aside width="230px" style="background-color: #1c4e80">
      <Nav />
    </el-aside>
    <el-container>
      <el-header
        height="74px"
        style="text-align: right; font-size: 12px; background-color: #7e909a"
      >
        <el-dropdown>
          <span>{{ user }}</span>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              ><span @click="log_out">Log Out</span></el-dropdown-item
            >
            <el-dropdown-item
              ><span @click="dialogFormVisible = true"
                >Change Password</span
              ></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-dialog title="Change Pass" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="Old Password" :label-width="formLabelWidth">
            <el-input
              v-model="form.passwordOld"
              autocomplete="off"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="New Password" :label-width="formLabelWidth">
            <el-input
              v-model="form.passwordNew"
              autocomplete="off"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="Confirm" :label-width="formLabelWidth">
            <el-input
              v-model="form.confirm_passwordNew"
              autocomplete="off"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="change_pass">Confirm</el-button>
        </span>
      </el-dialog>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import axios from "axios";
import Nav from "./Common/Nav.vue";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: localStorage.getItem("id"),
        passwordOld: "",
        passwordNew: "",
        confirm_passwordNew: "",
      },
      formLabelWidth: "120px",
    };
  },
  components: {
    Nav,
  },
  created() {},
  methods: {
    log_out() {
      axios
        .post("logout")
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      localStorage.removeItem("token");
      this.$swal({
        icon: "info",
        title: "Đã đăng xuất",
        showConfirmButton: false,
      });
      this.$router.push("/");
    },
    change_pass() {
      if (
        this.form.passwordNew.trim() === this.form.confirm_passwordNew.trim()
      ) {
        this.dialogFormVisible = false;
        axios
          .post("change-pass", this.form)
          .then((result) => {
            console.log(result);
            if (this.result.data.data.mess != "failed") {
              this.$notify({
                title: "Success",
                message: result.data.mess,
                type: "success",
              });
              this.log_out();
            }

            this.$notify.error({
              title: "Error",
              message: this.result.data.data.mess,
            });
          })
          .catch((err) => {
            this.$notify.error({
              title: "Error",
              message: err,
            });
          });
      } else {
        this.$notify({
          title: "Error",
          message: "Confirm not match Password",
          type: "warning",
        });
      }
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style>
.wrapp-icon {
  width: 25px;
  text-align: center;
  display: inline-block;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
