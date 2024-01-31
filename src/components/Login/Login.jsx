import React, { useState,useEffect,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
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
const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, initialState)
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, initialState)
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
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
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:"USER_INPUT",val:event.target.value})
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:"PASS_INPUT",val:event.target.value})
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:"INPUT_BLUR"})
    // setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:"PASS_BLUR"})
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
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
