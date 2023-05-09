import React from "react";
import { Routes, Route } from 'react-router-dom';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
//Board - components
import BoardContainer from '../../containers/BoardContainer';
import Notice from '../Board/Notice/Notice';
import Depositor from '../Board/Depositor/Depositor';
import NoticeWrite from '../Board/Notice/Write.tsx';
import NoticeArticle from '../Board/Notice/NoticeArticle.tsx';

const AdminApp = () => {


    return (
        <React.Fragment>
            <Header/>
            <Routes>
                
                {/* 게시판 관리 */}
                <Route exact path='/admin/board' element={<BoardContainer/>}/>
                <Route exact path='/admin/board/depositor' element={<Depositor/>}/>
                <Route exact path='/admin/board/notice' element={<Notice/>}/>
                
                <Route exact path='/admin/board/notice/write' element={<NoticeWrite/>}/>          
                <Route exact path='/admin/board/notice/:id' element={<NoticeArticle/>}/>
          </Routes>
          <Footer/>
        </React.Fragment>
    )
}

export default AdminApp;