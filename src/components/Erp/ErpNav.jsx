import { useEffect, useState } from "react";
import { Button, UncontrolledCollapse, Card, CardBody,
        ListGroup, ListGroupItem} from "reactstrap";



const ErdNav = (props) => {


    return(
        <div className="w-250px">
            <div className="w-80">
                <ListGroup>                    
                    <ListGroupItem tag="button" id="emp">
                        인사관리
                        <UncontrolledCollapse toggler="#emp">
                            <Card className="w-100">
                                <CardBody onClick={
                                    e => props.buttonClick(`사원검색`)
                                    }>
                                    사원검색
                                </CardBody>
                                <CardBody onClick={
                                    e => props.buttonClick(`사원입력`)
                                    }>
                                    사원입력
                                </CardBody>
                            </Card>
                        </UncontrolledCollapse>   
                    </ListGroupItem>
                    </ListGroup>

            </div>
        </div>
    )
}

export default ErdNav;