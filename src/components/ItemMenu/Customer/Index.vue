<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">Thêm</el-button>

    <!-- Sửa -->
    <el-dialog title="Chỉnh sửa trạng thái" :visible.sync="dialogFormEdit">
      <el-form :model="editform">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input
            :value="editform.name"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="Tax Code" :label-width="formLabelWidth">
          <el-input v-model="editform.taxCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Birth" :label-width="formLabelWidth">
          <el-input v-model="editform.birth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone" :label-width="formLabelWidth">
          <el-input v-model="editform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Address" :label-width="formLabelWidth">
          <el-input v-model="editform.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="editform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Gender" :label-width="formLabelWidth">
          <el-input v-model="editform.gender" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false">Hủy Bỏ</el-button>
        <el-button type="primary" @click="editEmployee">Ghi</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Tax Code" :label-width="formLabelWidth">
          <el-input v-model="form.taxCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Birth" :label-width="formLabelWidth">
          <el-input v-model="form.birth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Address" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Gender" :label-width="formLabelWidth">
          <el-input v-model="form.gender" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handSubmit">Confirm</el-button>
      </span>
    </el-dialog>

    <el-table :data="customers">
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="gender" label="Gender"> </el-table-column>
      <el-table-column prop="taxCode" label="Tax Code"> </el-table-column>
      <el-table-column prop="birth" label="Birth"> </el-table-column>
      <el-table-column prop="phone" label="Phone"> </el-table-column>
      <el-table-column prop="address" label="Address"> </el-table-column>
      <el-table-column prop="email" label="Email"> </el-table-column>
      <el-table-column prop="aciton" label="Action">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >Sửa</el-button
          >
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Xóa</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      customers: [],
      dialogFormVisible: false,
      form: {
        name: "",
        taxCode: "",
        birth: "",
        phone: "",
        address: "",
        email: "",
        gender: "",
      },
      dialogFormEdit: false,
      editform: {
        id: null,
        name: "",
        taxCode: "",
        birth: "",
        phone: "",
        address: "",
        email: "",
        gender: "",
      },
    };
  },
  created() {
    this.getAllCus();
  },
  methods: {
    getEvent_type(id) {
      console.log(id);
    },
    handSubmit() {
      this.dialogFormVisible = false;
      axios
        .post("customer", this.form)
        .then((result) => {
          console.log(result);
          this.$swal({
            icon: "success",
            title: "Thêm Hãng thành công",
            showConfirmButton: false,
          });
          this.getAllCus();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllCus() {
      axios
        .get("customer")
        .then((result) => {
          this.customers = result.data.data;
          console.log(this.customers);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      this.dialogFormEdit = true;
      this.editform = row;
      console.log(index, row);
    },
    editEmployee() {
      axios
        .post("customer", this.editform)
        .then((result) => {
          console.log(result);
          this.dialogFormEdit = false;
          this.getAllCus();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDelete(index, row) {
      console.log(index, row);
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-success btn-margin",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Bạn có chắc chứ?",
          text: "Bạn sẽ không phục hồi được sau khi xóa!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Vâng, xóa nó!",
          cancelButtonText: "Không!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`customer/${row.id}`)
              .then(() => {
                swalWithBootstrapButtons.fire("Đã Xóa!", "", "success");
                this.getAllCus();
              })
              .catch((err) => {
                swalWithBootstrapButtons.fire("Lỗi~~~", `${err}`, "error");
                console.log(err);
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Đã hủy", "", "error");
          }
        });
    },
  },
};
</script>

<style></style>
