import React, { useState,useEffect } from 'react';
import Home from './components/home';
import Validate from './components/validate';
import { SnackbarProvider } from 'notistack';
import { useSnackbar } from 'notistack';
const App = () => {
  const [userToken, setUserToken] = useState(null);
  const {enqueueSnackbar} = useSnackbar()
  const handleLogout = () => {
    enqueueSnackbar("Logged Out Successfully", { variant: "warning" });
    setUserToken(null);
    localStorage.clear()
  };
  useEffect(() => {
    // Check if a user token is present in localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setUserToken(storedToken);
    }
  }, []); 
  

  return (
    <SnackbarProvider>
    <div>
      {userToken ? (
        <Home user={userToken} onLogout={handleLogout} />
      ) : (
        <>
        <Validate setUserToken={setUserToken}/>  
        </>
      )}
    </div>
    </SnackbarProvider>
  );
};

export default App;
