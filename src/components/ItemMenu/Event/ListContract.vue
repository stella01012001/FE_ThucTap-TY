<template>
  <div>
    <div class="container-bar">
      <div>
        <!-- Thay nút từ dây -->
        <el-button type="primary" @click="add_new">Add new</el-button>
        <!-- tới đây  -->
      </div>
      <div class="container-search">
        <input
          type="text"
          v-model="search"
          placeholder="Type purchaser to search"
          class="custom-input-search"
        />
      </div>
    </div>

    <el-table
      border
      :data="
        listCTR.filter(
          (data) =>
            !search ||
            data.customer.toLowerCase().includes(search.toLowerCase())
        )
      "
    >
      <el-table-column align="center" fixed prop="id" label="Id" column-key="id"
        sortable>
      </el-table-column>
      <el-table-column
        align="center"
        fixed
        width="100"
        prop="ctrStatus"
        label="Status"
        :filters="[
          { text: 'Pendding', value: 'Pendding' },
          { text: 'Approved', value: 'Approved' },
          { text: 'Canceled', value: 'Canceled' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            @click="changeStatus(scope.row)"
            :type="scope.row.ctrStatus === 'Pendding' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.ctrStatus }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        prop="customer"
        label="Purchaser"
      >
      </el-table-column>
      <el-table-column align="center" width="150" prop="unit" label="Unit Code">
      </el-table-column>
      <el-table-column align="center" width="200" prop="name" label="Employee">
      </el-table-column>
      <el-table-column
        align="center"
        width="250"
        prop="paymentTerm"
        label="Payment Term"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="event_date"
        label="Event Date"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="450"
        prop="description"
        label="Description"
      >
      </el-table-column>
      <el-table-column align="center" width="250" prop="note" label="Note">
      </el-table-column>
      <el-table-column align="center" width="250" prop="amount" label="Amount">
        <template slot-scope="scope">
          <p>
            {{ formatPrice(scope.row.amount) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="200"
        align="center"
        prop="aciton"
        label="Action"
      >
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Cancel</el-button
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
      listCTR: [],
      search: "",
    };
  },
  async created() {
    this.getListCTR();
  },
  computed: {
    ...mapGetters(["idRole"]),
  },
  methods: {
    filterTag(value, row) {
      return row.ctrStatus === value;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    },
    getListCTR() {
      axios
        .get("contract")
        .then((result) => {
          this.listCTR = result.data.data;
          console.log(this.listCTR);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      this.dialogFormEdit = true;
      this.editform = row;
      console.log(index, row);
      this.$router.push(`edit-ctr/${row.id}`);
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
          text: "You will be able to recover after cancel!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, cancel it!",
          cancelButtonText: "No!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`contract/${row.id}`)
              .then(() => {
                swalWithBootstrapButtons.fire("Success!", "", "success");
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
      if (row.ctrStatus == "Approved") {
        this.$notify({
          title: "Warning",
          message: "This is a warning",
          type: "warning",
        });
      } else {
          axios
        .get(`approved-contract/${row.id}`)
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
  },
};
</script>

<style>
.el-tag--light {
  cursor: pointer;
}
</style>
