<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <Nav />
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <span>{{ user }}</span>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              ><span @click="log_out">Log Out</span></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
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
export default {
  components: {
    Nav,
  },
  created() {},
  methods: {
    
    log_out() {
      localStorage.removeItem("token");
      this.$swal({
        icon: "info",
        title: "Đã đăng xuất",
        showConfirmButton: false,
      });
      this.$router.push("/");
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

.name-web {
  text-align: center;
  padding: 25px 15px;
  color: #fff;
  background-color: #3c4b64;
}

.name-web h5 {
  margin: unset;
}
</style>
