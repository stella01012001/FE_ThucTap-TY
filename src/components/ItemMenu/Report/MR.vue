<template>
  <div>
    <div class="block">
      <!-- <span class="demonstration">Month </span>
      <el-date-picker
        prefix-icon
        v-model="period"
        type="month"
        placeholder="Pick a month"
        format="yyyy-MM"
        value-format="yyyy-MM"
      >
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="searchResult">
        Search</el-button
      > -->
      <el-button type="primary" @click="handleExportAudit">Export</el-button>
    </div>

    <div class="container-Mr">
      <div class="container-left">
        <h5>Current May Revenue {{ new Date().getFullYear() }}
</h5>
        <!-- có api thay  activities -> report-->
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
      <div class="container-right">
        <el-table
          v-if="data.periods"
          :data="data.periods"
          style="width: 100%"
          max-height="400"
        >
          <!-- <el-table-column fixed prop="id" label="ID" width="50"> </el-table-column> -->
          <!-- <el-table-column
        fixed
        prop="payment"
        label="Payment"
        width="120"
        :filters="[
          { text: 'Pendding', value: 'Pendding' },
          { text: 'Approved', value: 'Approved' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            @click="changeStatus(scope.row)"
            :type="scope.row.payment === 'Pendding' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.payment }}</el-tag
          >
        </template>
      
      </el-table-column> -->

          <el-table-column prop="Jan" label="Jan" width="120">
          </el-table-column>
          <el-table-column prop="Feb" label="Feb" width="120">
          </el-table-column>
          <el-table-column prop="Mar" label="Mar" width="120">
          </el-table-column>
          <el-table-column prop="Apr" label="Apr" width="120">
          </el-table-column>
          <el-table-column prop="May" label="May" width="120">
          </el-table-column>
          <el-table-column prop="Jun" label="Jun" width="120">
          </el-table-column>
          <el-table-column prop="Jul" label="Jul" width="120">
          </el-table-column>
          <el-table-column prop="Aug" label="Aug" width="120">
          </el-table-column>
          <el-table-column prop="Sep" label="Sep" width="120">
          </el-table-column>
          <el-table-column prop="Oct" label="Oct" width="120">
          </el-table-column>
          <el-table-column prop="Nov" label="Nov" width="120">
          </el-table-column>
          <el-table-column prop="Dec" label="Dec" width="120">
          </el-table-column>

        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      period: "",
      date: new Date(),
      year: new Date(),
      data: {
        periods: [],
      },
      report: [],
      activities: [

      ],
    };
  },

  methods: {
    handleExportAudit() {
      axios
        .post("export-audit", {
          responseType: "blob",
        })
        .then((result) => {
          // programmatically 'click'.
          const link = document.createElement("a");

          // Tell the browser to associate the response data to
          // the URL of the link we created above.
          link.href = window.URL.createObjectURL(new Blob([result[0]]));
          console.log(result.data);

          // Tell the browser to download, not render, the file.
          link.setAttribute("download", "report.xlsx");
          document.body.appendChild(link);

          // Make the magic happen!
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
    },
    searchResult() {
      if (this.period) {
        axios
          .post("/due-date", {
            period: this.period,
          })
          .then((result) => {
            console.log(result);
            this.data.periods = result.data.data;
            this.data.periods.forEach((element) => {
              element.checksdate = new Date(element.dueDate).getMonth();
              element.checksdate = element.checksdate + 1;
              console.log(element.checksdate);

              element.checkYear = new Date(element.dueDate).getYear();
            });
            this.$message({
              message: "Congrats, this is a success data.",
              type: "success",
            });
          })
          .catch((err) => {
            this.$message.error(`Oops, this is a error ${err}.`);
          });
      } else {
        this.$notify({
          title: "Warning",
          message: "Input Date",
          type: "warning",
        });
      }
    },
    handleClickMail(row) {
      this.$router.push({ path: `/menu/period-mail/${row.id}` });
    },
    getRP() {
      this.date = this.date.getMonth() + 1;
      this.year = this.year.getYear();
      console.log(this.date);
      axios
        .get("test")
        .then((result) => {
          this.data.periods = result.data.data;
          this.data.periods.forEach((element) => {
            element.checksdate = new Date(element.dueDate).getMonth();
            element.checksdate = element.checksdate + 1;

            element.checkYear = new Date(element.dueDate).getYear();
          });
          console.log(this.data.periods);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // changeStatus(row) {
    //   if (row.payment == "Approved") {
    //     this.$notify({
    //       title: "Warning",
    //       message: "This is a warning",
    //       type: "warning",
    //     });
    //   } else {
    //     axios
    //       .get(`approved-ds/${row.id}`)
    //       .then(() => {
    //         this.$message({
    //           showClose: true,
    //           message: "Congrats, this is a success message.",
    //           type: "success",
    //         });
    //         this.getAllDS();
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }
    // },
    getChart() {
      axios
        .get(`test`)
        .then((result) => {
          this.report = result.data.data[0];
          for (const key in this.report) {
            
              this.activities.push({key, value: this.report[key]})
          }
          this.activities = this.activities.reverse()
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getRP();
    this.getChart();
  },
};
</script>

<style scoped>
.block {
  margin-bottom: 20px;
}
.el-date-editor {
  margin-right: 10px;
}

.container-Mr {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.container-Mr .container-left {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  padding: 20px;
  text-align: left;
}

.container-Mr .container-right {
  width: 790px;
  padding-left: 20px;
}
</style>
