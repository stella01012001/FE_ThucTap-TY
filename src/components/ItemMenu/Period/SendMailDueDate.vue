<template>
  <div class="container-mail">
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
            <el-input :value="data.infoMail.amount" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Principal">
            <el-input :value="data.infoMail.principal" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="Amount_vat">
            <el-input :value="data.infoMail.amount_vat" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Land Fee">
            <el-input :value="data.infoMail.land_use_fee" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Note">
        <el-input type="textarea" v-model="form.note"></el-input>
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
        note: "",
        id: this.$route.params.id,
      },
      data: {
        infoMail: {},
      },
    };
  },
  methods: {
    getMail() {
      axios
        .get(`mail-due-date/${this.$route.params.id}`)
        .then((result) => {
          this.data.infoMail = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit() {
      axios
        .post(`send-mail-due`, this.form)
        .then((result) => {
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
