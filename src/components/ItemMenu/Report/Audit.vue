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
      <el-table-column prop="idContract" label="Contract" width="120">
      </el-table-column>
      <el-table-column prop="customer" label="Purchaser" width="120">
      </el-table-column>
      <el-table-column prop="unit" label="Unit" width="120">
      </el-table-column>
      <el-table-column prop="paid" label="Total Paid" width="300">
          <template slot-scope="scope">
          <p>
            {{ formatPrice(scope.row.paid) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="balance" label="Total Balance" width="300">
          <template slot-scope="scope">
          <p>
            {{ formatPrice(scope.row.balance) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="paidNo"
        label="PaidNo"
      >
      </el-table-column>
      
    </el-table>
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
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
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
              element.checksdate = new Date(
              element.dueDate
            ).getMonth();
            element.checksdate = element.checksdate +1;
            console.log(element.checksdate);

            element.checkYear = new Date(
              element.dueDate
            ).getYear();

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
        .get("/report-audit")
        .then((result) => {
          this.data.periods = result.data.data;
          this.data.periods.forEach((element) => {
            element.checksdate = new Date(
              element.dueDate
            ).getMonth();
            element.checksdate = element.checksdate +1;
            
            element.checkYear = new Date(
              element.dueDate
            ).getYear();
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
    
  },
  async mounted() {
    this.getRP();
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
</style>
