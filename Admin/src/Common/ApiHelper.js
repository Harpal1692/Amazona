import axios from "axios";

class ApiHelper{

    constructor(){
        this.baseURL = "http://localhost:6001"
    }

    async GetUser(){
        return axios.get(`${this.baseURL}/admin/getuser`)
    }

    async UserLogin(data){
        return axios.post(`${this.baseURL}/admin/login`, data)
    }

    async InsertUser(userDetails){
        return axios.post(`${this.baseURL}/admin/adduser`, userDetails )        
    }

    async DeleteUser(id){
        return axios.delete(`${this.baseURL}/admin/deluser/${id}` )        
    }

    async UpdateUser(id, data){
        return axios.put(`${this.baseURL}/admin/update/${id}`, data )        
    }

    async fetchMedia(){
        return axios.get(`${this.baseURL}/admin/showmedia`)
    }

    async UploadMedia(data){
        return axios.post(`${this.baseURL}/admin/upload`, data)
    }

    async AddProduct(data){
        return axios.post(`${this.baseURL}/admin/insertproduct`, data)
    }

}

const apihelper = new ApiHelper()
export default apihelper