import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'
import $ from 'jquery';



const Register = () => {
    const API_URL = 'http://127.0.0.1:8080/accounts';
    const history = useNavigate();

    const [adminCode, setAdminCode] = useState({});
    const id = 1;   //Admin_code 테이블의 1번

    
    useEffect(()=>{
        const fetchNotice = async () => {
            const response = await fetch(`${API_URL}/admincode/${id}`);            
            const adminCodeVal = await response.json();
            setAdminCode(adminCodeVal);  
            console.log("adminCodeVal: ", adminCodeVal);
          };
          fetchNotice();
      }, [id]);

    // 유효성 체크
    const submitClick = async (type, e) => {
        
        const email_val_checker = $('#email_val').val();
        const email2_val_checker = $('#email2_val').val();
        const pwd_val_checker = $('#pwd_val').val();
        const pwd_cnf_val_checker = $('#pwd_cnf_val').val();
        const name_val_checker = $('#name_val').val();
        const code_val_checker = $('#code_val').val();

      
       
        const fnValidate = (e) => {
            var pattern1 = /[0-9]/;
            var pattern2 = /[a-zA-Z]/;
            var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;

            if(email_val_checker === '') {
                $('#email_val').addClass('border_validate_err');
                sweetalert('이메일 주소를 다시 확인해주세요.', '', 'info', '닫기')
                return false;
            }
            if(email_val_checker.search(/\s/) !== -1) {
                $('#email_val').addClass('border_validate_err');
                sweetalert('이메일 공백을 제거해 주세요.', '', 'info', '닫기')
                return false;
            }
            $('#email_val').removeClass('border_validate_err');

            if(email2_val_checker ==='') {
                $('#email2_val').addClass('border_validate_err');
                sweetalert('이메일 주소를 다시 확인해주세요.', '', 'info', '닫기')
                return false;
            }
            $('#email2_val').removeClass('border_validate_err');

            if(pwd_val_checker ==='') {
                $('#pwd_val').addClass('border_validate_err');
                sweetalert('비밀번호를 입력해주세요.', '', 'info', '닫기')
                return false;
            }
            if(pwd_val_checker !=='') {
                var str = pwd_val_checker;
                if(str.search(/\s/) !== -1) {
                    $('#pwd_val').addClass('border_validate_err');
                    sweetalert('비밀번호 공백을 제거해주세요.', '', 'info', '닫기')
                    return false;
                } 
                if(!pattern1.test(str) || !pattern2.test(str) || !pattern3.test(str)
                || str.length < 8 || str.length > 16) {
                    $('#pwd_val').addClass('border_validate_err');
                    sweetalert('8~16자 영문 대 소문자\n숫자, 특수문자를 사용하세요.', '', 'info', '닫기')
                    return false; 
                } 
            }
            $('#pwd_val').removeClass('border_validate_err');

            if(pwd_cnf_val_checker ==='') {
                $('#pwd_cnf_val').addClass('border_validate_err');
                sweetalert('비밀번호 확인을 입력해주세요.', '', 'info', '닫기')
                return false;
            }
            if(pwd_val_checker !== pwd_cnf_val_checker) {
                $('#pwd_val').addClass('border_validate_err');
                $('#pwd_cnf_val').addClass('border_validate_err');
                sweetalert('비밀번호가 일치하지 않습니다.', '', 'info', '닫기')
                return false;
            }
            $('#pwd_cnf_val').removeClass('border_validate_err');

            if(name_val_checker ==='') {
                $('#name_val').addClass('border_validate_err');
                sweetalert('성명을 입력해주세요.', '', 'info', '닫기')
                return false;
            }
            if(name_val_checker.search(/\s/) !== -1) {
                $('#name_val').addClass('border_validate_err');
                sweetalert('성명에 공백을 제거해주세요.', '', 'info', '닫기')
                return false;
            }
            $('#name_val').removeClass('border_validate_err');
            if(code_val_checker === '') {
                $('#code_val').addClass('border_validate_err');
                sweetalert('관리자 코드를 입력해주세요', '', 'info', '닫기')
                return false;
            }
            if(code_val_checker.search(/\s/) !== -1) {
                $('#code_val').addClass('border_validate_err');
                sweetalert('관리자 코드에 공백을 제거해주세요', '', 'info', '닫기')
                return false;
            }
            if(code_val_checker !== `${adminCode.admin_code}`) {
                $('#code_val').addClass('border_validate_err');
                sweetalert('관리자 코드가 틀렸습니다', '', 'info', '닫기')
                return false;
            }            
            $('#code_val').removeClass('border_validate_err');
    
        
            return true;
        }

         // 아이디 중복 체크
        if(fnValidate()){
            const full_email = email_val_checker+'@'+ email2_val_checker
            fetch(`${API_URL}/dplicheck?admin_id=${full_email}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
                //body: JSON.stringify({ admin_id: full_email })                             
              })
            .then( res => {      
                console.log("res: ",res);
                if(res.ok) {                    
                    return res.json();                    
                } else {
                    sweetalert('이메일 중복 확인  중 오류가 발생하였습니다.', 'res: false', 'error', '닫기')
                }
            })
            .then(data => {
                console.log("response.data.admin_id: ", data.admin_id);
                try {                                    
                    if ( data.admin_id === null ||data.admin_id === "null"){
                        $('#email_val').removeClass('border_validate_err');
                        $('#email2_val').removeClass('border_validate_err');
                        fnSignInsert('signup', e)
                        console.log("null입니다.");
                    } else {
                        $('#email_val').addClass('border_validate_err');
                        $('#email2_val').addClass('border_validate_err');
                        sweetalert('이미 존재하는 이메일입니다.', '', 'info', '닫기')
                        console.log("null이 아닙니다.");
                    }
                } catch (error) {
                    sweetalert('이메일 중복 확인 중 에러가 발생하였습니다.', error, 'error', '닫기')
                }               
            })
            .catch( error => { 
                console.log("catch?: ", error);
                return false; 
            });
        }

        const fnSignInsert = async (type, e) => {
            const admin_id = email_val_checker + '@' + email2_val_checker
            const admin_pwd = pwd_val_checker;
            const admin_name = name_val_checker;
            const admin_code = code_val_checker;
            
            const Json_Form = JSON.stringify({admin_id: admin_id, admin_pwd:admin_pwd, admin_name:admin_name, admin_code:admin_code});
            console.log(Json_Form);
            try {
                fetch(`${API_URL}/register/`+type, {
                    method: 'POST',            
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: Json_Form,                    
                })
                .then(res=> {
                    console.log("res: ", res);                    
                    if(res.ok) {
                        sweetalert('계정생성이 완료되었습니다.', '', 'info', '닫기');
                        history('/');
                    } else {
                        sweetalert('계정생성 중 오류가 발생하였습니다.', 'res: false', 'error', '닫기');            
                    }
                });
            } catch (error) {
                sweetalert('계정생성 중 오류가 발생하였습니다.', error, 'error', '닫기');            
            }
        }
    };

    const emailKeyPress = (e) => {
        $('#email_val').removeClass('border_validate_err');
    };

    const pwdKeyPress = (e) => {
        $('#pwd_val').removeClass('border_validate_err');
    };

    const pwdCnfKeyPress = (e) => {
        $('#pwd_cnf_val').removeClass('border_validate_err');
    };

    const nameKeyPress = (e) => {
        $('#name_val').removeClass('border_validate_err');
    };
    const codeKeyPress = (e) => {
        $('#code_val').removeClass('border_validate_err');
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
   
    const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
          })
    }
    

    
    return (
        <div>
            <section className="sub_wrap" >
                <article className="s_cnt re_1 ct1">
                    
                    <div className="li_top">
                        <div className='flex justify-center'>
                            <Link to={'/'}><img src={require("../../img/logo/logo02.png")} alt="" /></Link>
                            
                        </div>                  
                        <div className='flex justify-center'>
                            <h2 className="s_tit1">관리자 계정 생성</h2>
                        </div>  
                        <form method="post" name="frm">
                            <div className="re1_wrap">
                                <div className="re_cnt ct2">
                                    <table className="table_ty1">
                                        <tbody>
                                        <tr className="re_email">
                                            <th>이메일</th>
                                            <td>
                                                <input id="email_val" type="text" name="admin_id"
                                                placeholder="이메일을 입력해주세요." onKeyDown={emailKeyPress}/>
                                                <span className="e_goll">@</span>
                                                <select id="email2_val" className="select_ty1">
                                                        <option value="">선택하세요</option>
                                                        <option value='naver.com'>naver.com</option>
                                                        <option value='hanmail.net'>hanmail.net</option>
                                                        <option value='nate.com'>nate.com</option>
                                                        <option value='hotmail.com'>hotmail.com</option>
                                                        <option value='gmail.com'>gmail.com</option>
                                                        <option value='yahoo.co.kr'>yahoo.co.kr</option>
                                                        <option value='yahoo.com'>yahoo.com</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>비밀번호</th>
                                            <td>
                                                <input id="pwd_val" type="password" name="admin_pwd"
                                                placeholder="비밀번호를 입력해주세요." onKeyDown={pwdKeyPress} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>비밀번호 확인</th>
                                            <td>
                                                <input id="pwd_cnf_val" type="password"
                                                placeholder="비밀번호를 다시 입력해주세요." onKeyDown={pwdCnfKeyPress}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>성명</th>
                                            <td>
                                                <input id="name_val" type="text" name="admin_name"
                                                placeholder="성명을 입력해주세요." onKeyDown={nameKeyPress}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>관리자 코드</th>
                                            <td>
                                                <input id="code_val" type="text" name="admin_code"
                                                placeholder="코드를 입력해주세요." onKeyDown={codeKeyPress}/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="btn_confirm">
                                <div className="bt_ty bt_ty2 submit_ty1" 
                                onClick={(e) => submitClick('signup', e)}>계정생성</div>
                            </div>
                        </form>
                    </div>
                </article>
            </section>
        </div>
    );
    
}

export default Register;