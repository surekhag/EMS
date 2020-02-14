import React from 'react'
import { Redirect } from 'react-router-dom'

const AuthenticationHOC = Comp => {
        const AuthHOC=()=>{
        const token = localStorage.getItem('token')
               return <div>{token ? <Comp /> : <Redirect to="/login"></Redirect>}</div>
       }
        return AuthHOC;
}
export default AuthenticationHOC
