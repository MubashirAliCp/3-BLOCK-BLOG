import React from 'react'
import { useSelector } from 'react-redux'
import {Route, useNavigate} from "react-router-dom"



const PrivateProtectRoute = ({component: Component, ...rest}) => {
    const Navigate = useNavigate()
    //chech if user is loggin
const user = useSelector(state=> state.users);
const {userAuth} = user;
console.log("userA",userAuth);
  return (
  <Route 
  {...rest} 
  render={()=> userAuth? <Component{...rest} /> : Navigate('/login')} 
   />
  )
}

 
export default PrivateProtectRoute
