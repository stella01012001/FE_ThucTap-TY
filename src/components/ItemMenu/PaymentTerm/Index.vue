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

    <el-table :data="paymentterms">
      <el-table-column prop="id" label="Id"> </el-table-column>
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
      paymentterms: [],
      dialogFormVisible: false,
      form: {
        description: "",
      },
    };
  },
  created() {
      this.getAllPaymentterms()
  },
  methods: {
    handSubmit() {
      axios
        .post("paymentTerm", this.form)
        .then((result) => {
          console.log(result);
          this.dialogFormVisible = false;
          this.getAllPaymentterms();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllPaymentterms() {
      axios
        .get("paymentTerm")
        .then((result) => {
          this.paymentterms = result.data.data;
          console.log(this.blocks);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDelete(index, row) {
        axios
        .delete(`paymentTerm/${row.id}`)
        .then(() => {
            this.getAllPaymentterms();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
