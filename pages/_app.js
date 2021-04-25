import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NaviBar from '../components/NaviBar';
import { UserProvider } from '../UserContext';
import { CategoryProvider } from '../CategoryContext';
import AppHelper from '../app-helper';
import Router from 'next/router';


function MyApp({ Component, pageProps }) {

  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  

  const unsetUser = () => {
    localStorage.removeItem('token');

    setUser(null);
    setAccessToken(null);
  }

  //get token from local storage; if none, go to log in
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      // set access token to state if found from localstorage
      setAccessToken(savedToken);
    } else {
      
      Router.push("/login");
    }
  }, []);

  //save token to local storage
  useEffect(() => {
    if (accessToken !== null) {
      localStorage.setItem("token", accessToken);
    }
  }, [accessToken]);


  // set user when access token changes
  useEffect(() => {
    if(accessToken !== null) {
      fetch(`${AppHelper.API_URL}/users/details`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(res => res.json())
      .then((data) => {
        setUser({id: data._id, firstName: data.firstName})
      })
    }
  }, [accessToken]);


  // set categories when access token changes
  useEffect(() => {
    if(accessToken !== null) {
      fetch(`${AppHelper.API_URL}/categories`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(res => res.json())
      .then((data) => {
          setCategories(data)
      })
    }
    
  }, [accessToken]);



  return (
    <React.Fragment>
      <UserProvider value={{user, setUser, unsetUser, accessToken, setAccessToken}}>
        <CategoryProvider value={{categories, setCategories}}>
          <NaviBar />
            <Container>
              <Component {...pageProps} />
            </Container>
        </CategoryProvider>
      </UserProvider>
    </React.Fragment>
  )
}

export default MyApp
