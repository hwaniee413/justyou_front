import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import cookie from 'react-cookies';

const API_URL = 'http://127.0.0.1:8080';

const LoginForm = () => {

    const empnumberRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();

    const onSubmit = (e) => {      
        e.preventDefault();      
        if(!isLoading && empnumberRef.current && passwordRef.current ) {
            setIsLoading(true);

            const empnumber = empnumberRef.current.value;
            const password = passwordRef.current.value;
            console.log("#username: ", empnumber);
            console.log("#password: ", password);
                    
            fetch(`${API_URL}/accounts/login.do`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({empnumber, password}),
            })
            .then(res => {
                
                console.log("res: ",res);
                if(res.ok) {                    
                    return res.json();                    
                } else {
                    sweetalert('로그인 중 오류가 발생하였습니다.', '', 'error', '닫기')
                }
            })
            .then(data => {
                // 성공적인 응답을 받은 경우
                console.log("data: ",data);
                if (data && data.token1 && data.token2 && data.token3) {
                    const expires = new Date();
                    expires.setDate(expires.getDate() + 1); // 1일(24시간)을 더함
                    cookie.save('empnumber', data.token1, { path:'/', expires});
                    cookie.save('empname', data.token2, { path:'/', expires});
                    cookie.save('empdeptname', data.token3, { path:'/', expires});                    
                    // admin 정보를 App.js로 전달합니다.
                     
                    history('/');                    
                } else if (data.error) {
                // 에러 핸들링
                sweetalert('로그인 중 오류가 발생하였습니다.', data.error, 'error', '닫기')
                }
            })
            .catch(error=> {
                sweetalert('로그인 중 오류가 발생하였습니다.', error, 'error', '닫기')                
            })
            .finally(() => {
                setIsLoading(false);
            });                            
        }
    }

    const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
          })
    }

    
    return (
        <section className="main">
            <div className="m_login">
                <h3><span><Link to={'/'}><img src={require("../../img/logo/logo02.png")} alt="" /></Link>
                </span>LOGIN</h3>
                <div className="log_box">
                    <form onSubmit={onSubmit}>
                        <div className="in_ty1">
                            <span><img src={require("../../img/main/m_log_i3.png")} alt="" /></span>
                            <input type="text" name="empnumber" ref={empnumberRef} placeholder="사원번호" />
                        </div>
                        <div  className="in_ty1">
                            <span className="ic_2">
                                <img src={require("../../img/main/m_log_i2.png")} alt="" />
                            </span>
                            <input type="password" ref={passwordRef} placeholder="비밀번호" />
                        </div>
                        <div className='in_ty3'>                        
                            <ul className="af">
                                <li><Link to={'/register'}>회원가입</Link></li>
                                <li className="pwr_b"><a href="#n">비밀번호 재설정</a></li>
                            </ul>                        
                        </div>
                        <Button className="s_bt">로그인</Button>
                    </form>
                </div>
            </div>
        </section>
    );
    
}

export default LoginForm;