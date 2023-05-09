import { useEffect, useState } from "react";
import { Button, UncontrolledCollapse, Card, CardBody,
        ListGroup, ListGroupItem} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8080/products'
const ProductNav = (props) => {

    const [ cate, setCate ] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${API_URL}/getcatelist`)
        .then(response =>            
            setCate(response.data),
        )     
        .catch((error) => {
            if (axios.isCancel(error)) {
              console.log("API request canceled: ", error.message);
            } else {
              console.log("API request failed: ", error);
              // 에러 처리 로직 추가
            }
        });
    }, [])

    

    return(
        <div className="w-250px">
            <div className="w-80">
                <ListGroup>
                    <ListGroupItem tag="button" onClick={
                        e => navigate('/product/list')
                        }>
                        상품리스트
                    </ListGroupItem>                   
                    <ListGroupItem tag="button" onClick={
                        e => navigate('/product/cate_event')
                        }>
                        카테고리 / 이벤트 
                    </ListGroupItem>                                          
                </ListGroup>
            </div>
        </div>
    )
}

export default ProductNav;