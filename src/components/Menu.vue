<template>
    <div>
        <h2>Menu</h2>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {

        }
    },
    // mounted() {
    //     this.checkLoggedIn();
    // },
    created() {
        this.checkLoggedIn();
    },
    methods: {
        checkLoggedIn: function() {
            let token = window.localStorage.getItem('token');
            if (token == null) {
                this.$router.push('/login');
            }
            axios.get('user')
            .then(function(response) {
                console.log(response);
            })
            .catch(() => {
                this.$router.push('/login');
            })
        }
    }
}
</script>

<style>

</style>