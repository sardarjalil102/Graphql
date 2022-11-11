import './App.css';
import React,{useEffect} from 'react'
import SignUp from './Pages/Login/Login'
import {client} from './Common/config'
import { ApolloClient, InMemoryCache, ApolloProvider, gql,useQuery } from '@apollo/client';
import AuthApp from './component/Navigation/AuthApp'
import _App from './component/Navigation/App'
import { AuthProvider ,useAuthState} from "./Context";
const App = () => {
  //  const token = localStorage.getItem('token')
   const AppContainer=()=>{
    const {token}=useAuthState()
    console.log('freshToken',token)

     useEffect(()=>{
      // if(token){
      //   return <_App />
      // }
      // else {
      //  return <AuthApp />
      // }
     },[])
      if(token){
        return <_App />
      }
      else {
       return <AuthApp />
      }
    
   }

  return (
    <AuthProvider>
    <ApolloProvider client={client}>  
      <AppContainer />
    </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
