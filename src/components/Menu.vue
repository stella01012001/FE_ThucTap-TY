<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-col>
        <div class="name-web">
          <h5>Custom colors</h5>
        </div>
        <el-menu
          default-active="2"
          class="el-menu-vertical"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1">
            <div class="wrapp-icon">
              <i class="fas fa-building"></i>
            </div>
            <span>BLOCK</span>
          </el-menu-item>
          <el-menu-item index="2">
            <div class="wrapp-icon">
              <i class="fas fa-kaaba"></i>
            </div>
            <span>FLOOR</span>
          </el-menu-item>
          <el-menu-item index="3">
            <div class="wrapp-icon">
              <i class="fas fa-warehouse"></i>
            </div>
            <span>UNIT</span>
          </el-menu-item>
          <el-menu-item index="4">
            <div class="wrapp-icon">
              <i class="el-icon-s-custom"></i>
            </div>

            <span>CUSTOMER</span>
          </el-menu-item>
          <el-menu-item index="5">
            <div class="wrapp-icon">
              <i class="fas fa-user-tie"></i>
            </div>

            <span>EMPLOYEE</span>
          </el-menu-item>
          <el-menu-item index="6">
            <div class="wrapp-icon">
              <i class="el-icon-document-remove"></i>
            </div>

            <span>PAYMENT_TERMS</span>
          </el-menu-item>
          <el-menu-item index="7">
            <div class="wrapp-icon">
              <i class="fas fa-file-contract"></i>
            </div>
            <span>CONTRACT</span>
          </el-menu-item>
          <el-menu-item index="8">
            <div class="wrapp-icon">
              <i class="fas fa-tasks"></i>
            </div>
            <span>EVENT_TYPE</span>
          </el-menu-item>
          <el-menu-item index="9">
            <div class="wrapp-icon">
              <i class="fas fa-calendar-alt"></i>
            </div>

            <span>EVENT</span>
          </el-menu-item>
          <el-menu-item index="10">
            <div class="wrapp-icon">
              <i class="fas fa-calendar-check"></i>
            </div>

            <span>PENDDING_EVENT</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>View</el-dropdown-item>
            <el-dropdown-item>Add</el-dropdown-item>
            <el-dropdown-item>Delete</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>Tom</span>
      </el-header>

      <el-main>
        <el-col :span="24"><el-button type="primary">Thêm</el-button></el-col>
        <el-table :data="tableData">
          <el-table-column prop="date" label="Date" width="140">
          </el-table-column>
          <el-table-column prop="name" label="Name" width="120">
          </el-table-column>
          <el-table-column prop="address" label="Address"> </el-table-column>
          <el-table-column prop="aciton" label="Action"> </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
      action: `<el-button type="info" icon="el-icon-message" circle></el-button><el-button type="danger" icon="el-icon-delete" circle></el-button>`,
    };
    return {
      tableData: Array(20).fill(item),
    };
  },
  // mounted() {
  //     this.checkLoggedIn();
  // },
  created() {
    this.checkLoggedIn();
  },
  methods: {
    checkLoggedIn: function () {
      // let token = window.localStorage.getItem("token");
      // if (token == null) {
      //   this.$router.push("/login");
      // }
      // axios
      //   .get("user")
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(() => {
      //     this.$router.push("/login");
      //   });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
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
