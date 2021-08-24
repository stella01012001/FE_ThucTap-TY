<template>
  <div>
    <div class="container-bar">
      <div>
        <!-- Thay nút từ dây -->
        <el-button
          v-if="idRole == '1'"
          type="primary"
          @click="dialogFormVisible = true"
          >Add new</el-button
        >
        <!-- tới đây  -->
      </div>
      <div class="container-search">
        <input
          type="text"
          v-model="search"
          placeholder="Type id to search"
          class="custom-input-search"
        />
      </div>
    </div>

    <!-- Sửa -->
    <!-- <el-dialog title="Edit" :visible.sync="dialogFormEdit">
      <el-form :model="editform">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input
            :value="editform.name"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="Birth" :label-width="formLabelWidth">
          <el-input v-model="editform.birth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone" :label-width="formLabelWidth">
          <el-input v-model="editform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Address" :label-width="formLabelWidth">
          <el-input v-model="editform.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="editform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Gender" :label-width="formLabelWidth">
          <el-input v-model="editform.gender" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false">Cancel</el-button>
        <el-button type="primary" @click="editEmployee">Confirm</el-button>
      </span>
    </el-dialog> -->

    <el-dialog title="Edit" :visible.sync="dialogFormEdit">
      <el-form :model="editform" rules="rules1" ref="editform">
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
              <el-input
                v-model.number="editform.phone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="Email"
              prop="email"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="editform.email"
                type="email"
                autocomplete="off"
              ></el-input>
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

    <el-dialog title="Add New" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="Name" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="Tax Code" :label-width="formLabelWidth">
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

    <!-- <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Birth" :label-width="formLabelWidth">
          <el-input v-model="form.birth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Address" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Gender" :label-width="formLabelWidth">
          <el-input v-model="form.gender" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handSubmit">Confirm</el-button>
      </span>
    </el-dialog> -->

    <el-table
      :data="
        employees.filter(
          (data) => !search || data.id.toString().includes(search.toString())
        )
      "
    >
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="gender" label="Gender"> </el-table-column>
      <el-table-column prop="birth" label="Birth"> </el-table-column>
      <el-table-column prop="phone" label="Phone"> </el-table-column>
      <el-table-column prop="address" label="Address"> </el-table-column>
      <el-table-column prop="email" label="Email"> </el-table-column>
      <el-table-column prop="idAcc" label="Account"> </el-table-column>
      <el-table-column width="190" prop="aciton" label="Action">
        <template v-if="idRole == '1'" slot-scope="scope">
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      employees: [],
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {
        name: "",
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
        birth: "",
        phone: "",
        address: "",
        email: "",
        gender: "",
      },
      rules: {
        phone: [
          { required: true, message: "Please input phone" },
          {
            min: 9999999999,
            max: 12,
            type: "number",
            message: "Length should be 9",
            trigger: "blur",
          },
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
            type: "date",
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
    this.getAllEmployee();
  },
  computed: {
    ...mapGetters(["idRole"]),
  },
  methods: {
    handSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("employee", this.form)
            .then((result) => {
              console.log(result);
              this.dialogFormVisible = false;
              this.$swal({
                icon: "success",
                title: "Successful!",
                showConfirmButton: false,
              });
              this.getAllEmployee();
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
    getAllEmployee() {
      axios
        .get("employee")
        .then((result) => {
          this.employees = result.data.data;
          console.log(this.eventTypes);
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
    editEmployee() {
      axios
        .post("employee", this.editform)
        .then((result) => {
          console.log(result);
          this.dialogFormEdit = false;
          this.getAllEmployee();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDelete(index, row) {
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
              .delete(`employee/${row.id}`)
              .then((result) => {
                swalWithBootstrapButtons.fire(
                  "Status!",
                  `${result.data.status}`,
                  ""
                );
                this.getAllEmployee();
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
};
</script>

<style></style>
