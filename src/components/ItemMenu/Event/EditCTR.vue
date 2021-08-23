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
          <el-form-item label="Contract" prop="Contract">
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

      <el-row>
        <el-col :span="16">
          <el-form-item label="Amount">
            <el-input
              v-model="form.add.amount"
              readonly
              class="set-width"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>

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
          <el-form-item label="Event date">
            <el-form-item prop="event_date">
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
          idDA: null, //cmb chọn trc by id`
          purchaser: null, //cmb theo da
          payment_term: null, // theo theo da
          description: "Contract for DA ", //cớ định theo da  `
          unit_code: "", //cmb theo da
          amount: null, //set cứng, lưu`
          event_date: "", //tạo mới `
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
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .patch(`contract/${this.$route.params.id}`, this.form.add)
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
    getCTRById() {
      axios
        .get(`contract/${this.$route.params.id}`)
        .then((result) => {
          this.form.add = result.data.data[0];
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
          this.data.daid = result.data.data;
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
    this.getAllEmployees();
    this.getCTRById();
  },
};
</script>

<style>
.set-width input {
  width: 552px !important;
}
</style>
