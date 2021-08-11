<template>
  <el-col>
    <div class="name-web">
      <h5>Phoebus</h5>
    </div>
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      text-color="#fff"
      active-text-color="#ffd04b"
      background-color="#1c4e80"
    >
      <el-menu-item index="1">
        <div class="wrapp-icon">
          <i class="fas fa-building"></i>
        </div>
        <router-link to="/menu/block">BLOCK</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <div class="wrapp-icon">
          <i class="fas fa-kaaba"></i>
        </div>
        <router-link to="/menu/floor">FLOOR</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <div class="wrapp-icon">
          <i class="fas fa-warehouse"></i>
        </div>
        <router-link to="/menu/unit">UNIT</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <div class="wrapp-icon">
          <i class="el-icon-s-custom"></i>
        </div>
        <router-link to="/menu/customer">CUSTOMER</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <div class="wrapp-icon">
          <i class="fas fa-user-tie"></i>
        </div>
        <router-link to="/menu/employee">EMPLOYEE</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <div class="wrapp-icon">
          <i class="el-icon-document-remove"></i>
        </div>
        <router-link to="/menu/paymentterm">PAYMENT TERM</router-link>
      </el-menu-item>
      <el-menu-item index="7">
        <div class="wrapp-icon">
          <i class="fas fa-file-contract"></i>
        </div>
        <span>LEDGER CONTRACT</span>
      </el-menu-item>
      <el-menu-item index="8">
        <div class="wrapp-icon">
          <i class="fas fa-tasks"></i>
        </div>
        <router-link to="/menu/event-type">EVENT TYPE</router-link>
      </el-menu-item>
      <el-menu-item index="9">
        <div class="wrapp-icon">
          <i class="fas fa-calendar-alt"></i>
        </div>
        <router-link to="/menu/event-type">EVENT</router-link>
      </el-menu-item>

      <el-menu-item index="10">
        <div class="wrapp-icon">
          <i class="el-icon-s-promotion"></i>
        </div>
        <span>DUE LIST PAYMENT</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style >
.el-menu {
  border: unset !important;
}

a {
  color: #fff;
  font-weight: 600;
}

i {
  color: #fff !important;
}

a:active,
a:hover,
a:focus {
  color: #ffd04b;
  text-decoration: underline;
}

.name-web {
  text-align: center;
  padding: 25px 15px;
  color: #fff;
  background-color: #073857;
}

.name-web h5 {
  margin: unset;
}
</style>
