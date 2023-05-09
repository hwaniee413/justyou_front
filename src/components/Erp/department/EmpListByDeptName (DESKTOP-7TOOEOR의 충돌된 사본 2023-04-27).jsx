import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, UncontrolledCollapse, Card, CardBody } from "reactstrap";
import dayjs from 'dayjs';

import DepartmentInfo from "./DepartmentInfo";
import DepartmentManger from "./DepartmentManger";
import Manager from "./Manager";
import AssistantMaganer from './AssistantMaganer';
import Staff from './Staff';
import { Calender } from "./Calender";

const API_URL = 'http://127.0.0.1:8080/emp';

const EmpListByDeptName = (props) => {
    const [ emp, setEmp ] = useState([]);
      return(
        <div className="empViewAllContainer">
            <div className="empViewAll-grid1">
                <div id="top"></div>
                <div className="empViewAll-title-wrapper" >
                    <b>[ {props.deptname} 입니다 ]</b>
                </div>
                <div className="empViewAll-list-wrapper">
                    <ListGroup>                                                
                        <ListGroupItem id="toggle1">
                             <strong>[ {props.deptname} 업무계획(Calender) ]</strong>
                        </ListGroupItem>
                    </ListGroup> 
                    <ListGroup>
                        <UncontrolledCollapse toggler="#toggle1">
                            <Card>
                                <CardBody>
                                    달력?
                                </CardBody>
                            </Card>
                        </UncontrolledCollapse>
                    </ListGroup>    
                </div>                
                <div className="empViewAll-list-wrapper">
                    <ListGroup>
                        <ListGroupItem id="toggle3">
                            <strong>[ 부서원 보기 ]</strong>
                        </ListGroupItem>
                    </ListGroup>
                    <ListGroup>   
                        <UncontrolledCollapse toggler="#toggle3">
                            <Card>
                                <CardBody>                                                                        
                                    <DepartmentManger deptname={props.deptname}/>
                                    <Manager deptname={props.deptname}/>
                                    <AssistantMaganer deptname={props.deptname}/>
                                    <Staff deptname={props.deptname}/>
                                </CardBody>
                            </Card>
                        </UncontrolledCollapse>
                    </ListGroup>   
                    
                </div>
                

                <div className="empViewAll-list-wrapper">
                    sample_list                  
                </div>                
            </div>
            <DepartmentInfo deptname={props.deptname}/>
                       
        </div>
     
    )
}
export default EmpListByDeptName;