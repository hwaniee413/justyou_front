import { ListGroup, ListGroupItemHeading, ListGroupItem } from "reactstrap";
import EmpTotalCount from "./EmpTotalCount";

const CompanyInfo = () => {

    return (
        <div className="empViewAll-grid2">
            <div className="empViewAll-grid2-child1">
                <ListGroup>
                    <ListGroupItemHeading className="t-a-c">
                        <span>회사정보</span>
                    </ListGroupItemHeading>
                    <ListGroupItem>
                        <EmpTotalCount/>
                        <p>창립연도: 2021.04.01.</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        
                    </ListGroupItem>
                </ListGroup>                      
            </div>
            <div className="empViewAll-grid2-child2">
                
                <ListGroup>
                    <ListGroupItemHeading className="t-a-c">
                        <p>안내사항</p>
                    </ListGroupItemHeading>   
                    <ListGroupItem>                                         
                        <span style={{fontSize:'14px'}}>각 임직원을 클릭하면 상세정보를 볼 수 있습니다.</span>
                    </ListGroupItem>
                    <ListGroupItem>
                    <span style={{fontSize:'14px'}}>부서별 탭에서 각부서 구성원&업무계획을 확인할 수 있습니다.</span>
                    </ListGroupItem>
                </ListGroup>                                          
            </div>              
        </div>                
    )
}

export default CompanyInfo;