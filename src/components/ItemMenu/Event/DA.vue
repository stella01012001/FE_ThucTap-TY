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
          <el-form-item label="DS" prop="DS">
            <el-select
              v-model="form.add.DS"
              placeholder="DS"
              @change="handleChangeDS"
            >
              <el-option
                v-for="item in data.list_DS"
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
        </el-col>
        <el-col :span="8"
          ><el-form-item label="Purchaser" prop="purchaser">
            <el-select v-model="form.add.purchaser" placeholder="Purchaser">
              <el-option
                :label="data.dsid.cutomers"
                :value="data.dsid.idCutomers"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="Payment term" prop="payment_term">
            <el-select
              v-model="form.add.payment_term"
              placeholder="Payment term"
            >
              <el-option
                :label="data.dsid.paymentTerm"
                :value="data.dsid.idPaymentTerm"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Unit code" prop="unit_code">
            <el-select v-model="form.add.unit_code" placeholder="Unit code">
              <el-option
                :label="data.dsid.unit"
                :value="data.dsid.idUnit"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="DS Amount">
            <el-input :value="data.dsid.amount" readonly class="set-width"></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="Decription" prop="decription">
            <el-input
              v-model="form.add.decription"
              readonly
              class="set-width"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="Event date" required>
            <el-form-item prop="event_dateevent_date">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="form.add.event_date"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Agency" prop="agency">
            <el-select v-model="form.add.agency" placeholder="Agency">
              <el-option
                v-for="item in data.agencys"
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
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="DA Amount" prop="da_amount">
            <el-input
              v-model="form.add.da_amount"
              :value="data.dsid.ddAAmount"
              readonly
              class="set-width"
            ></el-input> </el-form-item
        ></el-col>
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
        add: {
          DS: null, //cmb chọn trc
          purchaser: null, //cmb theo ds
          payment_term: null, // theo theo ds
          decription: "Desposit Agreement for", //cớ địnhtheo ds
          unit_code: "", //cmbtheo ds
          contract_amount: null, //set cứng, k lưu theo theo ds
          event_date: "",
          agency: "", // cmb độc lập
          da_amount: null, //txt theo ds
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
        agencys: [],
      },
      rules: {
        DS: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        agency: [
          {
            required: true,
            message: "Please select Activity zone",
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post(`list-for-da`, this.form.add)
            .then((result) => {
              console.log(result);
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
        .get("list-for-da")
        .then((result) => {
          this.data.list_DS = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleChangeDS() {
      axios
        .get(`/info-for-da/${this.form.add.DS}`)
        .then((result) => {
          this.data.dsid = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllEmployees() {
      axios
        .get("employee")
        .then((result) => {
          this.data.agencys = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getAllEmployees();
    this.getAllDS();
  },
};
</script>

<style>

.set-width input{
    width: 552px !important;
}

</style>
