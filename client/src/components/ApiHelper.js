import axios from "axios";

let token = localStorage.getItem("token")

class ApiHelper {
  constructor() {
    // this.baseurl = "http://192.168.1.83:6001";
    this.baseurl = "http://localhost:6001"
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      if (!token) {
        token = localStorage.getItem("token")
      }
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
  }

  fetProducts() {
    return axios.get(`${this.baseurl}/api/product`);
  }

  Getproducts(id) {
    return axios.get(`${this.baseurl}/api/product/` + id);
  }
  
  userlogin (logindetail){
    return axios.post(`${this.baseurl}/login`,logindetail)
  }
  
  userRegister (registerdetail){
    return axios.post(`${this.baseurl}/register`,registerdetail)
  }
  fetchCart (products){
    return axios.post(`${this.baseurl}/cart`,{products:products})
  }
  placeorder(orderdetail){
    console.log(token);
    return axios.post(`${this.baseurl}/create/order`,orderdetail,{headers:{token:token}})
  }
  verifypayment(payment){
    return axios.post(`${this.baseurl}/payment/verify`,payment)
  }
  

}

const apihelper = new ApiHelper();

export default apihelper;
