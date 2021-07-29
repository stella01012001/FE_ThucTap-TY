<template>
  <div>
    <el-col :span="24"><el-button type="primary">Thêm</el-button></el-col>
    <el-table :data="tableData">
      <el-table-column prop="date" label="Id"> </el-table-column>
      <el-table-column prop="name" label="Code"> </el-table-column>
      <el-table-column prop="address" label="Description"> </el-table-column>
      <el-table-column prop="aciton" label="Action">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      eventTypes: [],
    };
  },
  created() {
    axios
      .get("event-type")
      .then((result) => {
        console.log(result.data);
        this.eventTypes = result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
