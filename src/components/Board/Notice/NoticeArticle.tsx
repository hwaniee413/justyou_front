import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, InputGroup, InputGroupText } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import BoardNavContainer from '../../../containers/BoardNavContainer';


//sweetalert2
import Swal from "sweetalert2";

//ckeditor
import { CKEditor as UpdateEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
//import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
const API_URL = 'http://127.0.0.1:8080';
const UPLOAD_ENDPOINT = 'upload_files';

const NoticeArticle = (props) => {
    const [ nidRef, setNidRef ] = useState('');
    const [ titleRef, setTitleRef ] = useState('');
    const contentRef = useRef<string>("");
    const [ adminnumRef, setAdminNumRef ] = useState('');
    const [ adminNameRef, setAdminNameRef ] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();

    
    const [notice, setNotice] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchNotice = async () => {
        const response = await fetch(`http://127.0.0.1:8080/notice/${id}`);
        const notice = await response.json();
        
        setNotice(notice);
        setNidRef(notice.nid);
        setTitleRef(notice.title);
        setAdminNumRef(notice.adminNum);
        setAdminNameRef(notice.adminName);
        };
        fetchNotice();
    }, [id]);

    const urlHandler = (id, param) => {
        const url = `/board/notice/${id}/`+param
        history(url);
    }

    
  
  

    const delNotice = (nid) => {
        return fetch(`${API_URL}/notice/del/${nid}`, {
        method: 'DELETE',
        }).then((res) => {
        console.log(res);
        if (res.ok) {
            Swal.fire({
            position: 'center',
            icon: 'success',
            title: '삭제됐습니다.',
            showConfirmButton: false,
            timer: 1500,
            });
        } else {
            throw new Error('Failed to delete notice.');
        }
        });
    };

    const handleDeleteNotice = (notice) => {
        Swal.fire({
          title: '정말 삭제하시겠습니까?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#4B088A',
          cancelButtonColor: '#01DF01',
          confirmButtonText: '예',
          cancelButtonText: '아니오',
        }).then((result) => {
          if (result.value) {
            delNotice(notice.nid)
              .then((data) => {
                history('/board/notice')
            
              })   
              .catch((err) => {
                console.error(err);
                Swal.fire({
                  icon: 'error',
                  title: '삭제 실패',
                  text: '공지사항 삭제 중 오류가 발생했습니다.',
                });
              });
          }
        });
      };


    return (
        <div className='flex w-100 m-auto p-0 h-auto ovfl-hidden'>
            <div className='flex-column w-250px'>
                <BoardNavContainer/>
            </div>
            <div className='w-80'>
                <div className='flex-column w-100 h-auto ovfl-hidden m-10 p-0 z-i-1'>
                <div className='flex w-100 m-20 p-0'>
                    <h3>[ 공지사항 상세 게시글 ]</h3>
                </div>
                
                <div className='flex-column w-100 m-auto p-0 justify-center h-auto ovfl-hidden'>
                    
                        <div className='w-100'>
                            <div style={{float:'right', margin:'10px'}}>
                                <Button color='warning' type='button' onClick={e => {
                                    history('/board/notice');
                                }}>목록으로</Button>
                                {props.username.sub==adminNameRef? 
                                    <Button color='primary' onClick={e => urlHandler(nidRef ,'update')}>
                                        수정
                                        </Button> : null}
                                {props.username.sub==adminNameRef? 
                                    <Button color='danger' onClick={() => handleDeleteNotice(notice)}>
                                        삭제
                                        </Button> : null}
                            </div>
                        </div>                        
                        <InputGroup className="w-100">
                            <InputGroupText>게시글 제목</InputGroupText>
                            <Input className="bg-white" value={titleRef}  disabled/>
                        </InputGroup>
                        <div className='w-100 h-auto ovfl-hidden'>
                            <div className='m-10' dangerouslySetInnerHTML={{ __html: notice.content }} />                                                                    
                        </div>
                        
                    
                </div>
                
                </div>
            </div>
        </div>
    );
};

export default NoticeArticle;