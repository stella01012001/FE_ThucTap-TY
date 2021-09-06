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
          <el-form-item label="DS" prop="idDS">
            <el-select
              v-model="form.add.idDS"
              placeholder="DS"
              @change="handleChangeDS"
            >
              <el-option
                v-for="item in data.list_DS"
                :key="item.id"
                :label="item.id"
                :value="item.id"
              >
                <span style="float: left">{{ item.id }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px"
                  >{{ item.customer.name }} - {{ item.unit.unit_code }}</span
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
                :label="data.dsid.customer"
                :value="data.dsid.idCustomer"
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
                :label="data.dsid.paymentTerm"
                :value="data.dsid.idPaymentTerm"
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
                :label="data.dsid.unit"
                :value="data.dsid.idUnit"
              ></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="CTR Amount">
            <el-input
              :value="data.dsid.amount"
              readonly
             
              :disabled="true"
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
          <el-form-item label="Event date" required>
            <el-form-item prop="event_dateevent_date">
              <el-date-picker
                type="date"
                format="yyyy/MM/dd"
                value-format="yyyy-MM-dd"
                placeholder="Pick a date"
                v-model="form.add.event_date"
                style="width: 100%;"
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
                track-by="id">
            </multiselect>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="DA Amount" prop="da_amount">
            <el-input
              v-model="form.add.amount"
              readonly
             
            ></el-input> </el-form-item
        ></el-col>
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
import Multiselect from 'vue-multiselect'
export default {
  components: {
        Multiselect
    },
  data() {
    return {
      form: {
        add: {
          idDS: null, //cmb chọn trc
          purchaser: null, //cmb theo ds
          name_purchaser: null,
          payment_term: null, // theo theo ds
          name_payment: null,
          description: "Desposit Agreement for DS ", //cớ địnhtheo ds
          unit_code: "", //cmbtheo ds
          name_unit: null,
          contract_amount: null, //set cứng, k lưu theo theo ds
          event_date: null,
          employee: null, // cmb độc lập
          amount: null, //txt theo ds
          note: "", //
        },
      },
      data: {
        list_DS: [],
        dsid: {
          idCustomer: null,
          customer: "",
          idUnit: null,
          unit: "",
          amount: null,
          idPaymentTerm: null,
          paymentTerm: "",
          ddAAmount: null,
        },
        employees: [],
      },
      rules: {
        idDS: [
          {
            required: true,
            message: "Please select Activity DS",
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
  methods: {
    submitForm(formName) {
      //this.form.add.event_date = this.form.add.event_date.getFullYear() + "-" + (this.form.add.event_date.getMonth() + 1) + "-" + this.form.add.event_date.getDate();
      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.add.employee = this.form.add.employee.id;
          axios
            .post("/da", this.form.add)
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
    getAllDS() {
      axios
        .get("/list-for-da")
        .then((result) => {
          this.data.list_DS = result.data.data;
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleChangeDS() {
      axios
        .get(`/info-for-da/${this.form.add.idDS}`)
        .then((result) => {
          this.form.add.name_purchaser = result.data.data[0].customer;
          this.form.add.purchaser = result.data.data[0].idCustomer;
          this.form.add.name_payment = result.data.data[0].paymentTerm;
          this.form.add.payment_term = result.data.data[0].idPaymentTerm;
          this.form.add.name_unit = result.data.data[0].unit;
          this.form.add.unit_code = result.data.data[0].idUnit;


          this.data.dsid = result.data.data[0];
          console.log(result);
          this.form.add.amount = this.data.dsid.ddAAmount;
        })
        .catch((err) => {
          console.log(err);
        });
      this.form.add.description =
        "Desposit Agreement for DS " + this.form.add.idDS;
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
    this.getAllDS();
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
.set-width input {
  width: 552px !important;
}
</style>
