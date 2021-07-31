<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">Thêm</el-button>

    <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Description" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handSubmit">Confirm</el-button>
      </span>
    </el-dialog>

    <el-table :data="blocks">
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="description" label="Description">
      </el-table-column>
      <el-table-column prop="aciton" label="Action">
        <template slot-scope="scope">
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
      blocks: [],
      dialogFormVisible: false,
      form: {
        description: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getAllBlock();
  },
  methods: {
    handSubmit() {
      this.dialogFormVisible = false;
      this.$swal
        .fire({
          title: "Bạn muốn sửa?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Vâng tôi đồng ý",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .post("block", this.form)
              .then((result) => {
                console.log(result);
                this.$swal({
                  icon: "success",
                  title: "Sửa Loại Sản Phẩm Thành Công",
                  showConfirmButton: false,
                });
                this.getAllBlock();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    },
    getAllBlock() {
      axios
        .get("block")
        .then((result) => {
          this.blocks = result.data.data;
          console.log(this.blocks);
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
              .delete(`block/${row.id}`)
              .then(() => {
                this.getAllBlock();
                swalWithBootstrapButtons.fire("Đã Xóa!", "", "success");
              })
              .catch((err) => {
                swalWithBootstrapButtons.fire("Lỗi~~~", `${err}`, "error");
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
