import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, 
    Modal, ModalBody, ModalFooter, ModalHeader, Table,} from "reactstrap";
import dayjs from 'dayjs';

import no_profile_img from '../../img/profile_img/no_image.png';

import Swal from "sweetalert2";

const API_URL = 'http://127.0.0.1:8080/emp';
const API_URL_EMP_FILE = 'http://127.0.0.1:8080/emp/getProfilefile';

const EmpCeo = () => {
    const [ emp, setEmp ] = useState([]);
    const [ modal, setModal ] = useState(false);
    const [ imageUrl, setImageUrl ] = useState(null);
    const emprank = 'CEO';


    useEffect(() => {
        const fetchEmp = async ()=> {
            const response = await fetch(`${API_URL}/emp?emprank=${emprank}`);
            const emp = await response.json();
            console.log("emp: ", emp);            
            setEmp(emp);            
        };  
        fetchEmp();
    }, []);
   
    const toggle = (index) => {                
        setModal(!modal);
        if(!modal) {        
            emp.forEach((item, i) => (
                i === index ? loadEmpProfileImg(item.empno): null)
            )                            
        }       
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

    return(
        <ListGroupItem>
            <ListGroupItem>
            <ListGroupItemHeading>{emprank}</ListGroupItemHeading> 
                <Table borderless size="sm" className='f-s-95'>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>연락처</th>
                            <th>입사일</th>
                        </tr>
                    </thead>
                    <tbody>                            
                        {emp.map((item, index) => (
                            <React.Fragment key={item.EMPNO}>                        
                            <tr onClick={() => toggle(index)}>
                                <td>{item.name}</td>
                                <td>{item.mobile.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-")}</td>
                                <td>{dayjs(item.rdate).format('YYYY.MM.DD')}</td>                        
                            </tr>
                            <Modal isOpen={modal} fade={true} toggle={() => toggle(index)}>
                                    <ModalHeader>                                        
                                        {item.name}님 프로필                                        
                                    </ModalHeader>
                                    <ModalBody>
                                        <div className="emp-detail-container">
                                            <div className="emp-detail-grid">
                                                <div className="emp-detail-grid-child1">
                                                    <div className="profile-img-container">
                                                        {imageUrl? <img className="profile-img" src={imageUrl} alt="Profile" />
                                                            : <img className="profile-img" src={no_profile_img} alt="Profile" />
                                                        }                                    
                                                    </div>   
                                                </div>
                                                <div className="emp-detail-grid-child2">
                                                    <div className="empTableContainer">
                                                        <Table className="t-a-l">
                                                            <tr>
                                                                <th>이름</th>
                                                                <td>{item.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>연락처</th>
                                                                <td>{item.mobile.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-")}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>입사일</th>
                                                                <td>{dayjs(item.rdate).format('YYYY.MM.DD')}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>직책</th>
                                                                <td>{item.emprank}</td>
                                                            </tr> 
                                                            <tr>
                                                                <th>이메일</th>
                                                                <td>{item.email}</td>
                                                            </tr>                                                     
                                                        </Table>
                                                    </div>
                                                </div>
                                            </div>                                            
                                        </div>                                        
                                    </ModalBody>
                                    <ModalFooter>
                                    </ModalFooter>
                                </Modal>
                            </React.Fragment>
                        ))} 
                    </tbody>
                </Table>             
            </ListGroupItem>       
        </ListGroupItem>
    )
}

export default EmpCeo;