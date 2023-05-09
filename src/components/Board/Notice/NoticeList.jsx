import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Table } from 'reactstrap';
import Swal from 'sweetalert2';

const NoticeList = (props) => {

  const { noticeList, pageDtoRef } = props; // props에서 pageNumber와 pageSize를 받아옵니다.
   
  const [ pageNum, setPageNum ] = useState(pageDtoRef.pageNum);
  const [ pageSize, setPageSize ] = useState(pageDtoRef.pageSize);
  
  
  
    
  
  
  const chgPage = (pageNum, pageSize) => {      
    window.location.href=`/board/notice?pageNum=${pageNum}&pageSize=${pageSize}`;
  };

  //noticeList가 배열인지 아닌지 확인
  const list = Array.isArray(noticeList) ? noticeList : [];

  // 동적으로 페이지 링크 생성하기
  const paginationItems = [];
  for (let i = 1; i <= pageDtoRef.totalPageCount; i++) {
    paginationItems.push(
      <PaginationItem key={i} active={i === pageDtoRef.pageNum}>
        <PaginationLink onClick={() => chgPage(i, pageDtoRef.pageSize)}>
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <>
      <div className='flex w-100 m-auto p-0 justify-center'>
        <Table borderless size="sm" className='f-s-95'>
            {/* 
            <Table dark bordered>
            <Table striped hover>
            <Table borderless size="sm">
            */}
            <thead>
              <tr>                          
                  <th className='w450 t-a-l'>제목</th>
                  <th className='w70 t-a-c'>작성자</th>
                  <th className='w110 t-a-c'>작성일</th>
                  <th className='w60 t-a-c'>조회수</th>
                  
              </tr>
            </thead>
            <tbody>                 
              {list.map(notice => (
                <tr key={notice.nid}>
                  <td className='w450 t-a-l'><Link to={`/board/notice/${notice.nid}`}>{notice.title}</Link></td>
                  <td className='w70 t-a-c'>{notice.adminName}</td>
                  <td className='w110 t-a-c'>{dayjs(notice.udate).format('YY.MM.DD')}</td>
                  <td className='w60 t-a-c'>{notice.lookup}</td>
                  
                </tr>
              ))}  
            </tbody>
        </Table>                               
      </div>  
      <div className='flex justify-center'>
        <Pagination size="sm" aria-label='Page navigation example'>
          <PaginationItem disabled={pageDtoRef.pageNum === 1}>
            <PaginationLink previous onClick={() => chgPage(pageDtoRef.pageNum - 1, pageDtoRef.pageSize)} />
          </PaginationItem>
          {paginationItems}
          <PaginationItem disabled={pageDtoRef.pageNum === pageDtoRef.totalPageCount}>
            <PaginationLink next onClick={() => chgPage(pageDtoRef.pageNum + 1, pageDtoRef.pageSize)} />
          </PaginationItem>
        </Pagination>    
      </div>

      
    </>
  )
}
export default NoticeList;