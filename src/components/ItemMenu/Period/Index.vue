<template>
  <div>
    <div class="block">
      <span class="demonstration">Month </span>
      <el-date-picker
        prefix-icon
        v-model="dateGet"
        type="month"
        placeholder="Pick a month"
        format="yyyy/MM"
        value-format="yyyy/MM"
      >
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="searchResult">
        Search</el-button
      >
    </div>
    <el-table
      v-if="!data.period"
      :data="data.period"
      style="width: 100%"
      max-height="250"
    >
      <el-table-column fixed prop="id" label="ID" width="150">
      </el-table-column>
      <el-table-column
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
      </el-table-column>
      <el-table-column prop="idContract" label="Contract" width="120">
      </el-table-column>
      <el-table-column prop="installmentNo" label="InstallmentNo" width="120">
      </el-table-column>
      <el-table-column prop="dueDate" label="Due Date" width="120">
      </el-table-column>
      <el-table-column prop="description" label="Description" width="300">
      </el-table-column>
      <el-table-column prop="amount" label="Amount" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            Remove
          </el-button>
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
      dateGet: "",
      data: {
        period: [],
      },
    };
  },
  methods: {
    searchResult() {
      if (this.dateGet) {
        axios
          .post(`/due-date`, this.dateGet)
          .then((result) => {
            this.data.period = result.data.data;
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
    changeStatus(row) {
      if (row.payment == "Approved") {
        this.$notify({
          title: "Warning",
          message: "This is a warning",
          type: "warning",
        });
      } else {
        axios
          .get(`approved-ds/${row.id}`)
          .then(() => {
            this.$message({
              showClose: true,
              message: "Congrats, this is a success message.",
              type: "success",
            });
            this.getAllDS();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  mounted() {},
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
