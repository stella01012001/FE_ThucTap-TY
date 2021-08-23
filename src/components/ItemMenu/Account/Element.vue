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
          <el-form-item label="Employee" prop="Employee">
            <el-select
              v-model="form.add.idEmployee"
              placeholder="Employee"
              @change="handleChangeDS"
            >
              <el-option
                v-for="item in data.listEmp"
                :key="item.id"
                :label="item.id"
                :value="item.id"
              >
                <span style="float: left">{{ item.id }}</span>
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
          <el-form-item label="User name" prop="username">
            <el-input
              v-model="form.add.username"
              class="set-width"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="Password" prop="password">
            <el-input
              type="password"
              v-model="form.add.password"
              class="set-width"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="16">
          <el-form-item label="Confirm" prop="confirm_password">
            <el-input
              type="password"
              v-model="form.add.confirm_password"
              class="set-width"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="Role" prop="role">
            <el-select v-model="form.add.idRole" placeholder="Role">
              <el-option
                v-for="item in data.listRole"
                :key="item.id"
                :label="item.description"
                :value="item.id"
              >
                <span style="float: left">{{ item.description }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.description
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="Active" prop="status">
            <el-switch v-model="form.add.status"></el-switch>
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
export default {
  data() {
    return {
      form: {
        add: {
          idEmployee: null, //cmb chọn trc
          username: "", //cớ địnhtheo ds
          password: "", //cmbtheo ds
          confirm_password: "", //cmbtheo ds
          idRole: "",
          status: null,
        },
      },
      data: {
        listEmp: [],
        listRole: [],
      },
      rules: {
        idEmployee: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        username: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        confirm_password: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        idRole: [
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
            .post("/register", this.form.add)
            .then((response) => {
              console.log(response.data);
              this.$swal({
                icon: "success",
                title: "Successful!",
                showConfirmButton: false,
              });
            })
            .catch( (error) => {
              console.log(error.response.data.errors.username[0]);
              this.$notify.error({
                title: "Error",
                message: error.response.data.errors.username[0],
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
    getAllEmps() {
      axios
        .get("/employee-create-acc")
        .then((result) => {
          this.data.listEmp = result.data.data;
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleChangeDS() {
      //   axios
      //     .get(`/info-for-da/${this.form.add.idEmployee}`)
      //     .then((result) => {
      //       this.data.dsid = result.data.data;
      //       console.log(result);
      //       this.form.add.amount = this.data.dsid.ddAAmount;
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      //   this.form.add.username =
      //     "Desposit Agreement for DS " + this.form.add.idEmployee;
    },
    getRoles() {
      axios
        .get("/role")
        .then((result) => {
          this.data.listRole = result.data.data;
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async mounted() {
    this.getRoles();
    this.getAllEmps();
  },
};
</script>

<style>
.set-width input {
  width: 552px !important;
}
</style>
