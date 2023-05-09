import React, { useRef, useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { useNavigate } from "react-router-dom";


//sweetalert2
import Swal from "sweetalert2";

//ckeditor
//import CKEditor from '../../../ckeditor5/src/ckeditor';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { ImageResize } from '@ckeditor/ckeditor5-image';


const API_URL = 'http://127.0.0.1:8080';
const UPLOAD_ENDPOINT = "upload_files";



const Write = (props) => {    
    const titleRef = useRef<HTMLInputElement>(null);    
    const contentRef = useRef("")
    const adminnumRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();

    const [admin, setAdmin] = useState({});
    const id = props.empnumber.sub;

    useEffect(() => {
      
        const fetchNotice = async () => {
          const response = await fetch(`${API_URL}/admin/${id}`);
          const admin = await response.json();
      
          setAdmin(admin);
        };
        fetchNotice();
    }, [id]);

    const onSubmit = (e) => {      
        e.preventDefault();      
        if(!isLoading && titleRef.current && contentRef.current ) {
            setIsLoading(true);

            const title = titleRef.current.value;
            const content = contentRef.current;
                          // http://127.0.0.1:8080/notice/create  
            fetch(`${API_URL}/notice/create`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({title, content, admin}),
            })
            .then(res => {
                if(res.ok) {
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: '저장됐습니다.',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    history(`/board/notice`);
                    setIsLoading(false);
                }
            });
                
        }

    }

    // CkEditor 내용 입력시 변수에 저장
    function handleContentChange(event, editor) {
      const data = editor.getData();
      contentRef.current = data;
      
    }

    //CkEditor 파일 업로드 처리 함수 부분
    function uploadAdapter(loader) {
      return {
        upload: () => {
          return new Promise((resolve, reject) => {
            const body = new FormData();
            loader.file.then((file) => {
              
              body.append("file", file);
              // let headers = new Headers();
              // headers.append("Origin", "http://localhost:3000");
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
      <section>
        <div className='flex-column w-100 h-auto ovfl-hidden m-10 p-0 z-i-1'>                          
          <div className='flex w-70 m-20 p-0 justify-center'>
            <h3>
              [ 공지사항 게시글 쓰기 ]
            </h3>
          </div>
          <div className='flex w-70 m-auto p-0 justify-center h-auto ovfl-hidden'>
            <form onSubmit={onSubmit} className="w-100">
                <div className='w-100'>
                        <div style={{float:'right', margin:'10px'}}>
                            <Button color='danger'>작성완료</Button>
                        </div>
                    </div>           
                <input type="hidden" ref={adminnumRef} value="1"/>
                <InputGroup className="w-100">
                  <InputGroupText>게시글 제목</InputGroupText>
                  <Input innerRef={titleRef}/>
                </InputGroup>    
                             
                <div className='w-100 h-auto ovfl-hidden' style={{minHeight:'600px'}}>                 
                      <CKEditor
                            editor={ ClassicEditor }
                            data=""
                            config={{
                              
                              extraPlugins: [ uploadPlugin ],                              
                              toolbar: {
                                items: [
                                  'selectAll',
                                  '|', 'heading', 
                                  '|', 'bold', 'italic', 'link', 
                                  '|', 'fontFamily', 'fontSize', 'fontColor', 'highlight',
                                  '|', 'bulletedList', 'numberedList', 'outdent', 'indent',
                                  '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed',
                                  '|', 'undo', 'redo'
                                ],
                                shouldNotGroupWhenFull: false
                              },                            
                                                        
                              image: {                               

                                // Configure the available image resize options.
                                resizeOptions: [
                                  {
                                    name: 'resizeImage:original',
                                    label: 'Original',
                                    value: null
                                  },
                                  {
                                    name: 'resizeImage:25',
                                    value: '25',
                                    icon: 'small'
                                  },
                                  {
                                    name: 'resizeImage:50',
                                    label: '50%',
                                    value: '50'
                                  },
                                  {
                                    name: 'resizeImage:75',
                                    label: '75%',
                                    value: '75'
                                  }
                                ],                               
                                toolbar: [
                                  'resizeImage:25', 'resizeImage:50', 'resizeImage:75', 
                                  '|',
                                  'resizeImage:original', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                                  '|',
                                  'resizeImage',
                                  '|',
                                  'imageTextAlternative',
                                  'toggleImageCaption',
                                  'imageStyle:inline',
                                  'imageStyle:block',
                                  'imageStyle:side',                                
                                ]
                              },
                              table: {
                                contentToolbar: [
                                  'tableColumn',
                                  'tableRow',
                                  'mergeTableCells'
                                ]
                              },
                              // fontFamily 추가
                              fontFamily: {
                                options: [
                                  'default',
                                  'Arial, Helvetica, sans-serif',
                                  'Courier New, Courier, monospace',
                                  'Georgia, serif',
                                  'Lucida Sans Unicode, Lucida Grande, sans-serif',
                                  'Tahoma, Geneva, sans-serif',
                                  'Times New Roman, Times, serif',
                                  'Trebuchet MS, Helvetica, sans-serif',
                                  'Verdana, Geneva, sans-serif'
                                ],
                                supportAllValues: true
                              },                            
                              // fontSize 추가
                              fontSize: {
                                  options: [
                                      'default',
                                      9,
                                      11,
                                      12,
                                      14,
                                      16,
                                      18,
                                      20,
                                      22,
                                      24,
                                      26,
                                      28,
                                      36
                                  ],
                                  supportAllValues: true
                              },                          
                              // highlight 추가
                              highlight: {
                                options: [
                                    { model: 'greenMarker', class: 'marker-green', title: 'Green marker' },
                                    { model: 'pinkMarker', class: 'marker-pink', title: 'Pink marker' },
                                    { model: 'yellowMarker', class: 'marker-yellow', title: 'Yellow marker' },
                                    { model: 'blueMarker', class: 'marker-blue', title: 'Blue marker' },
                                    { model: 'redPen', class: 'pen-red', title: 'Red pen' },
                                    { model: 'greenPen', class: 'pen-green', title: 'Green pen' }
                                ]
                              },  
                              
                              
                            }}
                            
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                
                                const n = Array.from( editor.ui.componentFactory.names() );
                                
                               
                            } }
                            onChange={ handleContentChange }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }            
                        />
                     <InputGroup className="w-100">                  
                        <Input type="file"/>
                      </InputGroup> 
                </div>                                                            
                
            </form>                       
          </div>
                   
        </div>
      </section>
    )
  
}

export default Write;