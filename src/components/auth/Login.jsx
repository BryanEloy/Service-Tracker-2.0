import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AlertContext from "../../context/alerts/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Login = () => {

    //Extraer la informacion del context de alerta
    const alertContext= useContext(AlertContext);
    const {alert, showAlert}= alertContext; 

    //Extraer la informacion del context de auth
    const authContext= useContext(AuthContext);
    const {mesage, autentication, logIn, userInformation}= authContext; 
    
    //Usamos el useNavigate dentro de iuna constante para poder usarlo dentro del useEfect
    const history= useNavigate();
    //EN caso de que el mensage de auth cambie mostramos una alerta 
    useEffect(()=>{
        userInformation();
        if(autentication)
            history('/search');             
        
        if(mesage)
            showAlert(mesage.msg, mesage.category);

    },[mesage, autentication])

    const [user, setUser]= useState({
        email:'',
        password:''
    })
    //Set the Login information about the user
    const handleChange= (e)=>{
        setUser( {...user, [e.target.name]: e.target.value } )
    }

    const handleSubmit= (e)=>{
        e.preventDefault();

        //Validar que no haya campos vacios
        if(user.email.trim()===''||  user.password===''){
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        logIn(user);
    }

    return ( 
        <div className="form-usuario">

            {alert 
                ?(<div className={ `alerta ${alert.category}` }> {alert.msg} </div>) 
                :null}

            <div className="contenedor-form sombra-dark">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="@yourmail" value={user.email}
                                onChange={handleChange}/>

                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={user.password}
                                onChange={handleChange}/>

                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Login" />
                    </div>

                    <Link to={'/newAcount'} className="enlace-cuenta">Get an account</Link>
                </form>
            </div>
        </div>
     );
}
 
export default Login;