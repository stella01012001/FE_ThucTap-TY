<template>
  <div class="container-mail" v-loading="loading">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Customer name">
        <el-input :value="data.infoMail.customer" readonly></el-input>
      </el-form-item>
      <el-form-item label="Unit">
        <el-input :value="data.infoMail.unit" readonly></el-input>
      </el-form-item>
      <el-form-item label="idContract">
        <el-input :value="data.infoMail.idContract" readonly></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="Amount">
            <el-input :value="data.infoMail.amount" readonly>
              <template slot-scope="scope">
                <p>
                  {{ formatPrice(scope.row.amount) }}
                </p>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Principal">
            <el-input :value="data.infoMail.principal" readonly>
              <template slot-scope="scope">
                <p>
                  {{ formatPrice(scope.row.principal) }}
                </p>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="Amount_vat">
            <el-input :value="data.infoMail.amount_vat" readonly>
              <template slot-scope="scope">
                <p>
                  {{ formatPrice(scope.row.amount_vat) }}
                </p>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Land Fee">
            <el-input :value="data.infoMail.land_use_fee" readonly>
              <template slot-scope="scope">
                <p>
                  {{ formatPrice(scope.row.land_use_fee) }}
                </p>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Note">
        <el-input type="textarea" v-model="form.showNote"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Send Mail</el-button>
        <el-button>Cancel</el-button>
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
        days: "",
        showNote: "",
        note: "",
        id: this.$route.params.id,
        idContract: "",
        dueDate: "",
        amount: "",
        principal: "",
        amount_vat: "",
        land_use_fee: "",
        customer: "",
      },
      data: {
        infoMail: {},
      },
      loading: false,
    };
  },
  async mounted() {
    this.getMail();
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    },
    getMail() {
      axios
        .get(`mail-due-date/${this.$route.params.id}`)
        .then((result) => {
          this.data.infoMail = result.data.data;
          this.form.idContract = result.data.data.idContract;
          this.form.dueDate = result.data.data.dueDate;
          this.form.amount = result.data.data.amount;
          this.form.principal = result.data.data.principal;
          this.form.amount_vat = result.data.data.amount_vat;
          this.form.land_use_fee = result.data.data.land_use_fee;
          this.form.customer = result.data.data.customer;
          this.form.note = result.data.data.note;
          this.form.days = result.data.data.days;
          this.form.showNote = "Late payment penalty interest " + this.form.days + " day: " + this.form.note;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit() {
      this.loading = true;
      axios
        .post(`send-mail-due`, this.form)
        .then((result) => {
          this.$swal({
            icon: "success",
            title: "Successful!",
            showConfirmButton: false,
          });
          this.loading = false;
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.container-mail {
  width: 500px;
  background: #c5bebe;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 12px;
}
</style>
