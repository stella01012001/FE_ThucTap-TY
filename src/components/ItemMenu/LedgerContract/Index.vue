<template>
  <div>
    <div class="container-bar">
      <div>
        <!-- Thay nút từ dây -->
        <el-button type="primary" @click="add_new">...</el-button>
        <!-- tới đây  -->
      </div>
      <div class="container-search">
        <input
          type="text"
          v-model="search"
          @change="show"
          placeholder="Type Contract to search"
          class="custom-input-search"
        />
      </div>
    </div>

    <!-- "tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" -->
    <el-table height="600"
      :data="
        listCTR.filter(
          (data) =>
            !search || data.idContract.toString().includes(search.toString())
        )
      "
    >
      <el-table-column align="center" fixed prop="id" width="50" label="id">
      </el-table-column>
      <el-table-column
        align="center"
        fixed
        width="100"
        prop="idContract"
        label="#contract"
      >
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        width="100"
        prop="payment"
        label="Status"
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
      <el-table-column align="center" width="150" prop="unit_code" label="Unit Code">
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="name"
        label="Purchaser"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        prop="dueDate"
        label="Due Date"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="250"
        prop="description"
        label="Description"
      >
      </el-table-column>
      <el-table-column align="center" width="150" prop="amount" label="Amount">
        <template slot-scope="scope">
          <p>
            {{ formatPrice(scope.row.amount) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="principal"
        label="Principal"
      >
        <template slot-scope="scope">
          <p>
            {{ formatPrice(scope.row.principal) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="amount_vat"
        label="Amount_vat"
      >
        <template slot-scope="scope">
          <p>
            {{ formatPrice(scope.row.amount_vat) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="land_use_fee"
        label="Land_use_fee"
      >
        <template slot-scope="scope">
          <p>
            {{ formatPrice(scope.row.land_use_fee) }}
          </p>
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
      listCTR: [],
      search: "",
    };
  },
  async created() {
    this.getListCTR();
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    },
    getListCTR() {
      axios
        .get("contract-pay")
        .then((result) => {
          this.listCTR = result.data.data;
          this.listCTR.forEach((element) => {
            if (element.payment == "") {
              element.payment = "Pendding";
            } else if (element.payment == "Canceled") {
              element.payment = "Canceled";
            }
            else {
              element.payment = "Approved";
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
      if (row.payment == "Approved") {
        this.$notify({
          title: "Warning",
          message: "This is a warning",
          type: "warning",
        });
      } else {
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
      }
    },
    add_new() {
      this.$router.push("/menu/ctr");
    },
    show() {
      console.log(this.search);
    },
  },
};
</script>

<style>
.el-tag--light {
  cursor: pointer;
}
</style>
