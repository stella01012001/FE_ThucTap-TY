<template>
  <div>
    <div class="block">
      <span class="demonstration">Month </span>
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
      >
    </div>
    <el-table
      v-if="data.periods"
      :data="data.periods"
      style="width: 100%"
      max-height="250"
    >
      <el-table-column fixed prop="id" label="ID" width="50">
      </el-table-column>
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
      <el-table-column prop="installmentNo" label="InstallmentNo" width="120">
      </el-table-column>
      <el-table-column prop="dueDate" label="Due Date" width="120">
      </el-table-column>
      <el-table-column prop="description" label="Description" width="300">
      </el-table-column>
      <el-table-column prop="amount" label="Amount" width="120">
        <template slot-scope="scope">
        <p> 
          {{ formatPrice(scope.row.amount) }}
        </p>
        
      </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="principal"
        label="Principal"
      >
      <template slot-scope="scope">
        <p> 
          {{ formatPrice(scope.row.principal) }}
        </p>
        
      </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="amount_vat"
        label="Amount_vat"
      >
      <template slot-scope="scope">
        <p> 
          {{ formatPrice(scope.row.amount_vat) }}
        </p>
        
      </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="land_use_fee"
        label="Land_use_fee"
      >
      <template slot-scope="scope">
        <p> 
          {{ formatPrice(scope.row.land_use_fee) }}
        </p>
        
      </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template slot-scope="scope">
          <el-button v-if="date.getMonth" size="mini" icon="el-icon-s-promotion" @click="handleClickMail(scope.row)"
              >Send Mail</el-button
            >
        </template>
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
      date : new Date(),
      data: {
        periods: [],
      },
    };
  },
  methods: {
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
              if (element.payment == "") {
                element.payment = "Pendding";
              } else {
                element.payment = "Approved";
              }
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
    getAllDD() {
      
      axios
        .get("/due-date")
        .then((result) => {
          this.data.periods = result.data.data;
          console.log(this.date.getMonth());
          console.log(new Date(this.data.periods[0].dueDate).getMonth());
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
  mounted() {
    this.getAllDD();
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
