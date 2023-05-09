

import { ListGroup, Breadcrumb, BreadcrumbItem, ListGroupItem, ListGroupItemHeading } from "reactstrap";


import EmpCeo from "./EmpCeo";
import EmpManagingDirector from "./EmpManagingDirector";
import EmpDepartmentManager from "./EmpDepartmentManager";
import EmpManager from "./EmpManager";
import EmpAssistantManager from "./EmpAssistantManager";
import EmpStaff from "./EmpStaff";

import CompanyInfo from "./CompanyInfo";

const EmpListAll = () => {
        
    return (
        <div className="empViewAllContainer">
            <div className="empViewAll-grid1">
                <div id="top"></div>
                <div className="empViewAll-title-wrapper" >
                    <b>[ 전체 임직원 ] </b>
                </div>
                <div className="empViewAll-nav-wrapper">
                    <Breadcrumb tag='nav' listTag="div">
                        <BreadcrumbItem tag="a" href="#ceo">CEO</BreadcrumbItem>
                        <BreadcrumbItem tag="a" href="#md">이사</BreadcrumbItem>
                        <BreadcrumbItem tag="a" href="#dm">부장</BreadcrumbItem>
                        <BreadcrumbItem tag="a" href="#manager">과장</BreadcrumbItem>
                        <BreadcrumbItem tag="a" href="#am">대리</BreadcrumbItem>
                        <BreadcrumbItem tag="a" href="#staff">사원</BreadcrumbItem>
                    </Breadcrumb>
                </div>
               
                <div className="empViewAll-list-wrapper">
                    <ListGroup id="ceo">                                                
                        <EmpCeo/>                                                
                    </ListGroup>                    
                </div>
                <div className="empViewAll-list-wrapper">
                    <ListGroup id="md">                                                
                        <EmpManagingDirector/>                                                
                    </ListGroup>                                                
                </div>
                <div className="empViewAll-list-wrapper">
                    <ListGroup id="dm">                                                
                        <EmpDepartmentManager/>                                                
                    </ListGroup>                                                
                </div>
                <div className="empViewAll-list-wrapper">
                    <ListGroup id="manager">                                                
                        <EmpManager/>                                                
                    </ListGroup>                                                
                </div>
                <div className="empViewAll-list-wrapper">
                    <ListGroup id="am">                                                
                        <EmpAssistantManager/>                                                
                    </ListGroup>                                                
                </div>
                <div className="empViewAll-list-wrapper">
                    <ListGroup id="staff">                                                
                        <EmpStaff/>                                                
                    </ListGroup>                                                
                </div>
            </div>
            <CompanyInfo/>
                       
        </div>
    )
}
export default EmpListAll;