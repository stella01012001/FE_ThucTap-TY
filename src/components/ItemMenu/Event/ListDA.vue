<template>
  <div>
    <el-button type="primary" @click="add_new"
      >Add new</el-button
    >

    <el-table border :data="listDA">
      <el-table-column align="center" fixed prop="id" label="Id"> </el-table-column>
      <el-table-column align="center" fixed width="100" prop="status" label="Status"> </el-table-column>
      <el-table-column align="center" width="200" prop="customer" label="Purchaser"> </el-table-column>
      <el-table-column align="center" width="150" prop="unit" label="Unit Code"> </el-table-column>
      <el-table-column align="center" width="200" prop="name" label="Employee"> </el-table-column>
      <el-table-column align="center" width="250" prop="paymentTerm" label="Payment Term"> </el-table-column>
      <el-table-column align="center" width="150" prop="event_date" label="Event Date"> </el-table-column>
      <el-table-column align="center" width="450" prop="description" label="Description"> </el-table-column>
      <el-table-column align="center" width="250" prop="note" label="Note"> </el-table-column>
      <el-table-column align="center" width="250" prop="amount" label="Amount"> </el-table-column>
      <el-table-column fixed="right" width="200" align="center" prop="aciton" label="Action">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >Info</el-button
          >
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
export default {
  data() {
    return {
      listDA: [],
    };
  },
  created() {
    this.getListDA();
  },
  methods: {
    getListDA() {
      axios
        .get("da")
        .then((result) => {
          this.listDA = result.data.data;
          console.log(this.listDA);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      this.dialogFormEdit = true;
      this.editform = row;
      console.log(index, row);
      this.$router.push(`/detail-unit/${row.id}`)
    },
    editEmployee() {
      axios
        .post("unit", this.editform)
        .then((result) => {
          console.log(result);
          this.dialogFormEdit = false;
          this.getListDA();
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
              .delete(`customer/${row.id}`)
              .then(() => {
                swalWithBootstrapButtons.fire("Deleted!", "", "success");
                this.getListDA();
              })
              .catch((err) => {
                swalWithBootstrapButtons.fire("Error~~~", `${err}`, "error");
                console.log(err);
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Canceled", "", "error");
          }
        });
    },
    add_new(){
        this.$router.push('/menu/da')
    }
  },
};
</script>

<style>

</style>
