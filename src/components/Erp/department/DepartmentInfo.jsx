import { ListGroup, ListGroupItemHeading, ListGroupItem } from "reactstrap";
import DepartmentCount from "./DepartmentCount";

const DepartmentInfo = (props) => {

    return (
        <div className="empViewAll-grid2">
            <div className="empViewAll-grid2-child1">
                <ListGroup>
                    <ListGroupItemHeading className="t-a-c">
                        <span>부서정보</span>
                    </ListGroupItemHeading>
                    <ListGroupItem>
                        <DepartmentCount deptname={props.deptname}/>                        
                    </ListGroupItem>
                    <ListGroupItem>                        
                    </ListGroupItem>
                </ListGroup>                      
            </div>          
        </div> 
    )
}

export default DepartmentInfo;