<template>
  <div>
    <el-table :data="data.paymentTerm" style="width: 100%">
      <el-table-column fixed prop="id" label="ID" width="150">
      </el-table-column>
      <el-table-column prop="idPaymentTerm" label="ID Payment Term" width="120">
      </el-table-column>
      <el-table-column prop="installmentNo" label="Installment No" width="120">
      </el-table-column>
      <el-table-column prop="description" label="Description" width="120">
      </el-table-column>
      <el-table-column prop="percent" label="Percent" width="300">
      </el-table-column>
      <el-table-column prop="quantity" label="Quantity" width="120">
      </el-table-column>
      <el-table-column prop="timeUnit" label="TimeUnit" width="120">
      </el-table-column>
      <el-table-column prop="vat" label="Vat" width="120"> </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" type="primary" @click="handleClick"
              >Fix</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="handleDelete(scope.row)"
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
export default {
  data() {
    return {
      data: {
        paymentTerm: [],
      },
    };
  },
  methods: {
    getPaymentTermByID() {
      axios
        .get(`paymentTermDefinitions/${this.$route.params.id}`)
        .then((result) => {
          this.data.paymentTerm = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDelete(row) {
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
              .delete(`paymentTermDefinition/${row.id}`)
              .then(() => {
                swalWithBootstrapButtons.fire("Deleted!", "", "success");
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
  },
  mounted() {
    this.getPaymentTermByID();
  },
};
</script>

<style></style>
