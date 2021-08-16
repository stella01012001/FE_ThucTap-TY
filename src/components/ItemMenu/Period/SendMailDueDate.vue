<template>
  <div></div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {},
      data: {
        infoMail: [],
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
  }
};
</script>

<style>
</style>