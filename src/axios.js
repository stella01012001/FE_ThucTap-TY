import axios from "axios";

axios.defaults.baseURL = 'localhost/api/';
axios.defaults.headers.common['Authorrization'] = 'Bearer' + localStorage.getItem('token');