import React, {useState} from 'react';
import Login from './login';
import Register from './register';
import styles from './validate.module.css';
const Validate = ({ setUserToken }) => {
    const [newToHere ,setNewToHere] = useState(false)
    const validateEmail = (exm) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(exm);
    return isValid;
  };

  return (
    
    <div className={styles.main}> 
      <h1 className={styles.welcome}>Welcome to Blogging App..!!</h1> 
      <div className={styles.btnParent}>
        {!newToHere ? <Login setUserToken={setUserToken} emailvalidation={validateEmail} setNewToHere={setNewToHere}/> 
         :(<Register emailvalidation={validateEmail} setnewToHere={setNewToHere}/> )}
      </div>
    </div>
  );
};

export default Validate;
