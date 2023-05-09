import React, { useEffect, useState, useRef } from 'react'
import { Table, Button } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import NoticeList from './NoticeList';
import BoardNavContainer from '../../../containers/BoardNavContainer';
import Swal from 'sweetalert2';

const Notice = (props) => {

  const location = useLocation();
  const history = useNavigate();
  const [ noticeList,  setNoticeList ] = useState([]);
  const pageDtoRef = useRef({
    pageNum:1,
    pageSize:10,
    totalCount:0,
    totalPageCount:0
  });
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if(props.empdeptname.sub!=='고객관리부') {
      Swal.fire({
          text: '상품관리부만 접속할 수 있습니다.',
          icon: 'info',
          showConfirmButton: false,
          timer:2000
      })
      history('/');
    }        
    const fetchNotice = async () => {
      const response = await fetch('http://127.0.0.1:8080/notice');
      const result = await response.json();
      setNoticeList(result.noticeList);
      pageDtoRef.current = result.pageDto; // pageDtoRef의 값을 변경
    }
    fetchNotice();

    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('pageNum');
    const size = searchParams.get('pageSize');
    console.log("#page: ", page, ", #size: ", size);
    setPageNum(parseInt(page));
    setPageSize(parseInt(size));
    if (page !=null && size !=null) {
      const fetchNoticeWithPaging = async () => {
        const response = await fetch(`http://127.0.0.1:8080/notice?pageNum=${page}&pageSize=${size}`);
        const result = await response.json();
        setNoticeList(result.noticeList);
        pageDtoRef.current = result.pageDto; // pageDtoRef의 값을 변경
      }
      fetchNoticeWithPaging();
    }    
    
  }, [location]);

  const urlHandler = (param) => {
    var url = '/board/notice/' + param;
    window.location.href=url;        
  }
  
  return (
    <div className='flex w-100 m-auto p-0 h-auto ovfl-hidden'>
      <div className='flex-column w-250px'>
          <BoardNavContainer/>
      </div>
      <div className='w-80'>
        <div className='flex-column w-100 h-auto ovfl-hidden m-10 p-0 z-i-1'>                          
          <div className='flex w-100 m-20 p-0 justify-center'>
            <h3>
              [ 공지사항 ]
            </h3>
          </div>
          <div className='w-100'>
            <div style={{float:'right', margin:'10px'}}>
              <Button color='success' onClick={e => urlHandler("write")}>작성하기</Button>
            </div>               
          </div>
          <NoticeList noticeList={noticeList} pageDtoRef={pageDtoRef.current}/>             
        </div>                  
      </div>            
    </div>            
  )
  
}
export default Notice;