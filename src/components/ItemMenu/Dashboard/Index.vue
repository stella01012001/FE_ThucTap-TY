<template>
  <div class="container-dashboard">
    <div class="left">
      <h5>Current May Revenue {{ new Date().getFullYear() }}</h5>
      <el-timeline :reverse="true">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.key"
        >
          {{ formatPrice(activity.value || 0) }}
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="right">
      <div class="container-concept">
        <div class="element-concept">
          <h3><i class="el-icon-box"></i> Sản phẩm</h3>
          <p class="index-num">0</p>
          <router-link to="/menu/product">
            <p class="link-go">Đi đến <i class="el-icon-right"></i></p
          ></router-link>
        </div>
        <div class="element-concept">
          <h3><i class="el-icon-box"></i> Sản phẩm</h3>
          <p class="index-num">0</p>
          <router-link to="/menu/product">
            <p class="link-go">Đi đến <i class="el-icon-right"></i></p
          ></router-link>
        </div>
        <div class="element-concept">
          <h3><i class="el-icon-box"></i> Sản phẩm</h3>
          <p class="index-num">0</p>
          <router-link to="/menu/product">
            <p class="link-go">Đi đến <i class="el-icon-right"></i></p
          ></router-link>
        </div>
        <div class="element-concept">
          <h3><i class="el-icon-box"></i> Sản phẩm</h3>
          <p class="index-num">0</p>
          <router-link to="/menu/product">
            <p class="link-go">Đi đến <i class="el-icon-right"></i></p
          ></router-link>
        </div>
        <div class="item">
          <el-calendar v-model="value"> </el-calendar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DashBoard",
  data() {
    return {
      value: new Date(),
      report: [],
      activities: [],
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
    },
    getChart() {
      axios
        .get(`test`)
        .then((result) => {
          this.report = result.data.data[0];
          for (const key in this.report) {
            this.activities.push({ key, value: this.report[key] });
          }
          this.activities = this.activities.reverse();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // this.getChart;
  },
};
</script>
<style scoped>
.item {
  grid-column: 1 / 3;
}

.container-dashboard {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
}

.container-concept {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
}

.element-concept {
  min-height: 130px;
  color: #fff;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #000;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  position: relative;
}

.element-concept h3 {
  font-size: 22px;
}

.element-concept .index-num {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 20px;
}

.link-go {
  position: absolute;
  bottom: 0px;
  right: 15px;
  color: #fff !important;
  text-align: right;
  font-weight: 500;
}
</style>