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
        listDA.filter(
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
        prop="status"
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
            :type="scope.row.status === 'Pendding' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.status }}</el-tag
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
            >Cancle</el-button
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
      listDA: [],
      search: "",
    };
  },
  async created() {
    this.getListDA();
  },
  computed: {
    ...mapGetters(["idRole"]),
  },
  methods: {
    filterTag(value, row) {
        return row.status === value;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    },
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
      this.$router.push(`edit-da/${row.id}`);
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
              .delete(`da/${row.id}`)
              .then((result) => {
                swalWithBootstrapButtons.fire("Status!", `${result.data.status}`, "");
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
    changeStatus(row) {
      if (row.status == "Approved") {
        this.$notify({
          title: "Warning",
          message: "This is a warning",
          type: "warning",
        });
      } else {
          axios
        .get(`approved-da/${row.id}`)
        .then(() => {
          this.$message({
            showClose: true,
            message: "Congrats, this is a success message.",
            type: "success",
          });
          this.getListDA();
        })
        .catch((err) => {
          console.log(err);
        });
      }
    },
    add_new() {
      this.$router.push("/menu/da");
    },
  },
};
</script>

<style>
.el-tag--light {
  cursor: pointer;
}
</style>
