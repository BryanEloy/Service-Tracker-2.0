import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AlertContext from "../../context/alerts/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const NewAcount = (props) => {

    //Extraer la informacion del context de alerta
    const alertContext= useContext(AlertContext);
    const {alert, showAlert}= alertContext; 

    //Extraer la informacion del context de auth
    const authContext= useContext(AuthContext);
    const {mesage, autentication, registerNewUser, userInformation}= authContext; 

    //Usamos el useNavigate dentro de iuna constante para poder usarlo dentro del useEfect
    const history= useNavigate();
    //Escuchar los cambios en el state de auth para saber si se registro el user o no
    useEffect(()=>{
        userInformation();
        if(autentication)
            history('/search');             
        
        if(mesage)
            showAlert(mesage.msg, mesage.category);

    },[mesage, autentication, props]);

    const [user, setUser]= useState({
        email:'',
        name:'',
        password:'',
        password2:''
    });

    //Set the Login information about the user
    const handleChange= (e)=>{
        setUser( {...user, [e.target.name]: e.target.value } )
    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        //Validar que no haya campos vacios
        if(user.name.trim()===''|| user.email.trim()===''|| user.password===''|| user.password2===''){
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //Validar que el password sea de minimo 6 caracteres
        if(user.password.length < 6){
            showAlert('El password debe tener minimo 6 caracteres', 'alerta-error');
            return;
        }
        //Comparar los 2 passwords
        if(user.password !== user.password2){
            showAlert('Las contraseñas no coinciden', 'alerta-error');
            return;
        }
        //Pasarlo al action para guardar la info
        registerNewUser(user);
    }

    return (  
        <div className="form-usuario">
            
            {alert 
                ?(<div className={ `alerta ${alert.category}` }> {alert.msg} </div>) 
                :null}

            <div className="contenedor-form sombra-dark">
                <h1>Get an account</h1>

                <form onSubmit={handleSubmit}>

                    <div className="campo-form">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Your nombre" value={user.name}
                                onChange={handleChange}/>
                    </div>

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
                        <label htmlFor="password2">Confirm Password</label>
                        <input type="password" id="password2" name="password2" value={user.password2}
                                onChange={handleChange}/>
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Creaate" />
                    </div>

                    <Link to={'/'} className="enlace-cuenta">Return to Login</Link>

                </form>
            </div>
        </div>
    );
}
 
export default NewAcount;