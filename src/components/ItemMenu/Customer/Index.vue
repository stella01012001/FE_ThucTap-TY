<template>
  <div>
    <div class="container-bar">
      <div>
        <!-- Thay nút từ dây -->
        <el-button type="primary" @click="dialogFormVisible = true"
          >Add new</el-button
        >
        <!-- tới đây  -->
      </div>
      <div class="container-search">
        <input
          type="text"
          v-model="search"
          placeholder="Type name to search"
          class="custom-input-search"
        />
      </div>
    </div>

    <!-- Sửa -->
    <el-dialog title="Edit Customer" :visible.sync="dialogFormEdit">
      <el-form :model="editform" :rules="rules1" ref="editform">
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
                v-model.number="editform.taxCode"
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
                style="width: 100%"
                format="yyyy/MM/dd"
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
              <el-input v-model.number="editform.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="Email"
              prop="email"
              :label-width="formLabelWidth"
            >
              <el-input v-model="editform.email" type="email" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="editEmployee('editform')"
          >Confirm</el-button
        >
      </span>
    </el-dialog>

    <el-dialog title="Add New Customer" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="Name" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="Tax Code"
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
                style="width: 100%"
                format="yyyy/MM/dd"
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

    <el-table
      :data="
        customers.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      border
      height="600px"
      style="width: 100%"
    >
      <el-table-column fixed width="90" prop="id" label="Id"> </el-table-column>
      <el-table-column width="180" prop="name" label="Name"> </el-table-column>
      <el-table-column width="90" align="center" prop="gender" label="Gender"> </el-table-column>
      <el-table-column width="200" prop="email" label="Email"> </el-table-column>
      <el-table-column width="120" prop="phone" label="Phone"> </el-table-column>
      <el-table-column width="110" prop="taxCode" label="Tax Code"> </el-table-column>
      <el-table-column width="110" prop="birth" label="Birth"> </el-table-column>
      <el-table-column width="200" prop="address" label="Address"> </el-table-column>
      
      <el-table-column width="190" prop="aciton" label="Action" fixed="right">
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
    var validatePhone = (rule, value, callback) => {
      const regex_phone = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
      if (!value.match(regex_phone)) {
        callback(new Error("Please input the Phone"));
      } else {
        callback();
      }
    };
    return {
      search: "",
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
          { required: true, message: "Please input phone", trigger: "blur"},
          { validator: validatePhone, trigger: "blur" },
        ],
        email: [
          {
            required: true,
            message: "Please input email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "You should input email",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "Please input name",
            trigger: "blur",
          },
        ],

        birth: [
          {
            required: true,
            message: "Please pick a date",
            trigger: "change",
          },
        ],
        address: [
          {
            required: true,
            message: "Please input address",
            trigger: "blur",
          },
        ],
        gender: [
          {
            required: true,
            message: "Please select activity gender",
            trigger: "change",
          },
        ],
      },
    };
  },
  async created() {
    this.getAllCus();
  },
  methods: {
    getEvent_type(id) {
      console.log(id);
    },

    handSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.birth = this.form.birth.getFullYear() + "-" + (this.form.birth.getMonth() + 1) + "-" + this.form.birth.getDate();
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
      this.editform.birth = this.editform.birth.getFullYear() + "-" + (this.editform.birth.getMonth() + 1) + "-" + this.editform.birth.getDate();
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
              .then((result) => {
                swalWithBootstrapButtons.fire("Status!", `${result.data.status}`, "");
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
