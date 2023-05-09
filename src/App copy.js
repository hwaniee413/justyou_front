import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
//import sass from 'sass';

import './css/new.css';
import './css/style.css';
import './css/header.css';
import './css/footer.css';
//import './css/_calender.scss'
import './css/calender.css';

import 'bootstrap/dist/css/bootstrap.css'

import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';

import Main from './components/Main/Main';

//import AdminApp from './components/AdminApp/AdminApp';
//login & Register
import LoginForm from './components/Login/LoginForm.tsx';
import Register from './components/Register/Register';

//components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import ErpMainContainer from './containers/ErpMainContainer';
import MembersMain from './components/Members/MembersMain';

import ProductsMainContainer from './containers/ProductsMainContainer';
import ProductsInsert from './components/Products/ProductsInsert.tsx';
import ProductsUpdate from './components/Products/ProductsUpdate.tsx';
import Sales from './components/Sales/Sales';

//Board - components
import Board from './components/Board/Board';
import BoardContainer from './containers/BoardContainer';
import Notice from './components/Board/Notice/Notice';
import Depositor from './components/Board/Depositor/Depositor';
import NoticeWrite from './components/Board/Notice/Write.tsx';
import NoticeArticle from './components/Board/Notice/NoticeArticle.tsx';
import NoticeUpdate from './components/Board/Notice/NoticeUpdate.tsx';

import ViewAllandDepartmentContainer from './containers/ViewAllandDepartmentContainer';
import MyInfo from './components/MyInfo/MyInfo';
import ViewAllProductsList from './components/Products/ViewAllProductsList';
import SearchProductsDetail from './components/Products/SearchProductsDetail';
import CateEventList from './components/Products/CateEventList';



const API_URL = 'http://127.0.0.1:8080';

const App = () => {

  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  const [ token1, setToken1 ] = useState('');
  const [ token2, setToken2 ] = useState('');
  const [ token3, setToken3 ] = useState('');
  const [ empnumber, setEmpNumber ] = useState('');
  const [ empname, setEmpName ] = useState('');
  const [ empdeptname, setEmpDeptname ] = useState('');
  const history = useNavigate();

  const handleLogin = () => {
    this.setState({
      isAuthenticated: true,
      token1: cookie.load("empnumber"),
      token2: cookie.load("empname"),    
      token3: cookie.load("empdeptname"),
    });
  };

  useEffect(() => {  
    const token1 = cookie.load("empnumber");
    const token2 = cookie.load("empname");  
    const token3 = cookie.load("empdeptname");
    if (token1 && token2 && token3) {
      fetch(`${API_URL}/accounts/getJwtSecretKey`, {
        method: 'GET',           
      })
      .then(res => {
        console.log("res: ",res);
        if(res.ok) {                    
            return res.json();                    
        } else {
            console.log("getJwtSecretKey-error");
        }
      })
      .then(data => {
        // 성공적인 응답을 받은 경우         
        setEmpNumber(jwt_decode(token1, data.secretKey));
        setEmpName(jwt_decode(token2, data.secretKey));
        setEmpDeptname(jwt_decode(token3, data.secretKey));        
      })
      setIsAuthenticated(true);
      setToken1(token1);
      setToken2(token2);
      setToken3(token3);
          
    } else {
      //history("/login");
    }
  }, [history]);

  
  
  return (
    <div className="App">
      {isAuthenticated && token1 && token2 && token3 && <Header empname={empname}/>}
    <Routes>
      <Route exact path='/' element={<Main isAuthenticated={isAuthenticated}/>}/>
      {!isAuthenticated && <Route exact path='/login' element={<LoginForm onLogin={handleLogin}/>}/>}
      {!isAuthenticated && <Route exact path='/register' element={<Register/>}/>}
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/' element={<Main/>}/>}
      {/* 전체&부서별 */}
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/all_and_departemt' element={<ViewAllandDepartmentContainer empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}
      {/* 사원 관리 */}
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/erp' element={<ErpMainContainer empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}
      {/* 회원 관리 */} 
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/members' element={<MembersMain empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}
      
    
      {/* 상품 관리 */}
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/product' element={<ProductsMainContainer empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/product/list' element={<ViewAllProductsList empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}      
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/product/insert' element={<ProductsInsert empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/product/update/:pid' element={<ProductsUpdate empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/product/cate_event' element={<CateEventList empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}
      {/* 게시판 관리 */}
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/board' element={<Board empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/board/depositor' element={<Depositor empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/board/notice' element={<Notice empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/board/notice/write' element={<NoticeWrite empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/board/notice/:id' element={<NoticeArticle empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}    
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/board/notice/:id/update' element={<NoticeUpdate empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}    
      {/* 매출 관리 */}
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/sales' element={<Sales empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}
      {/* 내 정보 수정 */}
      {isAuthenticated && token1 && token2 && token3 && <Route exact path='/myinfo' element={<MyInfo empnumber={empnumber} empname={empname} empdeptname={empdeptname}/>}/>}
    </Routes>
    {isAuthenticated && token1 && token2 && token3 && <Footer />}
  </div>
  );
 
}

export default App;