<template>
  <div>
    <header class="container-header">
      <div class="back-menu" @click="back_menu">
        <i class="el-icon-back"></i> Back
      </div>
      <div class="title-header">Detail Unit</div>
    </header>
    <div class="container-form">
      <div class="wrapp-form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Unit Type" prop="idUnitType">
                <el-select
                  v-model="ruleForm.idUnitType"
                  placeholder="Activity zone"
                >
                  <el-option
                    v-for="item in data.units_type"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Unit Code" prop="unit_code">
                <el-input
                  v-model="ruleForm.unit_code"
                  class="format-money"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Block" prop="idBlock">
                <el-select
                  v-model="ruleForm.idBlock"
                  placeholder="Activity zone"
                >
                  <el-option
                    v-for="item in data.blocks"
                    :key="item.id"
                    :label="item.description"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Floor" prop="idFloor">
                <el-select v-model="ruleForm.floor" placeholder="Activity zone">
                  <el-option
                    v-for="item in data.blocks"
                    :key="item.id"
                    :label="item.numFloor"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="Amount" prop="amount">
            <el-input v-model="ruleForm.amount" class="format-money"></el-input>
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="NFA" prop="NFA">
                <el-input v-model="ruleForm.NFA"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Price NFA" prop="price_NFA">
                <el-input
                  v-model="ruleForm.price_NFA"
                  class="format-money"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="GFA" prop="GFA">
            <el-input v-model="ruleForm.GFA"></el-input>
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12"
              ><el-form-item label="NOB" prop="no_of_br">
                <el-input v-model="ruleForm.no_of_br"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label="Land Use Fee" prop="land_use_fee">
                <el-input
                  v-model="ruleForm.land_use_fee"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>

          <el-form-item label="Land Area" prop="land_area">
            <el-input type="textarea" v-model="ruleForm.land_area"></el-input>
          </el-form-item>
          <el-form-item label="Direction" prop="direction">
            <el-radio-group v-model="ruleForm.direction">
              <el-radio label="East"></el-radio>
              <el-radio label="West"></el-radio>
              <el-radio label="South"></el-radio>
              <el-radio label="North"></el-radio>
              <br />
              <el-radio label="North-East"></el-radio>
              <el-radio label="North-West"></el-radio>
              <el-radio label="South-West"></el-radio>
              <el-radio label="South-East"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >Create</el-button
            >
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Index",
  data() {
    return {
      data: {
        index: [],
        units_type: [],
        blocks: [],
        floor: [],
      },
      ruleForm: {
        idUnitType: null,
        unit_code: null,
        idBlock: null,
        idFloor: null,
        amount: null,
        NFA: "",
        GFA: "",
        price_NFA: null,
        land_area: "",
        no_of_br: null,
        land_use_fee: null,
        direction: "",
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
  mounted() {
    this.getAllUnitType();
    this.getAllBlock();
    this.getAllFloor();
  },
  methods: {
    getAllUnitType() {
      axios
        .get(`unitType`)
        .then((result) => {
          this.data.units_type = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllBlock() {
      axios
        .get("block")
        .then((result) => {
          this.data.blocks = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllFloor() {
      axios
        .get("floor")
        .then((result) => {
          this.data.floor = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUnitByID() {
      axios
        .get(`unit/${this.$store.getters.idUnit}`)
        .then((result) => {
          this.data.index = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    back_menu() {
      this.$router.push("/menu");
    },
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
  },
};
</script>

<style>
.container-header {
  display: flex;
  align-items: center;
  height: 85px;
  font-size: 18px;
  padding: 20px;
  font-weight: 600;
  box-shadow: 0 2px 2px 0 rgba(60, 75, 100, 0.14),
    0 3px 1px -2px rgba(60, 75, 100, 0.12), 0 1px 5px 0 rgba(60, 75, 100, 0.2);
}

.back-menu {
  padding-right: 15px;
  cursor: pointer;
}

.title-header {
  border-left: 2px solid #000;
  padding-left: 15px;
}

.container-form {
  background-color: #ebedef;
  padding: 35px;
}

.wrapp-form {
  width: 980px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
}

.format-money {
  position: relative;
}

.format-money input {
  padding-left: 35px;
}

.format-money::before {
  content: "đ";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 25px 15px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
}
</style>
