<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">Thêm</el-button>

    <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Tax Code" :label-width="formLabelWidth">
          <el-input v-model="form.taxCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Birth" :label-width="formLabelWidth">
          <el-input v-model="form.birth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Address" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Gender" :label-width="formLabelWidth">
          <el-input v-model="form.gender" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handSubmit">Confirm</el-button>
      </span>
    </el-dialog>

    <el-table :data="customers">
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="gender" label="Gender"> </el-table-column>
      <el-table-column prop="taxCode" label="Tax Code"> </el-table-column>
      <el-table-column prop="birth" label="Birth"> </el-table-column>
      <el-table-column prop="phone" label="Phone"> </el-table-column>
      <el-table-column prop="address" label="Address"> </el-table-column>
      <el-table-column prop="email" label="Email"> </el-table-column>
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
      formLabelWidth: "120px",
      customers: [],
      dialogFormVisible: false,
      form: {
        name: "",
        taxCode: "",
        birth: "",
        phone: "",
        address: "",
        email: "",
        gender: "",
      },
    };
  },
  created() {
    this.getAllCus();
  },
  methods: {
    getEvent_type(id) {
      console.log(id);
    },
    handSubmit() {
      axios
        .post("customer", this.form)
        .then((result) => {
          console.log(result);
          this.dialogFormVisible = false;
          this.getAllCus();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllCus() {
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
