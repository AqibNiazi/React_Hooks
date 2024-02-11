import React, { useState,useEffect,useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/input';
import { AuthContext } from '../../store/AuthContext';
const initialState={
  value:"",
  isValid:null
}
const emailReducer=(state,action)=>{
  if(action.type==="USER_INPUT"){

    return {value:action.val,isValid:action.val.includes("@")}
  }
  if(action.type==="INPUT_BLUR"){

    return {value:state.value,isValid:state.value.includes("@")}
  }
  return {value:"",isValid:false}
}
const passwordReducer = (state,action) => { 
  if(action.type==="PASS_INPUT"){

    return {value:action.val,isValid:action.val.trim().length > 6}
  }
  if(action.type==="PASS_BLUR"){

    return {value:state.value,isValid:state.value.trim().length > 6}
  }
  return {value:"",isValid:false}
 }
const Login = () => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, initialState)
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, initialState)
  const [formIsValid, setFormIsValid] = useState(false);
  const authCtx=useContext(AuthContext)
  useEffect(() => {
    const Identifier= setTimeout(() => {
      console.log("Checking Form Validty");
    
   setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  }, 500);
  return ()=>{
    console.log("Cleanup");
    clearTimeout(Identifier)
  }
}, [emailState.isValid,passwordState.isValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type:"USER_INPUT",val:event.target.value})
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:"PASS_INPUT",val:event.target.value})
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:"PASS_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        label="E-Mail"
        isValid={emailState.isValid}
        id="email"
        type="email"
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        />
         <Input
        label="Password"
        isValid={passwordState.isValid}
        id="password"
        type="password"
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
