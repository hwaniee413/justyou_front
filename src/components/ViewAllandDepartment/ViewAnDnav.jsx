import { useEffect, useState } from "react";
import { Button, UncontrolledCollapse, Card, CardBody,
        ListGroup, ListGroupItem} from "reactstrap";

const API_URL = 'http://127.0.0.1:8080/dept';
const ViewAnDnav = (props) => {

    const [ dept, setDept ] = useState([]);

    useEffect(() => {
        const fetchDept = async ()=> {
            const response = await fetch(`${API_URL}/list`);
            const dept = await response.json();
            console.log("dept: ", dept);            
            setDept(dept);
        };  
        fetchDept();
    }, []);

    

    return(
        <div className="w-250px">
            <div className="w-80">
                <ListGroup>
                    <ListGroupItem tag="button" onClick={
                        e => props.buttonClick("listAll")
                        }>
                        전체보기
                    </ListGroupItem>
                    <ListGroupItem tag="button" id="dept">
                        부서별보기
                        <UncontrolledCollapse toggler="#dept">
                            <Card className="w-100">
                            {dept.map((item) => (
                                <CardBody onClick={
                                    e => props.buttonClick(`${item.deptname}`)
                                    }>
                                    <div>{item.deptname}</div>
                                </CardBody>
                            ))}
                            </Card>
                        </UncontrolledCollapse>
                    </ListGroupItem>                    
                </ListGroup>
            </div>
        </div>
    )
}

export default ViewAnDnav;