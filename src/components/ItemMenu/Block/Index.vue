<template>
  <div>

    <el-button type="primary" @click="dialogFormVisible = true">Thêm</el-button>

    <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Description" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handSubmit">Confirm</el-button>
      </span>
    </el-dialog>

    <el-table :data="blocks">
      <el-table-column prop="id" label="Id"> </el-table-column>
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
      blocks: [],
      dialogFormVisible: false,
      form: {
        description: "",
      },
    };
  },
  created() {
      this.getAllBlock()
  },
  methods: {
    getEvent_type(id) {
      console.log(id);
    },
    handSubmit() {
      axios
        .post("block", this.form)
        .then((result) => {
          console.log(result);
          this.dialogFormVisible = false;
          this.getAllBlock();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllBlock() {
      axios
        .get("block")
        .then((result) => {
          this.blocks = result.data.data;
          console.log(this.blocks);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
