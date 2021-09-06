<template>
  <div>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="Purchaser" prop="purchaser">
            <!-- <el-select
              v-model="form.purchaser"
              placeholder="Purchaser"
              @change="getIDPurchaser"
            >
              <el-option
                v-for="item in data.purchasers"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left">{{ item.id }}</span>
                <span style="float: right; font-size: 13px">
                  - {{ item.name }}</span
                >
              </el-option>
            </el-select> -->
            <multiselect
              v-model="form.purchaser"
              :options="data.purchasers"
              placeholder="Search and select one"
              label="name"
              track-by="id"
            >
            </multiselect> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="Unit" prop="unit">
            <el-select v-model="form.unit" placeholder="Unit">
              <el-option
                v-for="item in data.units"
                :key="item.id"
                :label="item.unit_code"
                :value="item.id"
              >
                <span style="float: left">{{ item.unit_code }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.amount
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="Payment term" prop="payment_term">
            <el-select v-model="form.payment_term" placeholder="Payment term">
              <el-option
                v-for="item in data.payment_terms"
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
        </el-col>
        <el-col :span="8">
          <el-form-item label="Employee" prop="employee">
            <!-- <el-select v-model="form.employee" placeholder="Employee">
              <el-option
                v-for="item in data.employees"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left">{{ item.id }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.name
                }}</span>
              </el-option>
            </el-select> -->

            <multiselect
              v-model="form.employee"
              :options="data.employees"
              placeholder="Search and select one"
              label="name"
              track-by="id"
            >
            </multiselect> </el-form-item
        ></el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="Event date" required>
            <el-form-item prop="event_date">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="Pick a date"
                v-model="form.event_date"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Amount" prop="amount">
            <el-input v-model="form.amount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="Description" prop="description">
            <el-input type="textarea" v-model="form.description" readonly></el-input>
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
        <el-button type="primary" @click="submitForm('form')">Create</el-button>
        <el-button @click="resetForm('form')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      form: {
        purchaser: "", // cmb lưu id
        unit: "",
        payment_term: "", // cmb lưu id
        event_date: null, //date picker
        amount: 200000000,
        description: "Deposit Slip (SPA/LTLA) ",
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
        purchaser: [
          {
            required: true,
            message: "Please select Activity purchaser",
            trigger: "change",
          },
        ],
        unit: [
          {
            required: true,
            message: "Please select Activity unit",
            trigger: "change",
          },
        ],
        payment_term: [
          {
            required: true,
            message: "Please select Activity payment term",
            trigger: "change",
          },
        ],
        employee: [
          {
            required: true,
            message: "Please select Activity employee",
            trigger: "change",
          },
        ],
      },
    };
  },
  async mounted() {
    this.getAllUnit();
    this.getAllPayment_term();
    this.getAllPurchaser();
    this.getAllEmployees();
  },
  methods: {
    submitForm(formName) {
      //this.form.event_date = this.form.event_date.getFullYear() + "-" + (this.form.event_date.getMonth() + 1) + "-" + this.form.event_date.getDate();

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.purchaser = this.form.purchaser.id;
          this.form.employee = this.form.employee.id;
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
    getAllUnit() {
      axios
        .get("unit-ds")
        .then((result) => {
          this.data.units = result.data.data;
          console.log(this.data.units);
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
        .get("employee-for-action")
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

<style src="vue-multiselect/dist/vue-multiselect.min.css">
.multiselect__single {
  height: 43px;
}
</style>
