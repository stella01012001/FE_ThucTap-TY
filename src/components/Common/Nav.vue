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
          <i class="fas fa-building icon-color"></i>
        </div>
        <router-link to="/menu/block">BLOCK</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <div class="wrapp-icon">
          <i class="fas fa-kaaba icon-color"></i>
        </div>
        <router-link to="/menu/floor">FLOOR</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <div class="wrapp-icon">
          <i class="fas fa-warehouse icon-color"></i>
        </div>
        <router-link to="/menu/unit">UNIT</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <div class="wrapp-icon">
          <i class="el-icon-s-custom icon-color"></i>
        </div>
        <router-link to="/menu/customer">CUSTOMER</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <div class="wrapp-icon icon-color">
          <i class="fas fa-user-tie"></i>
        </div>
        <router-link to="/menu/employee">EMPLOYEE</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <div class="wrapp-icon">
          <i class="el-icon-document-remove icon-color"></i>
        </div>
        <router-link to="/menu/paymentterm">PAYMENT TERM</router-link>
      </el-menu-item>
      <el-menu-item index="7">
        <div class="wrapp-icon">
          <i class="fas fa-file-contract icon-color"></i>
        </div>
        <router-link to="/menu/lgctr">LEDGER CONTRACT</router-link>
      </el-menu-item>
      <el-menu-item index="8">
        <div class="wrapp-icon">
          <i class="fas fa-tasks icon-color"></i>
        </div>
        <router-link to="/menu/event-type">EVENT TYPE</router-link>
      </el-menu-item>
      <el-submenu index="9">
        <template slot="title">
          <div class="wrapp-icon">
            <i class="fas fa-calendar-alt icon-color"></i>
          </div>
          <span>EVENT</span>
        </template>
        <el-menu-item-group>
          <router-link to="/menu/list-ds">
            <el-menu-item index="9-1"
              >Deposit Slip (SPA/LTLA)</el-menu-item
            ></router-link
          >
          <router-link to="/menu/list-da">
            <el-menu-item index="9-2"
              >Deposit Agreement</el-menu-item
            ></router-link
          >
          <router-link to="/menu/list-ctr">
            <el-menu-item index="9-3">Contract</el-menu-item></router-link
          >
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="10">
        <router-link to="/menu/period">
          <div class="wrapp-icon">
            <i class="el-icon-s-promotion icon-color"></i>
          </div>
          <span>DUE LIST PAYMENT</span>
        </router-link>
      </el-menu-item>

      <el-submenu index="11">
        <template slot="title">
          <div class="wrapp-icon">
            <i class="el-icon-s-promotion icon-color"></i>
          </div>
          <span>REPORT</span>
        </template>

        <router-link to="/menu/report-audit">
          <el-menu-item index="11-2"
            >Report Audit</el-menu-item
          ></router-link
        >
        <router-link to="/menu/report-mr">
          <el-menu-item index="11-2"
            >Monthly Revenue</el-menu-item
          ></router-link
        >
      </el-submenu>

      <el-menu-item index="12">
        <div class="wrapp-icon">
          <i class="el-icon-s-promotion icon-color"></i>
        </div>
        <router-link to="/menu/account">ACCOUNT</router-link>
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

<style>
.el-menu {
  border: unset !important;
}

a {
  color: #fff;
  font-weight: 600;
}

.icon-color {
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
