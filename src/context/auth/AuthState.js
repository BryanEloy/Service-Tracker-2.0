import React, {useReducer} from 'react';

import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import clienteAxios from '../../config/axios';
import authToken from '../../config/token';

import { 
    REGISTRATION_ERROR, 
    REGISTRATION_SUCCESSFUL, 
    LOGIN_ERROR, 
    GET_USER, 
    LOGIN_SUCCESSFUL, 
    LOGOUT 
    } from'../../types';

const AuthState= props=>{

    const initialState={
        token: localStorage.getItem('token'),
        autentication: null,
        user: null,
        mesage: null,
        chargin: true
    };

    //Dispatch para ejcutar las acciones 
    const [state, dispatch]= useReducer(AuthReducer, initialState);

    //Funcion para crear un nuevo usuario
    const registerNewUser= async (data)=>{

        try {
            const res= await clienteAxios.post('/api/users', data);
            dispatch({
                type: REGISTRATION_SUCCESSFUL,
                payload: res.data
            });
            //Obtener indformacion del usuario
            userInformation();
        } catch (error) {
            const msg= error.response.data.errors[0].msg;
            const alert={
                msg,
                category: 'alerta-error'
            }
            dispatch({
                type: REGISTRATION_ERROR,
                payload: alert
            });
        }
    }

    //Retorna la informaacion del usuario una vez que este fue autenticado o registrado
    const userInformation= async()=>{
        const token= localStorage.getItem('token');

        if(token){
            //Funcion para enviar el token por header
            authToken(token);
            try {
                const res= await clienteAxios.get('/api/auth') ;
                dispatch({
                    type: GET_USER,
                    payload: res.data.user
                });
            } catch (error) {
                console.log(error);
                dispatch({
                    type: LOGIN_ERROR
                });
            }
        }
        
    }

    //Cuando el usuuario inicia sesion
    const logIn= async(data)=>{

        try {
            const res= await clienteAxios.post('/api/auth', data);
            dispatch({
                type:  LOGIN_SUCCESSFUL,
                payload: res.data
            });
            //Obtener indformacion del usuario
            userInformation();

        } catch (error) {
            const msg= error.response.data.msg;
            console.log(msg)
            const alert={
                msg,
                category: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            });
        }
    }

    const logOut= ()=>{
        dispatch({
            type: LOGOUT
        });
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autentication: state.autentication,
                user: state.user,
                mesage: state.mesage,
                chargin: state.chargin,
                registerNewUser,
                logIn,
                userInformation,
                logOut
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;