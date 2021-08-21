<template>
  <div>
    <el-button v-if="idRole == '1'" type="primary" @click="dialogFormVisible = true">Add new</el-button>

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
      <el-table-column prop="numFloor" label="Num Floor"> </el-table-column>
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
      floors: [],
      dialogFormVisible: false,
      form: {
        numFloor: "",
        description: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getAllFloor();
  },
  computed: {
    ...mapGetters(["idRole"]),
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
              .delete(`floor/${row.numFloor}`)
              .then((result) => {
                this.getAllFloor();
                swalWithBootstrapButtons.fire("Status!", `${result.data.status}`, "");
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
  },
};
</script>

<style></style>
