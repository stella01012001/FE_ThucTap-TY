<template>
  <div>
    <!-- copy từ đây -->
    <div class="container-bar">
      <div>
        <!-- Thay nút từ dây -->
        <el-button v-if="idRole == '1'" type="primary" @click="swicthToAdd"
          >Add new</el-button
        >
        <el-button type="primary" @click="getAllUnit">Refesh</el-button>
        <el-button type="primary" @click="handleExportUnit">Export</el-button>
        <!-- tới đây  -->
      </div>
      <div class="container-search">
        <input
          type="text"
          v-model="search"
          placeholder="Type Unit code to search"
          class="custom-input-search"
        />
      </div>
    </div>
    <!-- tới đây -->

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
          <el-input v-model="form.numFloor" autocomplete="off"></el-input>
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

    <el-table
      border
      :data="
        units.filter(
          (data) =>
            !search ||
            data.unit_code.toLowerCase().includes(search.toLowerCase())
        )
      "
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column align="center" fixed prop="id" label="Id">
      </el-table-column>
      <el-table-column
        align="center"
        width="95"
        prop="unit_type.description"
        label="Unit Type"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="95"
        prop="unit_code"
        label="Unit Code"
      >
      </el-table-column>
      <el-table-column align="center" prop="block.description" label="Block">
      </el-table-column>
      <el-table-column align="center" prop="numFloor" label="Floor">
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
        prop="status"
        label="Status"
        :filters="[
          { text: 'CTR', value: 'CTR' },
          { text: 'DS', value: 'DS' },
          { text: 'DA', value: 'DA' },
          { text: 'Empty', value: '' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <p v-if="!scope.row.status">{{ scope.row.status }}</p>

          <el-popconfirm
            v-else
            confirm-button-text="OK"
            cancel-button-text="No"
            icon="el-icon-info"
            icon-color="red"
            title="Are you sure to cancel this?"
            @confirm="cancelUnit(scope.row.id)"
          >
            <el-button slot="reference" class="fix-heigh status-active">
              {{ scope.row.status }}
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="NFA" label="NFA"> </el-table-column>
      <el-table-column align="center" prop="GFA" label="GFA"> </el-table-column>
      <el-table-column
        align="center"
        width="95"
        prop="price_NFA"
        label="Price NFA"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="95"
        prop="land_area"
        label="Land Area"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="no_of_br"
        label="Num of bedroom"
      ></el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="land_use_fee"
        label="Land Use Fee"
      >
        <template slot-scope="scope">
          <p>
            {{ formatPrice(scope.row.land_use_fee) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="110"
        prop="direction"
        label="Direction"
      >
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
            >Info</el-button
          >
          <el-button
            v-if="idRole == '1'"
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
      search: "",
      data: {
        multipleSelection: [],
      },
      checked: true,
      formLabelWidth: "120px",
      units: [],
      dialogFormVisible: false,
      form: {
        numFloor: "",
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
    };
  },
  async created() {
    this.getAllUnit();
  },
  computed: {
    ...mapGetters(["idRole"]),
  },
  methods: {
    cancelUnit(id) {
      axios
        .delete(`cu7t1/${id}`)
        .then(() => {
          this.$swal.fire(
            "Đã khóa!",
            "Nhân viên này không thể đăng nhập.",
            "success"
          );
          this.getAllUnit();
        })
        .catch((err) => {
          this.$swal.fire("Lỗi!", err, "success");
        });
    },
    filterTag(value, row) {
      return row.status === value;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    },
    swicthToAdd() {
      this.$router.push(`/add-unit`);
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
          this.getAllUnit();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllUnit() {
      axios
        .get("unit")
        .then((result) => {
          this.units = result.data.data;
          console.log(this.units);
          this.units.forEach((element) => {
            if (parseInt(element.status) == 1) {
              element.status = "DS";
            } else if (parseInt(element.status) == 2) {
              element.status = "DA";
            } else if (parseInt(element.status) == 3) {
              element.status = "CTR";
            } else {
              element.status = "";
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
          this.getAllUnit();
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
              .delete(`unit/${row.id}`)
              .then((result) => {
                swalWithBootstrapButtons.fire(
                  "Status!",
                  `${result.data.status}`,
                  ""
                );
                this.getAllUnit();
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
  },
};
</script>

<style>
.container-search input {
  height: 40px;
  border-radius: 4px;
  border-color: #d4d4d4;
}

.container-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
</style>
