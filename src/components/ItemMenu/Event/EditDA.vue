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
          <el-form-item label="DA" prop="DA">
              <el-input v-model="form.add.id" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"
          ><el-form-item label="Purchaser" prop="purchaser">
              <el-input v-model="form.add.customer" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="Payment term" prop="payment_term">
              <el-input v-model="form.add.paymentTerm" readonly></el-input>

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Unit code" prop="unit_code">
              <el-input v-model="form.add.unit" readonly></el-input>

          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-row>
        <el-col :span="16">
          <el-form-item label="DS Amount">
            <el-input
              :value="data.dsid.amount"
              readonly
              class="set-width"
            ></el-input> </el-form-item
        ></el-col>
      </el-row> -->

      <el-row>
        <el-col :span="16">
          <el-form-item label="Description" prop="description">
            <el-input
              v-model="form.add.description"
              class="set-width"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="Event date" required>
            <el-form-item prop="event_dateevent_date">
                <el-input v-model="form.add.event_date" readonly></el-input>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Agency" prop="employee">
              <el-input v-model="form.add.name" readonly></el-input>

          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="DA Amount" prop="da_amount">
            <el-input
              v-model="form.add.amount"
              readonly
              class="set-width"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="Note" prop="note">
            <el-input v-model="form.add.note" class="set-width"> </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form.add')"
          >Update</el-button
        >
        <el-button @click="resetForm('form.add')">Reset</el-button>
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
          idDS: null, //cmb chọn trc
          purchaser: null, //cmb theo ds
          payment_term: null, // theo theo ds
          description: "Desposit Agreement for DS ", //cớ địnhtheo ds
          unit_code: "", //cmbtheo ds
          contract_amount: null, //set cứng, k lưu theo theo ds
          event_date: "",
          employee: "", // cmb độc lập
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
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .patch(`da/${this.$route.params.id}`, this.form.add)
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
    getDAById() {
      axios
        .get(`da/${this.$route.params.id}`)
        .then((result) => {
          this.form.add = result.data.data[0];
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
        .get("employee")
        .then((result) => {
          this.data.employees = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async mounted() {
    this.getDAById();
  },
};
</script>

<style>
.set-width input {
  width: 552px !important;
}
</style>
