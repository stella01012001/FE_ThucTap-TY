<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true"
      >Add new</el-button
    >

    <!-- Sửa -->
    <el-dialog title="Edit" :visible.sync="dialogFormEdit">
      <el-form :model="editform" rules="rules" ref="editform">
        <el-form-item label="Name" prop="name" :label-width="formLabelWidth">
          <el-input
            :value="editform.name"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="Tax Code"
              prop="taxCode"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="editform.taxCode"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="Birth"
              :label-width="formLabelWidth"
              prop="birth"
            >
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="editform.birth"
                style="width: 100%;"
                format="yyyy/MM/dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="Phone"
              prop="phone"
              :label-width="formLabelWidth"
            >
              <el-input v-model="editform.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="Email"
              prop="email"
              :label-width="formLabelWidth"
            >
              <el-input v-model="editform.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          label="Address"
          prop="address"
          :label-width="formLabelWidth"
        >
          <el-input v-model="editform.address" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="Gender"
          prop="gender"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="editform.gender">
            <el-radio label="Nam"></el-radio>
            <el-radio label="Nữ"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false">Cancel</el-button>
        <el-button type="primary" @click="editEmployee('editform')">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Add New" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="Name" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="Tax Code"
              prop="taxCode"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.taxCode" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="Birth"
              :label-width="formLabelWidth"
              prop="birth"
            >
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="form.birth"
                style="width: 100%;"
                format="yyyy/MM/dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="Phone"
              prop="phone"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="Email"
              prop="email"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          label="Address"
          prop="address"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="Gender"
          prop="gender"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="form.gender">
            <el-radio label="Nam"></el-radio>
            <el-radio label="Nữ"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handSubmit('form')"
          >Confirm</el-button
        >
      </span>
    </el-dialog>

    <el-table :data="customers">
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="gender" label="Gender"> </el-table-column>
      <el-table-column prop="taxCode" label="Tax Code"> </el-table-column>
      <el-table-column prop="birth" label="Birth"> </el-table-column>
      <el-table-column prop="phone" label="Phone"> </el-table-column>
      <el-table-column prop="address" label="Address"> </el-table-column>
      <el-table-column prop="email" label="Email"> </el-table-column>
      <el-table-column width="190" prop="aciton" label="Action">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            size="mini"
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
      formLabelWidth: "120px",
      customers: [],
      dialogFormVisible: false,
      form: {
        name: "",
        taxCode: "",
        birth: "",
        phone: "",
        address: "",
        email: "",
        gender: "",
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
      rules: {
        phone: [
          { required: true, message: "age is required" },
          { type: "number", message: "age must be a number" },
        ],
        email: [
          {
            required: true,
            message: "Please input NFA",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "Please input NFA",
            trigger: "blur",
          },
        ],
        taxCode: [
          { required: true, message: "age is required" },
          { type: "number", message: "age must be a number" },
        ],

        birth: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "change",
          },
        ],
        address: [
          {
            required: true,
            message: "Please input NFA",
            trigger: "blur",
          },
        ],
        gender: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.getAllCus();
  },
  methods: {
    getEvent_type(id) {
      console.log(id);
    },
    handSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("customer", this.form)
            .then((result) => {
              console.log(result);
              this.dialogFormVisible = false;
              this.$swal({
                icon: "success",
                title: "Successful!",
                showConfirmButton: false,
              });
              this.getAllCus();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getAllCus() {
      axios
        .get("customer")
        .then((result) => {
          this.customers = result.data.data;
          console.log(this.customers);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      this.dialogFormEdit = true;
      this.editform = row;
      console.log(index, row);
    },
    editEmployee(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("customer", this.editform)
            .then((result) => {
              console.log(result);
              this.dialogFormEdit = false;
              this.getAllCus();
              this.$swal({
                icon: "success",
                title: "Successful!",
                showConfirmButton: false,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
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
                this.getAllCus();
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
  },
};
</script>

<style></style>
