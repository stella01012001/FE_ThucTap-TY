<template>
  <div>
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="Purchaser" prop="purchaser">
            <el-input
              v-model="form.purchaser"
              readonly
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="Unit" prop="unit">
            <el-input v-model="form.unit" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="Payment term" prop="payment_term">
            <el-input v-model="form.payment_term" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Employee" prop="employee">
            <el-input
              v-model="form.employee"
              readonly
            ></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="Event date" required>
            <el-form-item prop="event_date">
              <el-input v-model="form.event_date" readonly></el-input>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Amount" prop="amount">
            <el-input v-model="form.amount" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="Description" prop="description">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="Note" prop="note">
            <el-input type="textarea" v-model="form.note"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >Create</el-button
        >
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        purchaser: "", // cmb lưu id
        unit: "",
        payment_term: "", // cmb lưu id
        event_date: "", //date picker
        amount: 200000000,
        description: "Deposit Slip (SPA/LTLA) ",
        note: "",
        employee: null, //cmb lưu id
      },
      data: {
        listDS: [],
        // payment_terms: [],
        // purchasers: [],
        // employees: [],
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        purchaser: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        unit: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        payment_term: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        employee: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      console.log(this.form);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("ds", this.form)
            .then((result) => {
              console.log(result);
              this.$swal({
                icon: "success",
                title: "Successful!",
                showConfirmButton: false,
              });
              //this.getAllBlock();
            })
            .catch((err) => {
              console.log(err);
              this.$swal({
                icon: "error",
                title: "error!",
                showConfirmButton: false,
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getDSById() {
      axios
        .get(`ds/${this.$route.params.id}`)
        .then((result) => {
          this.form = result.data.data;
          console.log(this.data.listDS);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllPayment_term() {
      axios
        .get("paymentTerm")
        .then((result) => {
          this.data.payment_terms = result.data.data;
          console.log(this.blocks);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getIDPurchaser() {
      this.data.purchasers.forEach((element) => {
        if (element.id == this.form.purchaser) {
          this.form.description += element.id + "-" + element.name;
        }
      });
    },
    getAllPurchaser() {
      axios
        .get("customer")
        .then((result) => {
          this.data.purchasers = result.data.data;
          console.log(this.blocks);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllEmployees() {
      axios
        .get("employee")
        .then((result) => {
          this.data.employees = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
