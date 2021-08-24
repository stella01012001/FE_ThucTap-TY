<template>
  <div>
    <el-button v-if="idRole == '1'" type="text" @click="dialog = true"
      >Add new</el-button
    >

    <el-drawer
      title="Add New"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="120px"
          class="demo-form"
        >
          <el-form-item label="InstallmentNo" prop="installmentNo">
            <el-input v-model.number="form.installmentNo"></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="Percent" prop="percent">
            <el-input
              v-model.number="form.percent"
              placeholder="0 to 100"
            ></el-input>
          </el-form-item>
          <el-form-item label="Quantity" prop="quantity">
            <el-input v-model.number="form.quantity"></el-input>
          </el-form-item>
          <el-form-item label="Timeunit" prop="timeunit">
            <el-radio-group v-model="form.timeUnit">
              <el-radio label="D"></el-radio>
              <el-radio label="M"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Vat" prop="vat">
            <el-input
              v-model.number="form.vat"
              placeholder="0 to 100"
            ></el-input>
          </el-form-item>
          <el-form-item label="Active" prop="active">
            <el-switch v-model="form.active"></el-switch>
          </el-form-item>
        </el-form>
        <div class="drawer__footer">
          <el-button @click="cancelForm">Cancel</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="loading">{{
            loading ? "Submitting ..." : "Submit"
          }}</el-button>
        </div>
      </div>
    </el-drawer>
    <el-table border :data="data.paymentTerm" style="width: 100%">
      <el-table-column fixed prop="id" label="ID" width="50"> </el-table-column>
      <el-table-column prop="idPaymentTerm" label="ID Payment Term" width="150">
      </el-table-column>
      <el-table-column prop="installmentNo" label="Installment No" width="130">
      </el-table-column>
      <el-table-column prop="description" label="Description" width="120">
      </el-table-column>
      <el-table-column prop="percent" label="Percent" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.percent * 100 }}%</p>
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="Quantity" width="120">
      </el-table-column>
      <el-table-column prop="timeUnit" label="TimeUnit" width="120">
      </el-table-column>
      <el-table-column prop="vat" label="Vat" width="120">
        <template slot-scope="scope">
          <p>{{ scope.row.vat * 100 }}%</p>
        </template>
      </el-table-column>
      <el-table-column prop="active" label="Land_fee" width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-button-group>
            <!-- <el-button size="small" type="primary" @click="handleClick"
              >Fix</el-button
            > -->
            <el-button
              v-if="idRole == '1'"
              type="danger"
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
import { mapGetters } from "vuex";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the age"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please input digits"));
        } else {
          if (value >= 100) {
            callback(new Error("Age must be greater than 100"));
          } else if (value < 0) {
            callback(new Error("Age must be greater than 0"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      data: {
        paymentTerm: [],
      },

      dialog: false,
      loading: false,
      form: {
        idPaymentTerm: "",
        installmentNo: "",
        description: "",
        percent: "",
        quantity: "",
        timeUnit: "",
        vat: "",
        active: false,
      },
      formLabelWidth: "80px",
      timer: null,
      rules: {
        installmentNo: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          { type: "number", message: "num floor must be a number" },
        ],
        desription: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
        ],
        percent: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          { validator: checkAge, trigger: "blur" },
        ],
        quantity: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          { validator: checkAge, trigger: "blur" },
        ],
        vat: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          { validator: checkAge, trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["idRole"]),
  },
  methods: {
    getPaymentTermByID() {
      axios
        .get(`paymentTermDefinitions/${this.$route.params.id}`)
        .then((result) => {
          this.data.paymentTerm = result.data.data;
          this.form.idPaymentTerm = this.data.paymentTerm[0].idPaymentTerm;
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
                this.getPaymentTermByID();
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
    handleSubmit() {
      this.$confirm("Do you want to submit?")
        .then(() => {
          this.$refs["form"].validate((valid) => {
            if (valid) {
              this.loading = true;
              axios
                .post("paymentTermDefinition", this.form)
                .then(() => {
                  this.dialog = false;
                  this.$notify({
                    title: "Success",
                    message: "This is a success ok",
                    type: "success",
                  });
                  this.getPaymentTermByID();
                  this.loading = false;
                  this.$refs['form'].resetFields();
                })
                .catch((err) => {
                  this.$notify.error({
                    title: "Error",
                    message: `${err}`,
                  });
                });
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        })
        .catch(() => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
      this.$refs["form"].resetFields();
    },
    handleClick() {},
  },
  async mounted() {
    this.getPaymentTermByID();
  },
};
</script>

<style>
.drawer__footer {
  padding-left: 30px;
}
</style>
