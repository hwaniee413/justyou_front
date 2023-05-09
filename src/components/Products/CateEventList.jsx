import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input, InputGroup, InputGroupText, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Table } from "reactstrap";
import ProductNav from "./ProductNav";

const API_URL = 'http://127.0.0.1:8080/products'
const CateEventList = () => {


    const [ cateList, setCateList ] = useState([]);
    const [ eventList, setEventList ] = useState([]);

    const [selectedCateItem, setSelectedCateItem] = useState({ id: null, name: "" });
    const [selectedEventItem, setSelectedEventItem] = useState({ id: null, name: "" });

    const [cate, setCate] = useState([
        { id: null, name: "항목 1" },
        { id: null, name: "항목 2" },
        { id: null, name: "항목 3" },
    ]);

    const [event, setEvent] = useState([
        { id: null, name: "항목 1" },
        { id: null, name: "항목 2" },
        { id: null, name: "항목 3" },
    ]);
    useEffect(()=>{
        axios.get(`${API_URL}/getcatelist`)
        .then(response =>            
            setCateList(response.data),
        )     
        .catch((error) => {
            if (axios.isCancel(error)) {
              console.log("API request canceled: ", error.message);
            } else {
              console.log("API request failed: ", error);
              // 에러 처리 로직 추가
            }
        });


        axios.get(`${API_URL}/geteventlist`)
        .then(response =>            
            setEventList(response.data),
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

    const handleCateCheckboxChange = (e, item) => {
        if (e.target.checked) {
            setSelectedCateItem(item);
        } else {
            setSelectedCateItem({ id: "", name: "" });
        }
      };

      const handleEventCheckboxChange = (e, item) => {
        if (e.target.checked) {
            setSelectedEventItem(item);
        } else {
            setSelectedEventItem({ id: "", name: "" });
        }
      };
    
    const handleCateInputChange = (e) => {
        setSelectedCateItem({ ...selectedCateItem, [e.target.name]: e.target.value });
    };
    const handleEventInputChange = (e) => {
        setSelectedEventItem({ ...selectedEventItem, [e.target.name]: e.target.value });
    };

    const handleModifyButtonClick = () => {
        // 수정 버튼 클릭 시 해당하는 항목의 값 수정
        setCate(
          cate.map((item) => {
            if (item.id === selectedCateItem.id) {
              return { ...item, name: selectedCateItem.name };
            }
            return item;
          })
        );
      };

    return(
        <div className="flex w-100 p-0 bg-white justify-between">            
            <ProductNav/> 
            <div className="flex-column w-100 m-0 cate_event_container">
                <div className="cate_event_grid">
                    <div className="cate_container"> 
                        <Form>                    
                            <ListGroupItemHeading color="secondary" className="t-a-c">카테고리 목록</ListGroupItemHeading>                                                                                        
                            <br/>
                            <Table>
                                <tr>
                                <th>번호</th>
                                <th>항목</th>
                                <th>선택</th>
                                </tr>
                            {cateList && cateList.map((item) =>(
                                <tr key={item.id}>
                                    <td> {item.id}</td>
                                    <td> {item.name}</td>
                                    <td><Input type="checkbox"
                                            checked={selectedCateItem.id === item.id}
                                            onChange={(e) => handleCateCheckboxChange(e, item)}
                                        />
                                    </td>                                                                                             
                                </tr>                   
                            ))}    
                            </Table>                                                
                            <ListGroup>
                                <ListGroupItem color="info"className="t-a-c">선택항목 수정/삭제</ListGroupItem>
                                <InputGroup>
                                    <InputGroupText>번호</InputGroupText>
                                    <Input value={selectedCateItem.id} disabled />
                                    <InputGroupText>항목</InputGroupText>
                                    <Input
                                        name="name"
                                        value={selectedCateItem.name}
                                        onChange={handleCateInputChange}
                                        />
                                <Button>수정</Button>
                                </InputGroup>                                                 
                            </ListGroup>                                               
                            <ListGroup>
                                <ListGroupItem color="success" className="t-a-c">새 항목 입력</ListGroupItem>
                                <InputGroup>
                                <InputGroupText>번호</InputGroupText>
                                <Input></Input>
                                <InputGroupText>항목</InputGroupText>
                                <Input></Input>
                                <Button>입력</Button>
                                </InputGroup>
                            </ListGroup>
                            <ListGroup>
                                <ListGroupItem tag="button" type="button" color="danger">선택항목 삭제</ListGroupItem>
                            </ListGroup>                                      
                        </Form>                   
                        
                    </div>
                    
                    <div className="event_container">
                    <Form>                    
                            <ListGroupItemHeading color="secondary" className="t-a-c">이벤트 목록</ListGroupItemHeading>                                                                                        
                            <br/>
                            <Table>
                                <tr>
                                <th>번호</th>
                                <th>항목</th>
                                <th>선택</th>
                                </tr>
                            {eventList && eventList.map((item) =>(
                                <tr key={item.id}>
                                    <td> {item.id}</td>
                                    <td> {item.name}</td>
                                    <td><Input type="checkbox"
                                            checked={selectedEventItem.id === item.id}
                                            onChange={(e) => handleEventCheckboxChange(e, item)}
                                        />
                                    </td>                                                                                             
                                </tr>                   
                            ))}    
                            </Table>                                                
                            <ListGroup>
                                <ListGroupItem color="info"className="t-a-c">선택항목 수정/삭제</ListGroupItem>
                                <InputGroup>
                                    <InputGroupText>번호</InputGroupText>
                                    <Input value={selectedEventItem.id} disabled />
                                    <InputGroupText>항목</InputGroupText>
                                    <Input
                                        name="name"
                                        value={selectedEventItem.name}
                                        onChange={handleEventInputChange}
                                        />
                                <Button>수정</Button>
                                </InputGroup>                                                 
                            </ListGroup>                                               
                            <ListGroup>
                                <ListGroupItem color="success" className="t-a-c">새 항목 입력</ListGroupItem>
                                <InputGroup>
                                <InputGroupText>번호</InputGroupText>
                                <Input></Input>
                                <InputGroupText>항목</InputGroupText>
                                <Input></Input>
                                <Button>입력</Button>
                                </InputGroup>
                            </ListGroup>
                            <ListGroup>
                                <ListGroupItem tag="button" type="button" color="danger">선택항목 삭제</ListGroupItem>
                            </ListGroup>                                      
                        </Form> 
                    </div>
                </div>
            </div>  
        </div>      
    )

}

export default CateEventList;