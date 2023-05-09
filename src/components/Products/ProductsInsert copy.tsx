import React, { useState, useEffect,useRef } from 'react';
import { Button, Form, Input, InputGroup, InputGroupText, 
    ListGroup, ListGroupItem, ListGroupItemHeading, UncontrolledCarousel } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import Swal from "sweetalert2";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import  'slick-carousel/slick/slick-theme.css';
import './arrow_color.css';

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { json } from 'stream/consumers';

const API_URL = 'http://127.0.0.1:8080/products'

const UPLOAD_ENDPOINT = "upload_files";

const ProductsInsert = () =>{
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [ cateList, setCateList ] = useState([]);
    const [ eventList, setEventList ] = useState([]);

    const titleRef = useRef<HTMLInputElement>(null);    
    const retailRef = useRef<HTMLInputElement>(null);
    const saleRef = useRef<HTMLInputElement>(null);
    const cateRef = useRef(null);
    const statusRef = useRef(null);

    const [ startAtRef, setStartAtRef ]  = useState(null);
    const [ endAtRef, setEndAtRef ]  = useState(null);
    const contentRef = useRef("")
    const quantityRef = useRef<HTMLInputElement>(null);
    const eventRef = useRef(null);

    const [ files, setFiles ] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

    const goback = () => {
        navigate(-1);
    }

    const onSubmit = (e) => {
        e.preventDefault();  
            
        if(!isLoading && titleRef.current && contentRef.current && retailRef.current &&
            saleRef.current && cateRef.current && statusRef.current && eventRef.current && startAtRef && 
            endAtRef && quantityRef.current) {
            //debugger;
            console.log("titleRef: ", titleRef.current.value);
            console.log("contentRef: ", contentRef.current);
            console.log("retailRef: ", retailRef.current.value);
            console.log("saleRef: ", saleRef.current.value);
            console.log("cateRef: ", cateRef.current);
            console.log("statusRef: ", statusRef.current);
            console.log("eventRef: ", eventRef.current);
            console.log("startAtRef: ", startAtRef);
            console.log("endAtRef: ", endAtRef);
            console.log("quantityRef: ", quantityRef.current.value);    

            const title = titleRef.current.value;
            const description = contentRef.current;
            const retail = retailRef.current.value;
            const sale = saleRef.current.value;
            const category = cateRef.current;
            const status = statusRef.current;
            const event = eventRef.current;
            const start_at = startAtRef;
            const end_at = endAtRef;
            const quantity = quantityRef.current.value;

            const formData = new FormData();
            if(images && files) {
                formData.append("files", files);
            }
            fetch(`${API_URL}/insert`, {
                method:'POST',
                headers: {
                    "Content-Type": "application/json"                        
                },
                body: JSON.stringify({title, description, retail, sale, category,
                                    status, event, start_at, end_at, quantity})
            })
            .then(res => {
                if(res.ok) {
                   return res.json();
                } else {

                }
            })
            .then(data =>{
                if(images){
                    fetch(`${API_URL}/${data.pid}/fileUp`, {
                        method: 'POST',                                                                                                           
                        body: formData
                    })
                    .then(res =>{
                        if(res.ok){
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: '저장됐습니다.',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            window.location.href=`/products`;
                            setIsLoading(false);                           
                        } else {
                            Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '저장됐습니다.',
                            showConfirmButton: false,
                            timer: 1500
                            })
                        }
                        navigate(`/products`);
                        setIsLoading(false);
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '입력중 에러가 발생했습니다.',
                        showConfirmButton: false,
                        timer: 1500
                        })                    
                    setIsLoading(false);             
                }
            })
            .catch(error =>{
                sweetalert('입력중 에러가 발생했습니다.', error, 'error', '닫기');                
                setIsLoading(false); 
            });
        }
    }
    
    const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
          })
    }

    const handleStartAtChange = (date) => {         
        console.log("start_at: ",date);
        setStartAtRef(date);
    };
    const handleEndAtChange = (date) => {        
        setEndAtRef(date);
    };
    const handleCateChange = (e) =>{
        const cate = e.target.value;
        cateRef.current = cate;
    }
    const handleStatusChange= (e) => {
        const status = e.target.value;
        statusRef.current = status;
    }
    const handelEventChange = (e) => {
        const event = e.target.value;
        eventRef.current = event;
    }

    const handleImageChange = (event) => {
        setImages(Array.from(event.target.files));
        setFiles(event.target.files);
    }

    const ImageSlider = (props) => {        
        const settings = {
            dots: true, // 하단에 페이지 버튼 표시 여부
            infinite: true, // 무한 반복 여부
            speed: 800, // 슬라이드 전환 속도
            slidesToShow: images.length < 4 ? images.length : 4, // 한 번에 표시할 슬라이드 수
            slidesToScroll: images.length < 4 ? images.length : 4, // 한 번에 넘길 슬라이드 수
        };      
        return (
          <Slider {...settings}>
            {props.images.map((image, index) => (
              <div key={index}>
                <img width='120px' height='150px' src={URL.createObjectURL(image)} alt='상품이미지' />                
              </div>
            ))}
          </Slider>
        );
      }
    
    // CkEditor 내용 입력시 변수에 저장
    function handleContentChange(event, editor) {
        const data = editor.getData();
        contentRef.current = data;
        console.log("ckeditor : ", data);
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
                // headers.append("Origin", "http://localhost:3000");
                fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
                    method: "post",
                    body: body
                    // mode: "no-cors"
                })
                    .then((res) => res.json())
                    .then((res) => {
                    console.log("res: ", res);
                    const imgUrl = `${API_URL}/${res.url}`;                  
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
        <div className="products_insert_container">
            <div className="flex-column w-80 m-auto ">
                <div className="flex m-10">
                    <ListGroup className='flex w-100 t-a-c'>
                        <ListGroupItem>
                        <h4>상품 등록</h4>
                        </ListGroupItem>
                    </ListGroup>                                        
                </div>                
                <div className="products_insert_form_wrapper">
                <Form className="flex-colmum w-100" onSubmit={onSubmit}>
                    <ListGroup>
                        
                        <ListGroupItem >
                            
                                 <ListGroupItem>
                                    <InputGroup>
                                        <InputGroupText>상품 제목</InputGroupText>
                                        <Input innerRef={titleRef}></Input>
                                    </InputGroup>
                                </ListGroupItem>                                
                                <br/>                           
                                <div className='products_insert_image_grid'>
                                    <div>   
                                        <InputGroupText>상품이미지를 선택하세요</InputGroupText>                                     
                                        <ListGroupItem>                                            
                                            <Input type='file' accept='image/*' multiple onChange={handleImageChange}/>
                                        </ListGroupItem>                                        
                                    </div>
                                    <div>

                                    </div>
                                    <div> 
                                        {images.length > 0 &&<ImageSlider images={images}/> }
                                    </div> 
                                </div>
                                <br/>
                                <div className='products-description-wrapper'>                                    
                                        <InputGroupText>상품 설명</InputGroupText>
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
                                                console.log( 'Editor is ready to use!', editor );
                                                const n = Array.from( editor.ui.componentFactory.names() );
                                                console.log(n);
                                            
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
                                <br/>
                                <div className="products_insert_grid1">                                   
                                    <div>
                                        <InputGroup>
                                            <InputGroupText>소비자가격</InputGroupText>
                                            <Input type='number' innerRef={retailRef}></Input>
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroupText>판매가격</InputGroupText>
                                            <Input type='number' innerRef={saleRef}></Input>
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroupText>분류</InputGroupText>
                                            <select onChange={handleCateChange}>
                                                <option selected disabled>선택</option>
                                            {cateList.map((item) =>(
                                                <option value={item.name}>
                                                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                                </option>
                                            ))}                                                 
                                            </select>
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroupText>상태</InputGroupText>
                                            <select onChange={handleStatusChange}>
                                                <option selected disabled>선택</option>
                                                <option value='판매대기'>판매대기</option>                                           
                                                <option value='판매중'>판매중</option>
                                                <option value='재고소진'>판매종료</option>
                                                <option value='재고소진'>품절</option>
                                            </select>
                                        </InputGroup>
                                    </div>
                                    <div>                                        
                                    </div>
                                    <div className='flex-column'>
                                       <InputGroup>
                                                <InputGroupText>판매시작일</InputGroupText>
                                                <Input placeholder="아래에서 선택하세요" value={startAtRef && dayjs(startAtRef).format('YYYY/MM/DD a HH:mm') } ></Input>
                                                <DatePicker
                                                    selected={startAtRef} 
                                                    showTimeSelect
                                                    dateFormat="yyyy/MM/dd HH:mm:ss"
                                                    onChange={handleStartAtChange} 
                                                />
                                        </InputGroup>
                                        <InputGroup>                                        
                                                <InputGroupText>판매종료일</InputGroupText>
                                                <Input placeholder="아래에서 선택하세요" value={endAtRef && dayjs(endAtRef).format('YYYY/MM/DD a HH:mm') }></Input>                                                                                    
                                                <DatePicker 
                                                    selected={endAtRef}
                                                    showTimeSelect
                                                    dateFormat="yyyy/MM/dd HH:mm:ss"
                                                    onChange={handleEndAtChange} 
                                                />                               
                                        </InputGroup>                                                                                      
                                    </div>
                                    <div>                                        
                                    </div>
                                    <div>
                                        <InputGroup>
                                          <InputGroupText>수량</InputGroupText>
                                          <Input type='number' innerRef={quantityRef}></Input>
                                        </InputGroup>
                                        <InputGroup>
                                          <InputGroupText>이벤트 등록</InputGroupText>
                                          <select onChange={handelEventChange}>
                                            <option selected disabled>선택</option>
                                            <option value="없음">없음</option>
                                            {eventList.map((item) =>(
                                                <option value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}        

                                          </select>
                                        </InputGroup>                                          
                                    </div>
                                </div>
                                <br/>
                           
                                                
                            
                        </ListGroupItem>
                        <ListGroupItem tag='button' color='success'>
                                    등록하기
                        </ListGroupItem>
                                              
                    </ListGroup>
                    </Form>                     
                </div>
                <div className="flex m-20">
                    <ListGroup className='flex w-100 t-a-c'>                        
                            
                            <ListGroupItem tag='button' color='danger' onClick={goback}>
                                    뒤로가기
                            </ListGroupItem>                                                                    
                    </ListGroup>                                        
                </div>                
            </div>
            
    
        </div>
    )    
}
export default ProductsInsert;