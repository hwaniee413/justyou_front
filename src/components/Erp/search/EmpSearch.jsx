import { useRef, useState, useEffect } from "react";
import { ListGroup,ListGroupItem, InputGroup, InputGroupText, Input, ListGroupItemHeading, Table, Button, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";
import Swal from "sweetalert2";
import dayjs from 'dayjs';
import EmpListAll from "../EmpViewAll";
import { event } from "jquery";


import no_profile_img from '../../../img/profile_img/no_image.png';

const API_URL_EMP_SEARCH = 'http://127.0.0.1:8080/emp/search';
const API_URL_EMP_FILE = 'http://127.0.0.1:8080/emp/getProfilefile';

const EmpSearch = (props) =>{
    const empNumberRef = useRef(null);
    const empNameRef = useRef(null);
    const [ emp, setEmp ] = useState([]);
    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState(null);
    const [ empList, setEmpList ] = useState([]);
    const [ dropDownOpen, setDropDownOpen] = useState(false);
    
    useEffect(() => {
        if (empList.length === 1) {
            setEmp(empList[0]);
            loadEmpProfileImg(empList[0].empno);
        } else if (emp.length > 1) { // 동명이인이 존재하는 경우
            console.log("empList : ", empList);
            //setEmpList(empList);
        }
                      
      }, [empList]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            console.log("#empNumberRef.current: ",empNumberRef.current, ", #empNameRef.current: ", empNameRef.current);
            const { target } = event; // 현재 이벤트가 발생한 input
            if(target === empNumberRef.current) {
                empNameRef.current.value = ''; // 다른 input의 값을 비움
                const kw = parseInt(empNumberRef.current.value);
                if (!isNaN(kw)) { // kw가 NaN이 아닌 숫자인 경우에만 검색
                    console.log("empnumber kw: ", kw);
                    searchEmpNumber(kw);
                } else {
                    console.log("kw: ", kw);
                    Swal.fire({
                        position:'center',
                        icon: 'error',
                        text: '숫자만 입력할 수 있습니다.',
                        showConfirmButton:false,
                        timer: 1500
                    });
                }                
            } else if(target === empNameRef.current){
                empNumberRef.current.value = ''; // 다른 input의 값을 비움
                const kw = empNameRef.current.value;
                console.log("empname kw: ", kw);
                searchEmpName(kw);
            }               
        }
    };
    const handleFocus = (event) => {
        const { target } = event; // 현재 이벤트가 발생한 input
        if(target === empNumberRef.current) {
            empNameRef.current.value = ''; // 다른 input의 값을 비움               
        } else if(target === empNameRef.current){
            empNumberRef.current.value = ''; // 다른 input의 값을 비움            
        }  

    }

    const searchEmpNumber = (kw) => {
        // 검색을 수행하는 코드
        fetch(`${API_URL_EMP_SEARCH}_empnumber?empnumber=${kw}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }, 
        })
        .then(res => {            
            if(res.ok){
                return res.json();
            } else {
                sweetalert('검색 중 오류 발생', '', 'error');
            }
        })
        .then(emp => {
            if(emp) {
                console.log("emp : ", emp);
                setEmp(emp);
                loadEmpProfileImg(emp.empno);
            }
        })
        .catch(error => {
            sweetalert('검색 중 오류 발생', '입력하신 사번으로 사원을 찾을 수 없습니다.', 'error');
        })

        // 검색어에 해당하는 결과를 찾아서 setSearchResults 함수를 사용하여 searchResults state 변수에 저장합니다.
       
    };
    const searchEmpName = (kw) => {
        // 검색을 수행하는 코드
        fetch(`${API_URL_EMP_SEARCH}_name?empname=${kw}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }, 
        })
        .then(res => {            
            if(res.ok){
                return res.json();
            } else {
                sweetalert('검색 중 오류 발생', '', 'error');
            }
        })
        .then(empList => {
            if(empList) {
                setEmpList(empList);                                   
            }
        })
        .catch(error => {
            sweetalert('검색 중 오류 발생', '입력하신 이름의 사원을 찾을 수 없습니다.', 'error');
        })
    }

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
                sweetalert('검색 중 오류 발생', '', 'error');
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
            sweetalert('이미지 불러오기 중 오류 발생', error, 'error');
        })
    }

    const sweetalert = (title, contents, icon) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            showConfirmButton: false,
            timer: 1000
          })
    }

    const dropdownToggle = (e) =>{
        setDropDownOpen(!dropDownOpen);
    }

    return (

        <div className="empSearchContainer">
            <div className="flex-column">
                <div id="top"></div>
                <div className="empSearch-title-wrapper" >
                    <b>[ {props.title} ]</b>
                </div>
                <div className="empSearch-search-wrapper"> 
                    <ListGroup>               
                        <ListGroupItem>사원번호/이름 중 하나로 검색하세요</ListGroupItem>
                    </ListGroup>                                        
                    <InputGroup>                        
                        <InputGroupText>사원번호</InputGroupText>
                        <Input innerRef={empNumberRef} onKeyDown={handleKeyDown} onFocus={handleFocus}></Input>
                        <InputGroupText>사원이름</InputGroupText>
                        <Input innerRef={empNameRef} onKeyDown={handleKeyDown} onFocus={handleFocus}></Input>                       
                    </InputGroup>
                </div>
                { empList.length > 1 && 
                 <div className="empSearch-search-wrapper">
                    <ListGroup>
                        <ListGroupItem>
                            <ButtonDropdown isOpen={dropDownOpen} toggle={dropdownToggle}>
                                <DropdownToggle color="info" caret>동명이인이 존재합니다.</DropdownToggle>
                                <DropdownMenu>
                                {empList.map(item => (
                                    <DropdownItem onClick={() => searchEmpNumber(item.empnumber)}>
                                        {item.name}&nbsp;&nbsp;  
                                        {item.empnumber}&nbsp; &nbsp;                                                                       
                                    </DropdownItem>
                                ))}   
                                </DropdownMenu>
                            </ButtonDropdown>                                 
                        </ListGroupItem>        
                    </ListGroup>
                </div>
                }               
                <div className="empSearch-empinfo-wrapper1">
                    <div>
                        <ListGroup>                                                
                            <ListGroupItem>
                                <ListGroupItemHeading>프로필 사진</ListGroupItemHeading> 
                                <div className="profile-img-container">
                                    {imageUrl? <img className="profile-img" src={imageUrl} alt="Profile" />
                                        : <img className="profile-img" src={no_profile_img} alt="Profile" />
                                    }                                    
                                </div>       
                            </ListGroupItem>
                        </ListGroup>                  
                    </div>
                    <div>
                        <ListGroup>                                                
                            <ListGroupItem>
                                <ListGroupItemHeading>사원정보</ListGroupItemHeading> 
                                <Table className="t-a-l">
                                    <tr>
                                        <th className="w-20">사원번호</th>
                                        <td className="w-80">{emp.empnumber}</td>
                                    </tr>
                                    <tr>
                                        <th>이름</th>
                                        <td>{emp.name}</td>
                                    </tr>
                                    <tr>
                                        <th>연락처</th>
                                        <td>{emp.mobile && emp.mobile.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-")}</td>
                                    </tr>
                                    <tr>
                                        <th>이메일</th>
                                        <td>{emp.email}</td>
                                    </tr>   
                                    <tr>
                                        <th>부서</th>
                                        <td>{emp.dept && emp.dept.deptname}</td>
                                    </tr>
                                    <tr>
                                        <th>직책</th>
                                        <td>{emp.emprank}</td>
                                    </tr>
                                    <tr>
                                        <th>입사일</th>
                                        <td>{emp.rdate && dayjs(emp.rdate).format('YYYY.MM.DD')}</td>
                                    </tr>                                   

                                </Table>
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
                                            <td>{emp.vacation_total && emp.vacation_total - emp.vacation_used} 일 (사용:{emp.vacation_used})</td>
                                        </tr>
                                        <tr>
                                            <th>당년 총 연차</th>
                                            <td>{emp.annual_total} 일</td>
                                        </tr>
                                        <tr>
                                            <th>남은 연차</th>
                                            <td>{emp.annual_total && emp.annual_total - emp.annual_used} 일 (사용:{emp.annual_used})</td>
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
                                <ListGroupItemHeading> 근속정보 </ListGroupItemHeading> 
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
                            
                                <div>&nbsp;</div>
                                <div>&nbsp;</div>
                            </ListGroupItem>
                            
                        </ListGroup>                     
                    </div>
                    
                                  
                </div>
                
            </div>            
                       
        </div>
    )



}

export default EmpSearch;