import { useRef, useState, useEffect } from "react";
import { ListGroup,ListGroupItem, InputGroup, InputGroupText, Input, ListGroupItemHeading, Table, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs from 'dayjs';

import no_profile_img from '../../img/profile_img/no_image.png';
import { hover } from "@testing-library/user-event/dist/hover";
const API_URL = 'http://127.0.0.1:8080/emp/search';
const API_URL_EMP_FILE = 'http://127.0.0.1:8080/emp/getProfilefile';
const API_URL_EMP_UPDATE_FILE = 'http://127.0.0.1:8080/emp/updatefile';
const API_URL_EMP_UPDATE_MOBILE = 'http://127.0.0.1:8080/emp/updatemobile';
const API_URL_EMP_UPDATE_PASSWORD = 'http://127.0.0.1:8080/emp/updatepassword';

const MyInfo = (props) => {

    const [ emp, setEmp ] = useState([]);
    const empname = props.empname.sub;
    const [ mobileRef, setMobileRef] = useState('');
    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState(null);
    const [ file, setFile ] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const empMobileRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef(null);
    const history = useNavigate();

    

    useEffect(()=>{
        fetch(`${API_URL}_name?empname=${empname}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }, 
        })
        .then(res => {            
            if(res.ok){
                return res.json();
            } else {
                sweetalert('사원정보 가져오는 중 에러가 발생했습니다.', 'error');
            }
        })
        .then(empList => {
            if(empList) {
                console.log("empList : ", empList);
                setEmp(empList[0])
                setMobileRef(empList[0].mobile);
                loadEmpProfileImg(empList[0].empno);
            }
        })
        .catch(error => {
            sweetalert('사원정보 가져오는 중 에러가 발생했습니다.', '', 'error', '닫기');
        })

    }, [])
    
    const loadEmpProfileImg = (empno) => {
        fetch(`${API_URL_EMP_FILE}?empno=${empno}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => {            
            if(res.ok){
                //return res.json();
                return res.blob(); // Blob 형식으로 데이터 받음                
            } else {
                sweetalert('검색 중 오류 발생', '', 'error', '닫기');
            }
        })
        .then(blob  => {
            console.log("blob: ",blob);
            const reader = new FileReader();
            reader.readAsDataURL(blob); // Blob 데이터를 읽어들임

            reader.onload = () => {
                const base64data = reader.result; // base64 형식으로 데이터 변환
                const imageUrl = URL.createObjectURL(blob); // 이미지 URL 생성

                // 이미지 URL을 state 변수에 저장
                setImageUrl(imageUrl);
            }
           
        })
        .catch(error => {
            sweetalert('이미지 불러오기 중 오류 발생', error, 'error', '닫기');
        })
    }


    const handleMobileChange = (e) => {
        setMobileRef(e.target.value);
        console.log("handleMobileChange : ", mobileRef);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file) {
            setImage(URL.createObjectURL(file));   
            setFile(file);
        } else {
            setImage(null);
        }
        
    }
    const saveImage = (e) => {        
        if(!isLoading) {           
            const formData = new FormData();
            formData.append('file', file);
            formData.append('empno', emp.empno);
            fetch(`${API_URL_EMP_UPDATE_FILE}`, {
                method:'POST',
                body:formData
            })
            .then(res =>{
                if(res.ok){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '사진이 저장됐습니다.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    history(`/myinfo`);
                    setIsLoading(false);
                } else {
                    sweetalert('사진 업로드 중 에러가 발생했습니다.', '', 'error', '닫기');
                    setIsLoading(false);
                }
            })
            .catch( error => { 
                console.log("catch?: ", error);
                setIsLoading(false);
            });
        }
    }

    const updatePassword = (e) =>{
        var pattern1 = /[0-9]/;
        var pattern2 = /[a-zA-Z]/;
        var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;
        let password = '';
        if(passwordRef.current) {
            password = passwordRef.current.value;
            console.log('password: ', password);
        }
        
        const fnValidate = (e) => {
            if(password==='') {
               
                sweetalert('비밀번호를 입력해주세요.', '', 'info', '닫기')
                return false;
            }
            if(password !=='') {
                var str = password;
                if(str.search(/\s/) !== -1) {               
                    sweetalert('비밀번호 공백을 제거해주세요.', '', 'info', '닫기')
                    return false;
                } 
                if(!pattern1.test(str) || !pattern2.test(str) || !pattern3.test(str)
                || str.length < 8 || str.length > 16) {                    
                    sweetalert('8~16자 영문 대 소문자\n숫자, 특수문자를 사용하세요.', '', 'info', '닫기')
                    return false; 
                } 
            }        
            
            return true;
        }
        if(!isLoading && fnValidate(e)) {           
            const formData = new FormData();
            formData.append('password', password);
            formData.append('empno', emp.empno);
            fetch(`${API_URL_EMP_UPDATE_PASSWORD}`, {
                method:'POST',
                body:formData
            })
            .then(res =>{
                if(res.ok){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '비밀번호가 변경되었습니다.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    history(`/myinfo`);
                    setIsLoading(false);
                } else {
                    sweetalert('변경 중 에러가 발생했습니다.', '', 'error', '닫기');
                    setIsLoading(false);
                }
            })
            .catch( error => { 
                console.log("catch?: ", error);
                setIsLoading(false);
            });
        }

    }
    const updateMobile = (e) => {
        const mobile = mobileRef;
        const fnValidate = (e) => {           
            if(mobile ==='') {                
                sweetalert('휴대전화 번호를 입력해주세요.', '', 'info', '닫기')
                return false;
            }        
            return true;
        }        


        if(!isLoading && fnValidate(e)) {           
            const formData = new FormData();
            formData.append('mobile', String.valueOf(mobile));
            formData.append('empno', emp.empno);
            fetch(`${API_URL_EMP_UPDATE_MOBILE}`, {
                method:'POST',
                body:formData
            })
            .then(res =>{
                if(res.ok){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '연락처가 변경되었습니다.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    history(`/myinfo`);
                    setIsLoading(false);
                } else {
                    sweetalert('변경 중 에러가 발생했습니다.', '', 'error', '닫기');
                    setIsLoading(false);
                }
            })
            .catch( error => { 
                console.log("catch?: ", error);
                setIsLoading(false);
            });
        }

    }
    const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({    
            title: title,        
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText,
            timer: 1000
          })
    }

    return (
        <div className="empSearchContainer">
            <div className="flex-column">
                <div id="top"></div>
                <div className="empSearch-title-wrapper" >
                    <b>[ {empname} 님의 정보입니다. ]</b>
                    
                </div>                            
                <div className="empSearch-empinfo-wrapper1">
                    <div className="justify-center">
                        <ListGroup>                                                
                            <ListGroupItem>
                                <ListGroupItemHeading>프로필 사진</ListGroupItemHeading>                                                                 
                                <form>
                                <div className="profile-img-container">
                                    
                                    {
                                        image? <img className="profile-img" src={image} alt="Profile" />                    
                                        : (imageUrl? <img className="profile-img" src={imageUrl} alt="Profile" />
                                        : <img className="profile-img" src={no_profile_img} alt="Profile" />)
                                    }                                    
                                    
                                </div>       
                                <Input type="file" accept="image/*"  onChange={handleImageChange}></Input>                                
                                </form>
                            </ListGroupItem>
                            <Button color="success" onClick={(e) => saveImage(e)}>사진 저장하기</Button>
                        </ListGroup>                  
                    </div>
                    <div>
                        <ListGroup>                                                
                            <ListGroupItem>
                                <ListGroupItemHeading>사원정보</ListGroupItemHeading> 
                                <Table className="t-a-l">
                                    <tr>
                                        <th className="w-20">사원번호</th>
                                        <td className="w-30">{emp.empnumber}</td>
                                        <td className="w-30"></td>
                                        
                                    </tr>
                                    <tr>
                                        <th>이름</th>
                                        <td>{emp.name}</td>
                                        
                                    </tr>
                                    <tr>
                                        <th>연락처</th>
                                        <td><Input value={mobileRef}
                                                maxLength='11'
                                                onChange={handleMobileChange}
                                                style={{width:'150px'}}
                                                
                                                >                                                    
                                            </Input>                                            
                                        </td>
                                        <td><Button style={{color:'white', backgroundColor:'#198754'}}
                                        onClick={(e) => updateMobile(e)}
                                        >변경</Button></td>                                                                                
                                    </tr>
                                    <tr>
                                        <th>부서</th>
                                        <td>{emp.dept && emp.dept.deptname}</td>

                                    </tr>
                                    <tr>
                                        <th>직책</th>
                                        <td>{emp.emprank}</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <th>입사일</th>
                                        <td>{emp.rdate && dayjs(emp.rdate).format('YYYY.MM.DD')}</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <th>새비밀번호</th>
                                        <td><Input type="password"
                                                   maxLength='13' 
                                                   style={{width:'150px'}}
                                                   placeholder="최대13자리" 
                                                   innerRef={passwordRef}
                                            ></Input>
                                        </td>
                                        <td>
                                            <Button style={{color:'white', backgroundColor:'#198754'}}
                                                onClick={(e) => updatePassword(e)}>
                                                변경
                                            </Button> 
                                        </td>
                                    </tr>                                       

                                </Table>
                                <div>&nbsp;</div>
                                <div>&nbsp;</div>
                                <div>&nbsp;</div>

                            </ListGroupItem>                                                      
                        </ListGroup>
                                     
                    </div>                                                     
                </div>
           
                <div className="empSearch-empinfo-wrapper2">                   
                    <div>
                        <ListGroup>                                                
                            <ListGroupItem>
                                <ListGroupItemHeading>휴가/연차정보</ListGroupItemHeading> 
                                    <Table className="t-a-l">
                                        <tr>
                                            <th>당년 총 휴가</th>
                                            <td>{emp.vacation_total} 일</td>
                                        </tr>
                                        <tr>
                                            <th>잔여 휴가</th>
                                            <td>{emp.vacation_total - emp.vacation_used} 일 (사용:{emp.vacation_used})</td>
                                        </tr>
                                        <tr>
                                            <th>당년 총 연차</th>
                                            <td>{emp.annual_total} 일</td>
                                        </tr>
                                        <tr>
                                            <th>남은 연차</th>
                                            <td>{emp.annual_total - emp.annual_used} 일 (사용:{emp.annual_used})</td>
                                        </tr>
                                    </Table>
                            </ListGroupItem>
                        </ListGroup>                     
                    </div>
                    <div>
                        <ListGroup>                                                
                            <ListGroupItem>
                                <ListGroupItemHeading>급여정보</ListGroupItemHeading> 
                                <Table className="t-a-l">
                                    <tr>
                                        <th>급여</th>
                                        <td>{emp.sal && emp.sal.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>보너스</th>
                                        <td>{emp.comm && emp.comm.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <td>&nbsp;</td>
                                    </tr>                                    
                                </Table>
                                (단위:원)
                            </ListGroupItem>
                        </ListGroup>                     
                    </div>
                    <div>
                        <ListGroup>                                                
                            <ListGroupItem>
                                <ListGroupItemHeading>Extra</ListGroupItemHeading> 
                                <Table className="t-a-l">
                                    <tr>
                                        <th>근속년차</th>
                                        <td>
                                        {emp.rdate && 
                                        `${dayjs().diff(emp.rdate, 'year')}년 ${dayjs().diff(emp.rdate, 'month') % 12}개월`}
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <th>&nbsp;</th>
                                        <td>&nbsp;</td>
                                    </tr>                                    
                                </Table>
                            
                            
                            </ListGroupItem>
                        </ListGroup>                     
                    </div>
                    
                                  
                </div>
               
                
            </div>            
                       
        </div>
    )
}

export default MyInfo;