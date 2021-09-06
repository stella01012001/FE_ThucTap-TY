<template>
  <div>
    <el-button
      v-if="idRole == '1'"
      type="primary"
      @click="dialogFormVisible = true"
      >Add new</el-button
    >

    <el-dialog title="Add New PaymentTerm" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="Description"
          prop="description"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handSubmit('form')"
          >Confirm</el-button
        >
      </span>
    </el-dialog>

    <el-table :data="paymentterms">
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="description" label="Description">
      </el-table-column>
      <el-table-column prop="aciton" label="Action">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              size="mini"
              icon="el-icon-share"
              @click="handleClick(scope.row)"
              >See more</el-button
            >
            <!-- <el-button
              icon="el-icon-edit"
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >Fix</el-button
            > -->
            <el-button
              v-if="idRole == '1'"
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      paymentterms: [],
      dialogFormVisible: false,
      form: {
        description: "",
      },
      formLabelWidth: "120px",
      rules: {
        description: [{ required: true, message: "Please input phone" }],
      },
    };
  },
  async created() {
    this.getAllPaymentterms();
  },
  computed: {
    ...mapGetters(["idRole"]),
  },
  methods: {
    handSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("paymentTerm", this.form)
            .then((result) => {
              console.log(result);
              this.dialogFormVisible = false;
              this.$swal({
                icon: "success",
                title: "Successful!",
                showConfirmButton: false,
              });
              this.getAllPaymentterms();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
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
      console.log(index, row);
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-success btn-margin",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You will not be able to recover after deleting!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`paymentTerm/${row.id}`)
              .then((result) => {
                //swalWithBootstrapButtons.fire("Deleted!", "", "success");
                swalWithBootstrapButtons.fire(
                  "Status!",
                  `${result.data.status}`,
                  ""
                );
                this.getAllPaymentterms();
              })
              .catch((err) => {
                swalWithBootstrapButtons.fire("Error~~~", `${err}`, "error");
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Canceled", "", "error");
          }
        });
    },
    handleClick(row) {
      this.$router.push({ path: `/menu/paymentterm/${row.id}` });
    },
  },
};
</script>

<style></style>
