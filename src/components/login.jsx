import axios from 'axios';
import React, { useState } from 'react';
import config from '../config.json'
import styles from './login.module.css'
import { useSnackbar } from "notistack";
const Login = ({ setUserToken,setNewToHere }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const res = await axios.post(`${config.API_URL}/users/login`,
        {
            email:email,
            password:password
        })
        if (res.status === 200){
            enqueueSnackbar("Logged in successfully",{variant:"success"});
            
            setUserToken(res.data.token)
            localStorage.setItem('token',res.data.token)
        }else{
            enqueueSnackbar("Error in logging in, please try later", { variant: "error" })
        }

    }catch(e){
        enqueueSnackbar("Error in logging in, please try later", { variant: "error" })
    }
}

    const handleClick =()=>{
        setNewToHere(true)
    }
  return (
    <div>
      <form className={styles.inputParent} onSubmit={handleSubmit}>
      <h2>Login</h2>
        <input
          type="text"
          placeholder="email"
          className={styles.inputBar}
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          className={styles.inputBar}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Don't have an account? <span onClick={handleClick} style={{cursor:"pointer"}}>Register now</span></p>
        <button className={styles.sbbtn} type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
