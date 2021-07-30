<template>
  <div>

    <el-button type="primary" @click="dialogFormVisible = true">Thêm</el-button>

    <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Code" :label-width="formLabelWidth">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Description" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handSubmit"
          >Confirm</el-button
        >
      </span>
    </el-dialog>

    <el-table :data="eventTypes">
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="code" label="Code"> </el-table-column>
      <el-table-column prop="description" label="Description">
      </el-table-column>
      <el-table-column prop="aciton" label="Action">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >Sửa</el-button
          >
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
      eventTypes: [],
      dialogFormVisible: false,
      form: {
        code: "",
        description: "",
      },
    };
  },
  created() {
    this.getAllEventType()
  },
  methods: {
    getEvent_type(id) {
      console.log(id);
    },
    handSubmit() {
      
      axios
        .post("event-type", this.form)
        .then((result) => {
          console.log(result);
          this.dialogFormVisible = false
          this.getAllEventType();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllEventType() {
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
        axios
        .delete(`event-type/${row.id}`)
        .then(() => {
            this.getAllEventType();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
