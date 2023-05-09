import React, { useEffect, useState } from 'react'
import { Table, Button } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import NoticeList from './NoticeList';
import BoardNavContainer from '../../../containers/BoardNavContainer';

const Notice = () => {

  const location = useLocation();
  const [pageNum, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchNotice = async () => {
      const response = await fetch('http://127.0.0.1:8080/notice');
      const result = await response.json();
      
      console.log("result: ", result);
    }
    fetchNotice();

    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('pageNum');
    const size = searchParams.get('pageSize');
    setPageNumber(parseInt(page) || 1);
    setPageSize(parseInt(size) || 10);
    console.log("pageNum: ", pageNum);
    console.log("pageSize: ", pageSize);
  }, [location]);

  const urlHandler = (param) => {
    var url = '/board/notice/' + param;
    window.location.href=url;        
  }
  
  return (
    <div className='flex w-100 m-auto p-0'>
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
          
          <NoticeList pageNum={pageNum} pageSize={pageSize}/>               
          
                          
        </div>                  
      </div>            
    </div>            
  )
  
}
export default Notice;