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
        console.log("update id: ", id);
        const fetchNotice = async () => {
            const response = await fetch(`http://127.0.0.1:8080/notice/${id}`);
            const notice = await response.json();
            console.log("NoticeArticle notice: ",notice);
            console.log("NoticeArticle notice: ",props.username.sub);
            setNotice(notice);
            setNidRef(notice.nid);
            setTitleRef(notice.title);
            setAdminNumRef(notice.adminNum);
            setAdminNameRef(notice.adminName);
        };
        fetchNotice();
    }, [id]);

    const handleTitleChange = (e) => {
        setTitleRef(e.target.value);
        
    }

    const handleContentChange = (event, editor) => {
        const data = editor.getData();
        contentRef.current = data;        
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(!isLoading && titleRef && contentRef.current ) {
            setIsLoading(true);

            const nid = nidRef;
            const title = titleRef;
            const content = contentRef.current;
            const adminNum = adminnumRef;
                     
            
            fetch(`http://127.0.0.1:8080/notice/update/${id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({nid, title, content, adminNum}),
            })
            .then(res => {
                if(res.ok) {
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: '수정됐습니다.',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    history(`/board/notice`);
                    setIsLoading(false);
                }
            });
                
        }

    }
    //CkEditor 파일 업로드 처리 함수 부분
    function uploadAdapter(loader) {
        return {
          upload: () => {
            return new Promise((resolve, reject) => {
              const body = new FormData();
              loader.file.then((file) => {
                console.log("file: ", file);
                body.append("file", file);
                // let headers = new Headers();
                // headers.a    ppend("Origin", "http://localhost:3000");
                fetch(`${API_URL}/notice/${UPLOAD_ENDPOINT}`, {
                  method: "post",
                  body: body
                  // mode: "no-cors"
                })
                  .then((res) => res.json())
                  .then((res) => {
                    console.log("res: ", res);
                    const imgUrl = `${API_URL}/notice/${res.url}`;                  
                    resolve({
                      default: imgUrl
                    });
                  })
                  .catch((err) => {
                    reject(err);
                  });
              });
            });
          }
        };
      }
      function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
          return uploadAdapter(loader);
        };
      }

    return (
        <div className='flex w-100 m-auto p-0 h-auto ovfl-hidden'>
            <div className='flex-column w-250px'>
                <BoardNavContainer/>
            </div>
            <div className='w-80'>
                <div className='flex-column w-100 h-auto ovfl-hidden m-10 p-0 z-i-1'>
                <div className='flex w-100 m-20 p-0'>
                    <h3>[ 공지사항 게시글 수정하기 ]</h3>
                </div>
                
                <div className='flex-column w-100 m-auto p-0 justify-center h-auto ovfl-hidden'>
                    <form onSubmit={onSubmit} className="w-100"> 
                        <div className='w-100'>
                            <div style={{float:'right', margin:'10px'}}>
                                <Button color='info' type='button' onClick={e => {
                                    history('/board/notice');
                                }}>목록으로</Button>
                                <Button color='danger'>저장하기</Button>
                            </div>
                        </div>                        
                        <InputGroup className="w-100">
                            <InputGroupText>게시글 제목</InputGroupText>
                            <Input className="bg-white" value={titleRef}  onChange={handleTitleChange}/>
                        </InputGroup>
                        <div className='w-100 h-auto ovfl-hidden'>                            
                            <UpdateEditor
                                editor={ ClassicEditor }
                                data={notice.content}
                                config={{
                            
                                    extraPlugins: [ uploadPlugin ],
                                    
                                  }}
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );
                                } }
                                onChange={ handleContentChange }
                                onBlur={ ( event, editor ) => {
                                    console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                    console.log( 'Focus.', editor );
                                } }            
                            />
                            
                        </div>
                        
                    </form>                
                </div>
                
                </div>
            </div>
        </div>
    );
};

export default NoticeArticle;