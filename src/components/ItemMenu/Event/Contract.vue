<template>
  <div>
    <el-form
      :model="form.add"
      :rules="rules"
      ref="form.add"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="DA" prop="idDA">
            <el-select
              v-model="form.add.idDA"
              placeholder="DA"
              @change="handleChangeDA"
            >
              <el-option
                v-for="item in data.list_DA"
                :key="item.id"
                :label="item.id"
                :value="item.id"
              >
                <span style="float: left">{{ item.id }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px"
                  >{{ item.customer }} - {{ item.unit }}</span
                >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8"
          ><el-form-item label="Purchaser" prop="purchaser">
            <el-input
              v-model="form.add.name_purchaser"
              placeholder="Purchaser"
              readonly
              :disabled="true"
            ></el-input>

            <!-- <el-select v-model="form.add.purchaser" placeholder="Purchaser">
              <el-option
                :label="data.daid.customer"
                :value="data.daid.customer"
              ></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="Payment term" prop="payment_term">
            <el-input
              v-model="form.add.name_payment"
              placeholder="Payment term"
              readonly
              :disabled="true"
            ></el-input>

            <!-- <el-select
              v-model="form.add.payment_term"
              placeholder="Payment term"
            >
              <el-option
                :label="data.daid.paymentTerm"
                :value="data.daid.paymentTerm"
              ></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Unit code" prop="unit_code">
            <el-input
              v-model="form.add.name_unit"
              placeholder="Unit code"
              readonly
              :disabled="true"
            ></el-input>

            <!-- <el-select v-model="form.add.unit_code" placeholder="Unit code">
              <el-option
                :label="data.daid.unit"
                :value="data.daid.unit"
              ></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="Amount">
            <el-input
              v-model="form.add.amount"
              readonly
            ></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="Description" prop="description">
            <el-input
              v-model="form.add.description"
              readonly
            ></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="Event date">
            <el-form-item prop="event_date">
              <el-date-picker
                type="date"
                format="yyyy/MM/dd"
                placeholder="Pick a date"
                v-model="form.add.event_date"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Agency" prop="employee">
            <!-- <el-select v-model="form.add.employee" placeholder="Agency">
              <el-option
                v-for="item in data.employees"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.name
                }}</span>
              </el-option>
            </el-select> -->

            <multiselect
              v-model="form.add.employee"
              :options="data.employees"
              placeholder="Search and select one"
              label="name"
              track-by="id"
            >
            </multiselect>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="Note" prop="note">
            <el-input v-model="form.add.note"> </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form.add')"
          >Create</el-button
        >
        <el-button @click="resetForm('form.add')">Reset</el-button>
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
        add: {
          idDA: null, //cmb chọn trc by id`
          purchaser: null, //cmb theo da
          name_purchaser: null,
          payment_term: null, // theo theo da
          name_payment: null,
          description: "Contract for DA ", //cớ định theo da  `
          unit_code: "", //cmb theo da
          name_unit: null,
          amount: null, //set cứng, lưu`
          event_date: null, //tạo mới `
          employee: "", // cmb độc lập `
          note: "", //`
        },
      },
      data: {
        list_DA: [],
        daid: {},
        employees: [],
      },
      rules: {
        idDA: [
          {
            required: true,
            message: "Please select Activity DA",
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
        event_date: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      //this.form.add.event_date = this.form.add.event_date.getFullYear() + "-" + (this.form.add.event_date.getMonth() + 1) + "-" + this.form.add.event_date.getDate();

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.add.event_date =
            this.form.add.event_date.getFullYear() +
            "-" +
            (this.form.add.event_date.getMonth() + 1) +
            "-" +
            this.form.add.event_date.getDate();
          this.form.add.employee = this.form.add.employee.id;
          axios
            .post("/contract", this.form.add)
            .then((result) => {
              console.log(result);
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getAllCtr() {
      axios
        .get("/list-for-ctr")
        .then((result) => {
          this.data.list_DA = result.data.data;
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleChangeDA() {
      axios
        .get(`/info-for-ctr/${this.form.add.idDA}`)
        .then((result) => {
          this.form.add.name_purchaser = result.data.data[0].customer;
          this.form.add.name_payment = result.data.data[0].paymentTerm;
          this.form.add.name_unit = result.data.data[0].unit;

          this.data.daid = result.data.data[0];
          console.log(result);
          this.form.add.amount = this.data.daid.amount;
        })
        .catch((err) => {
          console.log(err);
        });
      this.form.add.description += this.form.add.idDA;
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
  async mounted() {
    this.getAllEmployees();
    this.getAllCtr();
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
.set-width input {
  width: 552px !important;
}
</style>
