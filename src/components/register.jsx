import React, { useState } from 'react';
import axios from 'axios'
import config from '../config.json'
import styles from './login.module.css'
import { useSnackbar } from "notistack";

const Register = ({setnewToHere}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email,setEmail] = useState('')
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = ()=>{
    setnewToHere(false)
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
     
      const res = await axios.post(`${config.API_URL}/users/register`,{
        username:username,
        password:password,
        email:email
       })
       if (res.status === 201){
        enqueueSnackbar('Registered successfully',{variant:"success"})
    setnewToHere(false)
        setUsername('');
        setEmail('');
        setPassword('');
       }
       else{
        enqueueSnackbar("Failed to Register", { variant: "error" })
       }
    }catch(e){
  
      enqueueSnackbar(e.response.data.message, { variant: "error" })
      

    }

  }

  return (
    <div>
      <form className={styles.inputParent}>
      <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.inputBar}

        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputBar}

        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputBar}

        />
        
        <button type="submit" className={styles.sbbtn} onClick={handleSubmit}>Register</button>
        <p>Already have an account? <span onClick={handleClick} style={{cursor:"pointer"}}>Login here </span></p>

      </form>
    </div>
  );
};

export default Register;
