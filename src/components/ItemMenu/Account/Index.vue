<template>
  <div>
    <el-button type="primary" @click="swicthToAdd">Add new</el-button>
    <el-button type="primary" @click="getAllAccount">Refesh</el-button>
    <!-- <el-button type="primary" @click="handleExportUnit">Export</el-button> -->

    <!-- edit -->
    <el-dialog title="Add unit" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Unit Type" :label-width="formLabelWidth">
          <el-input v-model="form.idUnitType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Unit Code" :label-width="formLabelWidth">
          <el-input v-model="form.unit_code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Block" :label-width="formLabelWidth">
          <el-input v-model="form.idBlock" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Floor" :label-width="formLabelWidth">
          <el-input v-model="form.idFloor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Amount" :label-width="formLabelWidth">
          <el-input v-model="form.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="NFA" :label-width="formLabelWidth">
          <el-input v-model="form.NFA" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="GFA" :label-width="formLabelWidth">
          <el-input v-model="form.GFA" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Price NFA" :label-width="formLabelWidth">
          <el-input v-model="form.price_NFA" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Land Area" :label-width="formLabelWidth">
          <el-input v-model="form.land_area" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Num of bedroom" :label-width="formLabelWidth">
          <el-input v-model="form.no_of_br" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Land Use Fee" :label-width="formLabelWidth">
          <el-input v-model="form.land_use_fee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Direction" :label-width="formLabelWidth">
          <el-input v-model="form.direction" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handSubmit">Confirm</el-button>
      </span>
    </el-dialog>

    <el-table border :data="listAcc" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column align="center" width="55" fixed prop="id" label="Id">
      </el-table-column>
      <el-table-column
        align="center"
        width="95"
        prop="username"
        label="User name"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="120"
        prop="description"
        label="Description"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        label="Status"
        fixed
        width="120"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            @click="changeStatus(scope.row)"
            :type="scope.row.status === 'Block' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.status }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column align="center" prop="idEmployee" label="idEmployee">
      </el-table-column>
      <el-table-column align="center" width="150" prop="name" label="Employee">
      </el-table-column>
      <el-table-column align="center" prop="email" label="Email">
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
      data: {
        multipleSelection: [],
      },
      checked: true,
      formLabelWidth: "120px",
      listAcc: [],
      dialogFormVisible: false,
      form: {
        idFloor: "",
        idUnitType: "",
        amount: "",
        unit_code: "",
        price_NFA: "",
        NFA: "",
        GFA: "",
        land_area: "",
        no_of_br: "",
        land_use_fee: "",
        direction: "",
        idBlock: "",
      },
      dialogFormEdit: false,
      editform: {
        id: null,
        name: "",
        taxCode: "",
        birth: "",
        phone: "",
        address: "",
        email: "",
        gender: "",
      },
      changeActive: {
        status: "",
      },
    };
  },
  created() {
    this.getAllAccount();
  },
  methods: {
    swicthToAdd() {
      this.$router.push(`/add-account`);
    },
    handSubmit() {
      this.dialogFormVisible = false;
      axios
        .post("unit", this.form)
        .then((result) => {
          console.log(result);
          this.$swal({
            icon: "success",
            title: "Successful!",
            showConfirmButton: false,
          });
          this.getAllAccount();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllAccount() {
      axios
        .get("account")
        .then((result) => {
          this.listAcc = result.data.data;
          console.log(this.listAcc);
          this.listAcc.forEach((element) => {
            if (element.status == 0) {
              element.status = "Block";
            } else {
              element.status = "Actived";
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
        .post("unit", this.editform)
        .then((result) => {
          console.log(result);
          this.dialogFormEdit = false;
          this.getAllAccount();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
            if (this.$store.getters.id == row.id) {
              swalWithBootstrapButtons.fire("Canceled", "Not delete", "error");
              return;
            }
            axios
              .delete(`delete-acc/${row.id}`)
              .then(() => {
                swalWithBootstrapButtons.fire("Deleted!", "", "success");
                this.getAllAccount();
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
    handleSelectionChange(val) {
      this.data.multipleSelection = val;
      console.log(this.data.multipleSelection);
    },
    handleExportUnit() {
      if (this.data.multipleSelection.length != 0) {
        axios
          .post("exportunit", this.data.multipleSelection, {
            responseType: "blob",
          })
          .then((result) => {
            // programmatically 'click'.
            const link = document.createElement("a");

            // Tell the browser to associate the response data to
            // the URL of the link we created above.
            link.href = window.URL.createObjectURL(new Blob([result.data]));

            // Tell the browser to download, not render, the file.
            link.setAttribute("download", "report.xlsx");
            document.body.appendChild(link);

            // Make the magic happen!
            link.click();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },
    changeStatus(row) {
      this.changeActive.status = row.status;
      console.log(this.changeActive.status);
      axios
        .patch(`update-acc/${row.id}`, this.changeActive)
        .then((res) => {
          console.log(res.data.status.status);
          this.$message({
            showClose: true,
            message: res.data.status,
            type: "success",
          });
          this.getAllAccount();
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            showClose: true,
            message: err,
            type: "error",
          });
        });
    },
  },
};
</script>

<style></style>
