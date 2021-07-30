<template>
  <div>

    <el-button type="primary" @click="dialogFormVisible = true">Thêm</el-button>

    <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
      <el-form :model="form">
          <el-form-item label="Num of Floor" :label-width="formLabelWidth">
          <el-input v-model="form.numFloor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Description" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handSubmit">Confirm</el-button>
      </span>
    </el-dialog>

    <el-table :data="floors">
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="numFloor" label="Num Floor"> </el-table-column>
      <el-table-column prop="description" label="Description">
      </el-table-column>
      <el-table-column prop="aciton" label="Action">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Xóa</el-button
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
      floors: [],
      dialogFormVisible: false,
      form: {
        numFloor: "",
        description: "",
      },
    };
  },
  created() {
    this.getAllFloor();
  },
  methods: {
    getEvent_type(id) {
      console.log(id);
    },
    handSubmit() {
      axios
        .post("floor", this.form)
        .then((result) => {
          console.log(result);
          this.dialogFormVisible = false;
          this.getAllFloor();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllFloor() {
      axios
        .get("floor")
        .then((result) => {
          this.floors = result.data.data;
          console.log(this.floors);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDelete(index, row) {
      axios
        .delete(`floor/${row.id}`)
        .then(() => {
          this.getAllFloor();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
