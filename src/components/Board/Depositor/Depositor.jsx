import React, { Component } from 'react';
import { Button } from 'reactstrap';
import BoardNavContainer from '../../../containers/BoardNavContainer';

export default class Board extends Component {
  render() {
    
    return (
      <div className='flex w-100 m-auto p-0'>
        <div className='flex-column w-250px'>
            <BoardNavContainer/>
        </div>
      <div className='w-80'>
        <div className='flex-column w-100 h-auto ovfl-hidden m-10 p-0 z-i-1'>                          
          <div className='flex w-100 m-20 p-0'>
            <h3>
              [ Board_Depositor ]
            </h3>
          </div>
          <div className='flex w-100 m-auto p-0 justify-center'>
              [ Table ]                       
          </div>
          <div className='flex'>
              <Button>작성하기</Button>
          </div>                 
        </div>                  
      </div>            
    </div>   
    )
  }
}
