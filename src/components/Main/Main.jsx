import React, { Component, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'

import MainLoginRegister from './MainLoginRegiser'
import MainContents from './MainContents'
const Main = (props) => {
    
    console.log("Main: ", props.isAuthenticated);
  
    return (  
      <div>
        {!props.isAuthenticated ? <MainLoginRegister /> : <MainContents />}
      </div>  
    )
  
}
export default Main;
