<template>
  <div>
    <el-col :span="24"><el-button type="primary">Thêm</el-button></el-col>
    <el-table :data="eventTypes">
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="code" label="Code"> </el-table-column>
      <el-table-column prop="description" label="Description">
      </el-table-column>
      <el-table-column prop="aciton" label="Action">
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          @click="getEvent_type"
        ></el-button>
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
        this.eventTypes = result.data.data;
        console.log(this.eventTypes);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getEvent_type(id) {
      console.log(id)
    },
  },
};
</script>

<style></style>
