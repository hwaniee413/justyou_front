import { ListGroup,ListGroupItem, ListGroupItemHeading,
     Input, InputGroup, InputGroupText, Button } from "reactstrap";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import dayjs from "dayjs";

import Swal from "sweetalert2";
import axios from "axios";

import no_profile_img from '../../../img/profile_img/no_image.png';
import { error } from "console";

const API_URL_DEPT = 'http://127.0.0.1:8080/dept';
const API_URL_EMP = 'http://127.0.0.1:8080/emp';
const EmpInsert = (props) => {
    const histroy = useNavigate();
    const [ dept, setDept ] = useState([]);
    const [ rdateRef, setRDateRef ] = useState(null);
    const [image, setImage] = useState(null);
    const [ file, setFile ] = useState(null);

    const empNumberRef = useRef<HTMLInputElement>(null);
    const empNameRef = useRef<HTMLInputElement>(null);
    const empMobileRef = useRef<HTMLInputElement>(null);
    const empEmailRef = useRef<HTMLInputElement>(null);
    const deptNoRef = useRef(null);
    const empRankRef = useRef(null);
    const salRef = useRef<HTMLInputElement>(null);
    const commRef = useRef<HTMLInputElement>(null);
    const vacationRef = useRef<HTMLInputElement>(null);
    const annualRef= useRef<HTMLInputElement>(null);
    const tempPwdRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const formData = new FormData();

    useEffect(() => {
        const fetchDept = async ()=> {
            const response = await fetch(`${API_URL_DEPT}/list`);
            const dept = await response.json();
            console.log("dept: ", dept);            
            setDept(dept);
        };  
        fetchDept();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file) {
            setImage(URL.createObjectURL(file));   
            setFile(file);
        } else {
            setImage(null);
        }
        
    }
    const handleDeptNoChange = (event) => {
        const deptno = event.target.value;
        console.log("handleDeptNoChange deptno: ", deptno);
        deptNoRef.current = deptno;
    }
    const handleEmpRankChange = (event) => {
        const emprank = event.target.value;
        console.log("handleDeptNoChange emprank: ", emprank);
        empRankRef.current = emprank;
    }
    

 
    const kstOffset = 9 * 60 * 60 * 1000; // 한국 표준시 오프셋: 9시간
 

    const handleRDateChange = (date) => {

      
        console.log("selected rdate: ", date);        
        setRDateRef(date);
    };

    const onSubmit = (e) =>{
        e.preventDefault();  

        const fnValidate = (e) => {
            var pattern1 = /[0-9]/;
            var pattern2 = /[a-zA-Z]/;
            var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;

            let email ='';
            if(empEmailRef.current) {
                email = empEmailRef.current.value;
            }
            if(email === '') {                
                sweetalert('이메일 주소를 다시 확인해주세요.', '', 'info', '닫기')               
                return false;
            }
            if(email.search(/\s/) !== -1) {                
                sweetalert('이메일 공백을 제거해 주세요.', '', 'info', '닫기')                
                return false;
            }

            let password = '';
            if(tempPwdRef.current) {
                password = tempPwdRef.current.value;
            }
            if(password !=='') {                
                if(password.search(/\s/) !== -1) {               
                    sweetalert('비밀번호 공백을 제거해주세요.', '', 'info', '닫기')
                    return false;
                } 
                if(!pattern1.test(password) || !pattern2.test(password) || !pattern3.test(password)
                || password.length < 8 || password.length > 16) {                    
                    sweetalert('8~16자 영문 대 소문자\n숫자, 특수문자를 사용하세요.', '', 'info', '닫기')
                    return false; 
                } 
            }        
            return true;
        }
        //이메일 중복 체크
        if(empEmailRef.current && fnValidate(e)) {
            const email = empEmailRef.current.value;
            axios.get(`${API_URL_EMP}/dplicheck?email=${email}`)
            .then(response => {
                console.log("이메일 중복?: ", response.data)
                if(!response.data) {
                    fnEmpInert();
                } else {
                    sweetalert('중복된 이메일이 존재합니다.', '', 'info', '닫기'); 
                    setIsLoading(false);
                }
            })
            .catch(error => {
                sweetalert('에러 발생', error, 'info', '닫기'); 
                setIsLoading(false);

            })
        }

        const fnEmpInert = () => {
            if(!isLoading && empNumberRef.current && empNameRef.current &&
                empMobileRef.current && empRankRef.current && deptNoRef.current &&
                salRef.current && vacationRef.current && annualRef.current &&
                tempPwdRef.current && empEmailRef.current) {
    
                setIsLoading(true);
                const empnumber = empNumberRef.current.value;
                const name = empNameRef.current.value;
                const mobile = empMobileRef.current.value;
                const emprank = empRankRef.current;
                const deptno = deptNoRef.current;
                const sal = salRef.current.value;
                const vacation_total = vacationRef.current.value;
                const annual_total = annualRef.current.value;
                const password = tempPwdRef.current.value;
                const rdate = rdateRef;
                const email = empEmailRef.current.value;
             
                const formData = new FormData();
                if(image && file){
                    formData.append('file', file);
                }                        
                fetch(`${API_URL_EMP}/insert`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    }, 
                    body: JSON.stringify({empnumber, name, emprank, deptno, mobile, sal, vacation_total, annual_total, password, rdate, email})
                })
                .then(res => {
                    if(res.ok) {
                        if(image){
                            fetch(`${API_URL_EMP}/${empnumber}/fileUp`, {
                                method: 'POST',                                                                                                           
                                body: formData
                            })
                            .then(res =>{
                                if(res.ok){
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: '저장됐습니다.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    histroy(`/`);
                                    setIsLoading(false);
                                }
                            })
                        } else {
                            Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '저장됐습니다.',
                            showConfirmButton: false,
                            timer: 1500
                            })
                        }
                        histroy(`/`);
                        setIsLoading(false);
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: '입력중 에러가 발생했습니다.',
                            showConfirmButton: false,
                            timer: 1500
                          })                    
                        setIsLoading(false); 
                    }
                })
                .catch(error =>{
                    sweetalert('입력중 에러가 발생했습니다.', error, 'error', '닫기');                
                    setIsLoading(false); 
                });
            }
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


    const handleReset = () => {
        empNumberRef.current.value = "";
        empNameRef.current.value = "";
        empMobileRef.current.value = "";
        salRef.current.value = "";
        commRef.current.value = "";
        vacationRef.current.value = "";
        annualRef.current.value = "";
        tempPwdRef.current.value=""; 
        empEmailRef.current.value="";
        if(image){
            setImage(null);
        }
        if(rdateRef){
            setRDateRef(null);
        }
        //setRDate(null);

      };

    return(
        <React.Fragment>
        <div className="empInsertContainer">
            <div className="flex-column w-100 h-auto ovfl-hidden">
                <div id="top"></div>
                <div className="empViewAll-title-wrapper" >
                    <b>[ {props.title} ]</b>
                </div> 
                <form onSubmit={onSubmit}>                    
                <div className="empInsert-insert-wrapper ">                    
                    <div>
                        <ListGroup>                                                
                            <ListGroupItem>
                                <ListGroupItemHeading>프로필 사진</ListGroupItemHeading> 
                                <div className="profile-img-container">
                                    {image? <img className="profile-img" src={image} alt="Profile" />
                                    : <img className="profile-img" src={no_profile_img} alt="Profile" /> }
                                </div>                                
                                <Input type="file" accept="image/*"  onChange={handleImageChange}></Input>                                
                            
                            </ListGroupItem>
                        </ListGroup>                  
                    </div>
                    <div>
                        <ListGroup className="h-auto ovfl-hidden">                                                
                            <ListGroupItem>                                
                                <InputGroup>
                                    <InputGroupText>사원번호</InputGroupText>
                                    <Input innerRef={empNumberRef}  type="number" ></Input>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupText>&nbsp;&nbsp;이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름&nbsp;&nbsp;</InputGroupText>
                                    <Input maxLength="6" innerRef={empNameRef}></Input>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupText>&nbsp;&nbsp;연락처&nbsp;&nbsp;</InputGroupText>
                                    <Input maxLength="11" innerRef={empMobileRef} ></Input>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupText>&nbsp;&nbsp;이메일&nbsp;&nbsp;</InputGroupText>
                                    <Input type="email" innerRef={empEmailRef} ></Input>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupText>&nbsp;&nbsp;부&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;서&nbsp;&nbsp;</InputGroupText>
                                    <select onChange={handleDeptNoChange}>
                                        <option disabled selected>선택</option>
                                        {dept.map((item, index) => (                                                                          
                                        <option value={index+1}>{item.deptname}</option>
                                        ))}                                                                        
                                    </select>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupText>&nbsp;&nbsp;직&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;책&nbsp;&nbsp;</InputGroupText>
                                    <select onChange={handleEmpRankChange}>
                                        <option disabled selected>선택</option>
                                        <option value="ceo">CEO</option>                               
                                        <option value="이사">이사</option>                                        
                                        <option value="부장">부장</option>                               
                                        <option value="과장">과장</option>                               
                                        <option value="대리">대리</option>                               
                                        <option value="사원">사원</option>                               
                                    </select>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupText>&nbsp;&nbsp;입사일&nbsp;&nbsp;</InputGroupText>                                    
                                    <Input placeholder="아래에서 선택하세요" value={rdateRef && dayjs(rdateRef).format('YYYY/MM/DD')} 
                                            style={{backgroundColor:'white'}} disabled >                                    
                                    </Input>                                                       
                                </InputGroup>                                
                                <DatePicker 
                                    selected={rdateRef}
                                    showTimeSelect
                                    dateFormat="yyyy/MM/dd HH:mm:ss"
                                    onChange={handleRDateChange} /> 
                                <InputGroup>
                                    <InputGroupText>&nbsp;&nbsp;급&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;여&nbsp;&nbsp;</InputGroupText>
                                    <Input maxLength="9" type="number" innerRef={salRef} placeholder="(단위:원)"></Input>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupText>&nbsp;&nbsp;보너스&nbsp;&nbsp;</InputGroupText>                                    
                                    <Input maxLength="9"  type="number" innerRef={commRef} placeholder="(단위:원)">                                    
                                    </Input>                                                       
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupText>&nbsp;&nbsp;휴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;가&nbsp;&nbsp;</InputGroupText>
                                    <Input maxLength="2"  type="number" innerRef={vacationRef} placeholder="기본휴가일수"></Input>
                                </InputGroup>                             
                                <InputGroup>
                                    <InputGroupText>&nbsp;&nbsp;연&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;차&nbsp;&nbsp;</InputGroupText>
                                    <Input maxLength="2" type="number"  innerRef={annualRef} placeholder="기본연차수"></Input>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupText>임시비밀번호</InputGroupText>
                                    <Input innerRef={tempPwdRef}  type="password" ></Input>
                                </InputGroup>
                                
                                <div>&nbsp;</div>
                                <div>&nbsp;</div> 
                                <div>&nbsp;</div>
                                <div>&nbsp;</div>
                                <div>&nbsp;</div>                                 
                                <div><Button>입력</Button>&nbsp;<Button type="button" onClick={handleReset}>초기화</Button></div>    
                            </ListGroupItem>                            
                        </ListGroup>      
                       
                        <div></div>
                        <div></div>
                    </div>  
                    
                </div>
                </form>  
            </div>            
                    
        </div>
        </React.Fragment>
    )
}

export default EmpInsert;