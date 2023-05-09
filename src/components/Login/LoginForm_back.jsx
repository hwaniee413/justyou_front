import React, { Component } from 'react'
import { Button, InputGroup, InputGroupText, Input, ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap'
import { Link } from 'react-router-dom'


export default class LoginForm extends Component {
  render() {
    return (
      <React.Fragment>
          <div className="log_box">
              <form action='loginOk' onSubmit={this.handleSubmit}>
              <div className="in_ty1">
                <InputGroup>
                  <InputGroupText className='bg-white'>
                    <span><img src={require("../../img/main/m_log_i3.png")} alt="" /></span>
                  </InputGroupText>
                  <Input type='text' name='email' placeholder='이메일' onChange={this.handleChange} />
                </InputGroup>
                <InputGroup>
                  <InputGroupText className='bg-white'>
                    <span className="ic_2"><img src={require("../../img/main/m_log_i2.png")} alt="" /></span>
                  </InputGroupText>
                  <Input type='password' name='password' placeholder='비밀번호' onChange={this.handleChange} />
                </InputGroup>                  
              </div>
              <div className='in_ty3 f-s-small'> 
                  <ListGroup>
                    <ListGroupItem tag="button" type="button" onClick={e => alert("FiND_ID")}>                
                          <span>아이디 찾기</span>  
                    </ListGroupItem>
                    <ListGroupItem tag="button" type="button" onClick={e => alert("PWD_RESET")}>                
                          <span>비밀번호 재설정</span>  
                    </ListGroupItem>
                  </ListGroup>
              </div>
                        
              <div className='in_ty2 flex justify-center'>
                <Button color="success" onClick={this.submitClick}>로그인</Button>
              </div>            
              </form>
          </div>
        
      </React.Fragment>
    )
  }
}
