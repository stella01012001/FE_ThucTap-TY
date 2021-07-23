import axios from "axios";

axios.defaults.baseURL = 'http://localhost/api/';
axios.defaults.headers.common['Authorrization'] = 'Bearer' + localStorage.getItem('token');