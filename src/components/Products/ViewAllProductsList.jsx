import {Button, InputGroup, InputGroupText, Input} from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading, Table } from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import ProductNav from './ProductNav';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

const API_URL = 'http://127.0.0.1:8080/products'
const ViewAllProductsList = (props) =>{
    const history = useNavigate();
    const location = useLocation();
    
    const [ productList, setProductList ] = useState([]);
    const [ searchedProductList, setSearchedProductList ] = useState([]);
    const [ pageDto, setPageDto ] = useState({
        pageNum:1,
        pageSize:10,
        totalCount:0,
        totalPageCount:0
    });
    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [ selectedSearchKw, setSelectedSearchKw ] = useState('');
    
    useEffect(()=>{
        axios.get(`${API_URL}/list`)
        .then(response => {
            setProductList(response.data.productList);
            setPageDto(response.data.pageDto);
                    
          })
        .catch((error)=>{
            if (axios.isCancel(error)) {
                console.log("API request canceled: ", error.message);
            } else {
                console.log("API request failed: ", error);
            // 에러 처리 로직 추가
            }
        });
       
        const searchParams = new URLSearchParams(location.search);
        const page = searchParams.get('pageNum');
        const size = searchParams.get('pageSize');
        setPageNum(parseInt(page));
        setPageSize(parseInt(size));
        if (page !=null && size !=null) {
            axios.get(`${API_URL}/list?pageNum=${page}&pageSize=${size}`)
            .then(response => {
                setProductList(response.data.productList);
                setPageDto(response.data.pageDto);
                        
              })
            .catch((error)=>{
                if (axios.isCancel(error)) {
                    console.log("API request canceled: ", error.message);
                } else {
                    console.log("API request failed: ", error);
                // 에러 처리 로직 추가
                }
            });
          }    
    },[location])


    // 리스트 각 행 체크여부 핸들러
    const [checkedItems, setCheckedItems] = useState([]);
    const handleCheckboxChange = (event) => {
        const value = event.target.value;    
        if (event.target.checked) {
          setCheckedItems([...checkedItems, value]);
          //setCheckedItemId(value); // 체크된 아이템 ID를 저장
        } else {
          setCheckedItems(checkedItems.filter((item) => item !== value));
          //setCheckedItemId(null); // 체크가 해제되면 ID를 제거
        }
    };

    // 전체 선택, 해제 핸들러
    const [allChecked, setAllChecked] = useState(false);
    const handleAllorNothingChange = (event) => {
        const checked = event.target.checked;     
        setAllChecked(checked);   
        if (checked) {

            //모두 체크
            const checkboxes = document.getElementsByName('productChk');
            const checkedIds = [];
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
                checkedIds.push(checkboxes[i].value);
            }
            setCheckedItems(checkedIds);
        } else {
            // 모두 해제
            const checkboxes = document.getElementsByName('productChk');
            for (let i = 0; i < checkboxes.length; i++) {
              checkboxes[i].checked = false;
            }
            setCheckedItems([]);
        }        
    };
    

    // 수정버튼 클릭시 체크된 것 개수 확인
    const handleEditButtonClick = () => {
        if (checkedItems.length === 1) {
            const itemId = checkedItems[0];             
            history(`/product/update/${itemId}`)
            // ...
        } else {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: '수정할 항목 1개를 체크해주세요',
                showConfirmButton: false,
                timer: 1500
              })
        }
    };


    // 삭제버튼 클릭시 체크된 것 개수 확인
    const handleDeleteButtonClick = () => {
        if (checkedItems.length === 1) {            
            // 하나의 체크박스만 선택된 경우
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: `선택한 상품을 삭제하시겠습니까?`,
                text: `상품번호: ${checkedItems}`,
                showConfirmButton:true,
                showCancelButton:true,
                confirmButtonColor: 'rgb(253, 102, 102)',
                confirmButtonText:'예',
                cancelButtonColor: 'rgb(102, 102, 255)',
                cancelButtonText:'아니오'
                })
                .then((result)=>{
                    if(result.value){
                        fetch(`${API_URL}/delete?pid=${checkedItems}`,{
                            method:'GET'                            
                        })
                        .then(res => {
                            if(res.ok) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: `삭제되었습니다`,
                                    showConfirmButton:false,
                                    timer:1500
                                })
                                window.location.href='/product/list';
                            }
                        })                        
                    }
                })
                .catch(error =>{
                    sweetalert('삭제 중 에러발생', error, 'error', '닫기');                
                }) 
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: '모두 삭제하시겠습니까?',
                text: `${checkedItems.map(pid => pid+'번')}`,
                showConfirmButton:true,
                showCancelButton:true,
                confirmButtonColor: 'rgb(253, 102, 102)',
                confirmButtonText:'예',
                cancelButtonColor: 'rgb(102, 102, 255)',
                cancelButtonText:'아니오'
              })
              .then((result)=>{
                    if(result.value){
                        Promise.all(
                            checkedItems.map(pid =>
                              fetch(`${API_URL}/delete?pid=${pid}`, {
                                method: 'GET'
                              }).then(res => res.ok)
                            )
                        ).then(results => {
                        const success = results.every(result => result);
                        if (success) {
                            Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '선택한 상품들이 모두 삭제되었습니다',
                            showConfirmButton: false,
                            timer: 1500
                            });
                            window.location.href='/product/list';
                        } else {
                            sweetalert('삭제를 실패했습니다', '', 'error', '닫기');
                        }
                        }).catch(error => {
                        sweetalert('삭제 중 에러발생', error, 'error', '닫기');
                        });  
                    }
              }) 
        }
    };

    const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
          })
    }

    const handleSearchKwChange = (e) => {          
        setSelectedSearchKw(e.target.value);
    }

    const handleSearchInputKeyDown = (e) =>{                
        const kw = e.target.value;       
        if (e.key === 'Enter'){            
            if(selectedSearchKw && kw) {
                axios.get(`${API_URL}/search?${selectedSearchKw}=${kw}`)
                .then(response => {
                    setProductList(response.data.productList);
                    setSearchedProductList(response.data.productList)
                    setPageDto(response.data.pageDto);                    
                })
                .catch(error=>{

                });
                
            } else {
                alert("검색항목, 키워드 모두 입력")
            }
        }           
    }
    const viewAll = () => {
        setSearchedProductList([]);
        
        axios.get(`${API_URL}/list`)
        .then(response => {
            setProductList(response.data.productList);
            setPageDto(response.data.pageDto);
                    
          })
        .catch((error)=>{
            if (axios.isCancel(error)) {
                console.log("API request canceled: ", error.message);
            } else {
                console.log("API request failed: ", error);
            // 에러 처리 로직 추가
            }
        });
        
    }
    

    const paginationItems = [];
    for (let i = 1; i <= pageDto.totalPageCount; i++) {
      paginationItems.push(
        <PaginationItem key={i} active={i === pageDto.pageNum}>
          <PaginationLink onClick={() => chgPage(i, pageDto.pageSize)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    const chgPage = (pageNum, pageSize) => {      
        history(`/product/list?pageNum=${pageNum}&pageSize=${pageSize}`);
    };

    // 상품의 상태에 따른 글자색 변경 
    const statusColors = {
        '판매대기': 'blue',
        '판매중': 'red',
        '품절': 'purple',
        '판매종료': 'black'
      };
    return (
        <div className="flex w-100 p-0 bg-white justify-between">            
            <ProductNav/>       
            <div className="flex-column w-100">    
                 <ListGroup>
                    <ListGroupItem>
                        <ListGroupItemHeading>검색</ListGroupItemHeading>
                        <InputGroup>
                        <select onChange={handleSearchKwChange}>
                            <option selected disabled >검색항목</option>
                            <option value='title'>제목</option>
                            <option value='category'>분류</option>
                            <option value='status'>상태</option>
                            <option value='event'>행사</option>
                        </select>                           
                            <Input onKeyDown={handleSearchInputKeyDown}
                                
                            ></Input>
                        </InputGroup>
                    </ListGroupItem>                
                </ListGroup>        
                <ListGroup>            
                    <ListGroupItem>
                        { searchedProductList.length>0 && <Button onClick={viewAll}>전체보기</Button>
                        }
                        <>&nbsp;&nbsp;</>                    
                        <Button color='info' onClick={e => history('/product/insert')}>상품 등록</Button>
                        &nbsp;&nbsp;
                        <Button color='warning' onClick={handleEditButtonClick}>상품 보기/수정</Button>
                        &nbsp;&nbsp;
                        <Button color='danger' onClick={handleDeleteButtonClick}>상품 삭제</Button>
                    </ListGroupItem>
                </ListGroup>                       
                <ListGroup>
                    <ListGroupItem>
                        <Table className='f-s-default'>
                            <thead >
                                <tr>
                                    <th className='p-w70'>
                                    <input type='checkbox' onChange={handleAllorNothingChange}/>
                                    </th>                                
                                    <th className='p-w70'>상품번호</th>
                                    <th className='p-w120'>대표이미지</th>
                                    <th>제목</th>
                                    <th className='p-w90'>소비자가</th>
                                    <th className='p-w90'>판매가</th>
                                    <th className='p-w70'>분류</th>
                                    <th className='p-w70'>상태</th>
                                    <th className='p-w100'>행사</th>
                                    <th className='p-w70'>재고</th>
                                    <th className='p-w80'>업데이트</th>
                                    <th className='p-w80'>판매시작일</th>
                                    <th className='p-w80'>판매종료일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList && productList.map((item)=>(                                                                                                
                                    <tr key={item.pid}>
                                        <td>
                                            <input 
                                                type='checkbox'
                                                value={item.pid}
                                                name='productChk'                                                                                                
                                                onChange={handleCheckboxChange}
                                            />
                                        </td>
                                        <td>{item.pid}</td>
                                        <td>
                                            <img width='60px' height='60px' src={`${API_URL}/getfirstfile?pid=${item.pid}`} alt='대표이미지'/>
                                        </td>
                                        <td>                                            
                                            {item.title.length > 20 ? item.title.substring(0, 10) + '...' : item.title}                                            
                                        </td>
                                        <td>{item.retail}</td>
                                        <td>{item.sale}</td>
                                        <td>{item.category}</td>
                                        <td style={{color: statusColors[item.status]}}>{item.status}</td>
                                        <td>{item.event}</td>
                                        <td>{item.quantity}</td>
                                        <td className="date">{dayjs(item.udate).format('YY.MM.DD\nHH:mm')}</td>
                                        <td className="date">{dayjs(item.start_at).format('YY.MM.DD\nHH:mm')}</td>
                                        <td className="date">{dayjs(item.end_at).format('YY.MM.DD\nHH:mm')}</td>
                                    </tr>
                                    
                                ))}
                            </tbody>
                        </Table>
                        <div className='flex justify-center'>
                            <Pagination size="sm" aria-label='Page navigation example'>
                            <PaginationItem disabled={pageDto.pageNum === 1}>
                                <PaginationLink previous onClick={() => chgPage(pageDto.pageNum - 1, pageDto.pageSize)} />
                            </PaginationItem>
                            {paginationItems}
                            <PaginationItem disabled={pageDto.pageNum === pageDto.totalPageCount}>
                                <PaginationLink next onClick={() => chgPage(pageDto.pageNum + 1, pageDto.pageSize)} />
                            </PaginationItem>
                            </Pagination>    
                        </div>
                    </ListGroupItem>
                </ListGroup>                       
            </div>
        </div>
        
    )


}
export default ViewAllProductsList;