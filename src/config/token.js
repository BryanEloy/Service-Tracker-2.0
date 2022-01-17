import clienteAxios from "./axios";

const authToken= token=>{
    if(token){
        clienteAxios.defaults.headers.common['auth-token']= token;
    }else{
        delete clienteAxios.defaults.headers.common['auth-token'];
    }

}

export default authToken;