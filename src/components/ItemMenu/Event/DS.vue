<template>
  <div>
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="Purchaser" prop="purchaser">
        <el-select v-model="form.purchaser" placeholder="Purchaser">
          <el-option
            v-for="item in purchasers"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.name
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Unit" prop="unit">
        <el-select v-model="form.unit" placeholder="Unit">
          <el-option
            v-for="item in units"
            :key="item.id"
            :label="item.amount"
            :value="item.id"
          >
            <span style="float: left">{{ item.id }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.amount
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Payment term" prop="payment_term">
        <el-select v-model="form.payment_term" placeholder="Payment term">
          <el-option
            v-for="item in payment_terms"
            :key="item.id"
            :label="item.description"
            :value="item.id"
          >
            <span style="float: left">{{ item.id }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.description
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Employee" prop="employee">
        <el-select v-model="form.employee" placeholder="Employee">
          <el-option
            v-for="item in employee"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
            <span style="float: left">{{ item.id }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.name
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Event date" required>
        <el-col :span="11">
          <el-form-item prop="event_date">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="form.event_date"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Amount" prop="amount">
        <el-input v-model="form.amount"></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="Note" prop="note">
        <el-input type="textarea" v-model="form.note"></el-input>
      </el-form-item>
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
        description: "",
        note: "",
        employee: null, //cmb lưu id
      },
      data: {
        units: [],
        payment_terms: [],
        purchasers: [],
        employees: [],
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
        region: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "Please pick a time",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change",
          },
        ],
        resource: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getAllUnit() {
      axios
        .get("unit")
        .then((result) => {
          this.data.units = result.data.data;
          console.log(this.blocks);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllPayment_term() {
      axios
        .get("payment_term")
        .then((result) => {
          this.data.payment_terms = result.data.data;
          console.log(this.blocks);
        })
        .catch((err) => {
          console.log(err);
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
