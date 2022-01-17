import { 
    REGISTRATION_ERROR, 
    REGISTRATION_SUCCESSFUL, 
    LOGIN_ERROR, 
    GET_USER, 
    LOGIN_SUCCESSFUL, 
    LOGOUT 
    } from'../../types';

export default(state, action)=>{
   switch (action.type) {

        //Si el registro del usuario es exitoso la autenticasion se vuelve true
        case REGISTRATION_SUCCESSFUL:
        //Cyando el user se logie de forma exitosa seteamos el token en el localstorage
        case LOGIN_SUCCESSFUL:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                autentication: true,
                mesage: null,
                chargin: false
            }

        //EN CASO DE HABER ALGUN ERROR DE REGISTRO EL TOKEN SE VUELVE NULL Y SE MANDA UN MENSAJE D ERROR
        case REGISTRATION_ERROR:
        //En caso de haber un problema de logeo 
        case LOGIN_ERROR:
        //Cerrar la sesion volviendo las valores a null y removiedno el token
        case LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                autentication: null,
                user: null,
                mesage: action.payload,
                chargin: true
            }

        //Obtener la informacion del usuario 
        case GET_USER:
            return{
                ...state,
                user: action.payload,
                autentication: true,
                chargin: false
            }       
   
       default:
           return state;
   }
}