<template>
  <div class="container-dashboard">
    <div class="left">
      <h5>Revenue {{ new Date().getFullYear() }}</h5>
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
        <div class="element-concept block">
          <h3><i class="fas fa-building icon-color"></i> Block</h3>
          <p class="index-num">{{db.block}} </p>
          <router-link to="/menu/block">
            <p class="link-go">go to <i class="el-icon-right"></i></p
          ></router-link>
        </div>
        <div class="element-concept floor">
          <h3><i class="fas fa-kaaba icon-color"></i> Floor</h3>
          <p class="index-num">{{db.floor}}</p>
          <router-link to="/menu/floor">
            <p class="link-go">go to<i class="el-icon-right"></i></p
          ></router-link>
        </div>
        <div class="element-concept unit">
          <h3><i class="fas fa-warehouse icon-color"></i> Unit</h3>
          <p class="index-num">{{db.unit}}</p>
          <router-link to="/menu/unit">
            <p class="link-go">go to<i class="el-icon-right"></i></p
          ></router-link>
        </div>
        <div class="element-concept ds">
          <h3>Deposit Slip (SPA/LTLA)</h3>
          <p class="index-num">{{db.countDS}} Pendding</p>
          <router-link to="/menu/list-ds">
            <p class="link-go">go to<i class="el-icon-right"></i></p
          ></router-link>
        </div>
        <div class="element-concept da">
          <h3> Deposit Agreement</h3>
          <p class="index-num">{{db.countDA}} Pendding</p>
          <router-link to="/menu/list-da">
            <p class="link-go">go to<i class="el-icon-right"></i></p
          ></router-link>
        </div>
        <div class="element-concept ctr">
          <h3>Contract</h3>
          <p class="index-num">{{db.countCTR}} Pendding</p>
          <router-link to="/menu/list-ctr">
            <p class="link-go">go to<i class="el-icon-right"></i></p
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
      db: {},
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
    getDB() {
      axios
        .get(`dashboard`)
        .then((result) => {
          this.db = result.data.data;
          console.log(this.re);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async mounted() {
    this.getChart();
    this.getDB();
  },
};
</script>
<style scoped>
.block{
  background: #597ed6;
}
.floor{
  background: #597ed6;
}
.unit{
  background: #597ed6;
}
.ds{
  background: #f0583d;
}
.da{
  background: #f0583d;
}
.ctr{
  background: #f0583d;
}

.item {
  grid-column: 1 / 4;
}

.container-dashboard {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
}

.container-concept {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
  /* background: #fff; */
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
  font-size: 18px;
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