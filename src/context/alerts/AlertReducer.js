import {SHOW_ALERT, HIDE_ALERT} from'../../types';

export default(state, action)=>{
   switch (action.type) {
       //Mostrar una laerta al user
       case SHOW_ALERT :
           return{
               alert: action.payload
           }

       //oCULTAR ALERTA
       case HIDE_ALERT :
           return{
               alert: null
           }
   
       default:
           return state;
   }
}