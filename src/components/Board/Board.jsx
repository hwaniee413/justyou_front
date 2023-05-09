import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BoardNavContainer from '../../containers/BoardNavContainer'

import Notice from './Notice/Notice';
import Depositor from './Depositor/Depositor';
import Review from './Review/Review';
import BoardAll from './BoardAll';
import Swal from 'sweetalert2';



const Board = (props) => {
    const history = useNavigate();

    useEffect(() => {
        console.log("Board props: ", props)
        if(props.empdeptname.sub!=='고객관리부') {
          Swal.fire({
              text: '고객관리부만 접속할 수 있습니다.',
              icon: 'info',
              showConfirmButton: false,
              timer:2000
          })
          history('/');
        }   
    }, []);
    
    return (
        <div className='flex w-100 m-auto p-0'>
            <div className='flex-column w-250px'>
                <BoardNavContainer/>
            </div>
            <div className='w-80'>
                <h1>Board_All</h1>
            </div>
        
        </div>
    )
    
}
export default Board;