<template>
  <div>
    <el-button type="primary" @click="add_new">...</el-button>

    <el-table  :data="listCTR">
        <el-table-column align="center" fixed prop="id" width="50" label="id">
      </el-table-column>
      <el-table-column align="center" fixed width="100" prop="idContract" label="#contract">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        width="100"
        prop="payment"
        label="Status"
        :filters="[
          { text: 'Pendding', value: 'Pendding' },
          { text: 'Approved', value: 'Approved' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            @click="changeStatus(scope.row)"
            :type="scope.row.payment === 'Pendding' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.payment }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" prop="unit" label="Unit Code">
      </el-table-column>
      <el-table-column align="center" width="150" prop="customer" label="Purchaser">
      </el-table-column> 
      <el-table-column align="center" width="200" prop="dueDate" label="Due Date">
      </el-table-column>
      <el-table-column
        align="center"
        width="250"
        prop="description"
        label="Description"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="amount"
        label="Amount"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="principal"
        label="Principal"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="amount_vat"
        label="Amount_vat"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="land_use_fee"
        label="Land_use_fee"
      >
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      listCTR: [],
    };
  },
  created() {
    this.getListCTR();
  },
  methods: {
    getListCTR() {
      axios
        .get("contract-pay")
        .then((result) => {
          this.listCTR = result.data.data;  
          this.listCTR.forEach(element => {
            if (element.payment == '') {
              element.payment = 'Pendding'
            } else {
              element.payment = 'Approved'
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      this.dialogFormEdit = true;
      this.editform = row;
      console.log(index, row);
      this.$router.push(`/detail-unit/${row.id}`);
    },
    editEmployee() {
      axios
        .post("contract", this.editform)
        .then((result) => {
          console.log(result);
          this.dialogFormEdit = false;
          this.getListCTR();
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
                this.getListCTR();
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
    changeStatus(row) {
      axios
        .get(`contract-pay/${row.id}`) //api chua lam
        .then(() => {
          this.$message({
            showClose: true,
            message: "Congrats, this is a success message.",
            type: "success",
          });
          this.getListCTR();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    add_new() {
      this.$router.push("/menu/ctr");
    },
  },
};
</script>

<style></style>
