import React, {Component, useEffect, useState} from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery'
import cookie from 'react-cookies';


const Header = (props) => {

    const [ dropDownOpen, setDropDownOpen ] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        console.log("header: ", props);
      const useid = props.empname.sub;
      if (useid !== undefined) {
        $('.menulist').show();
        $('.hd_top').show();
      } else {
        $('.menulist').hide();
        $('.hd_top').hide();
      }
    }, [props.empname.sub]);
  
    function myInfoHover() {
      $('.hd_left > li > .box1').stop().fadeIn(400);
    }
  
    function myInfoLeave() {
      $('.hd_left > li > .box1').stop().fadeOut(400);
    }
  
    function logout(e) {
      //e.preventDefault();
      cookie.remove('empnumber', { path: '/' });
      cookie.remove('empname', { path: '/' });
      cookie.remove('empdeptname', { path: '/' });    
      window.location.replace("/")
    }
    const toggle = () => {
        setDropDownOpen(!dropDownOpen);
    }
  
    return (
        <React.Fragment>
        <header className="gnb_box">
            <div className="hd_top">
                <div className="top_wrap ct1 af">
                    <ul className="hd_left af">
                        <li className='my1'>
                            <ButtonDropdown isOpen={dropDownOpen} toggle={toggle}>
                                <DropdownToggle color="light" caret><b>내정보</b></DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <ListGroup>
                                            <ListGroupItem tag="button" onClick={e =>{
                                                history('/myinfo');
                                            }}>내 정보 수정</ListGroupItem>
                                            <ListGroupItem tag="button" onClick={logout}>로그아웃</ListGroupItem>
                                        </ListGroup>                                        
                                    </DropdownItem>                                    
                                </DropdownMenu>
                            </ButtonDropdown>
                        </li>
                        
                                         
                        
                        <li className="my2"><b><span>1</span>알림</b>
                        </li>
                        <li className="my1">                            
                            <b><span>{props.empname.sub}</span>님 반갑습니다.</b>                                                    
                        </li>                                                                                                                  
                    </ul>                                                
                </div>                
            </div>
            <div className="h_nav ct1 af">
                <div className="logo">
                    <Link to={'/'}><img src={require("../../img/logo/logo01.png")} height="65px" width="200px" alt=""/></Link>
                </div>
                <nav className="gnb gnb_admin">
                <ul className="af">
                    <li className="menulist">
                        <Link to={'/all_and_departemt'}>전사원&부서보기</Link>
                    </li>
                    <li className="menulist">
                        <Link to={'/erp'}>인사&급여</Link>
                    </li>
                                  
                    <li className="menulist">
                        <Link to={'/product'}>상품 관리</Link>
                    </li>
                    <li className="menulist">
                        <Link to={'/members'}>회원 관리</Link>
                    </li>     
                    <li className="menulist">
                        <Link to={'/board'}>게시판&고객문의</Link>
                    </li>                                                   
                    <li  className="menulist">
                        <Link to={'/sales'}>매출&회계</Link>
                    </li>
                </ul>
                </nav>
            </div>
        </header>
        </React.Fragment>
    );
  }
  
export default Header;
