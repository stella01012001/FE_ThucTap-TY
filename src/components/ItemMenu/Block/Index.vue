<template>
  <div>
    <el-button
      v-if="idRole == '1'"
      type="primary"
      @click="dialogFormVisible = true"
      >Add new</el-button
    >

    <el-dialog title="Add New Block" :visible.sync="dialogFormVisible">
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

<!-- <el-button type="primary" @click="handSubmit('form')" :loading="loading">{{
            loading ? "Confirm ..." : "Confirm"
          }}</el-button> -->

      </span>
    </el-dialog>

    <el-table :data="blocks">
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="description" label="Description">
      </el-table-column>
      <el-table-column v-if="idRole == '1'" prop="aciton" label="Action">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
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
      blocks: [],
      dialogFormVisible: false,
      form: {
        description: "",
      },
      loading: false,
      formLabelWidth: "120px",
      rules: {
        description: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
        ],
      },
    };
  },
  async created() {
    this.getAllBlock();
  },
  computed: {
    ...mapGetters(["idRole"]),
  },
  methods: {
    handSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.$swal
            .fire({
              title: "Are you sure?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "I'm sure!",
            })
            .then((result) => {
              if (result.isConfirmed) {
                axios
                  .post("block", this.form)
                  .then((result) => {
                    console.log(result);
                    this.loading = false,
                    this.$swal({
                      icon: "success",
                      title: "Successful!",
                      showConfirmButton: false,
                    });
                    this.getAllBlock();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
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
              .delete(`block/${row.id}`)
              .then((result) => {
                this.getAllBlock();
                swalWithBootstrapButtons.fire(
                  "Status!",
                  `${result.data.status}`,
                  ""
                );
              })
              .catch((err) => {
                swalWithBootstrapButtons.fire("Error~~~", `${err}`, "error");
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Canceled!", "", "error");
          }
        });
    },
  },
};
</script>

<style></style>
