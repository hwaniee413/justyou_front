import React, { useState, useEffect} from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane,
        InputGroup, InputGroupText, Input, Table, UncontrolledPopover, PopoverHeader, PopoverBody, Button } from "reactstrap";
import Calendar from "react-calendar";
import { format } from "date-fns";
import dayjs from 'dayjs';
import moment from 'moment'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = 'http://127.0.0.1:8080/emp';

const CalendarApp = (props) => {
  const [ date, setDate ] = useState(new Date());
  const [ modal, setModal ] = useState(false);
  const [ tabid, setTabId ] = useState('check');
  const [dueDate, setDueDate] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ scheduleBySelectedDate, setScheduleBySelectedDate] = useState([]);
  const [ schedule, setSchedule ] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  const [view, setView] = useState("month");

  // props.deptname이 변경될 때마다 해당 부서 이름으로 API를 호출하고 
  // 해당 부서에 대한 스케줄을 가져와 schedule 상태를 업데이트
  useEffect(() => {
    const fetchSchedule = async ()=> {
          const response = await fetch(`${API_URL}/schedule?deptname=${props.deptname}`);
          const schedule = await response.json();                     
          setSchedule(schedule);
      };  
      fetchSchedule();
    }, [props.deptname]); 
  
  //selectedDate나 schedule이 변경될 때마다 호출
  //schedule에서 selectedDate와 일치하는 항목을 필터링하고, 
  //해당 결과를 scheduleBySelectedDate 상태로 업데이트
  useEffect(() => {
    const filteredSchedule = schedule.filter(
      (item) =>
        item.start_at &&
        new Date(item.start_at).getDate() === selectedDate.getDate() &&
        new Date(item.start_at).getMonth() === selectedDate.getMonth() &&
        new Date(item.start_at).getFullYear() === selectedDate.getFullYear()
    );
    setScheduleBySelectedDate(filteredSchedule);
  }, [selectedDate, schedule]);

   const toggle = () => {
    setModal(!modal);
    setDueDate(null);
  }
  const handleClickDay = (value) => {                      
    setSelectedDate(value);     
    toggle();
  };
  const tabtoggle = (param) =>{
    setTabId(param);
  }
  const handleDueDateChange = (date) => {
    setDueDate(date);    
  };
  const handleCheckboxClick = (itemId) => {
    if (checkedItems.includes(itemId)) {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    } else {
      setCheckedItems([...checkedItems, itemId]);
    }
    console.log("checkedItems: ", checkedItems);
  };
  
  const modalTitle = `${format(selectedDate, "yyyy년 MM월 dd일")} - 업무일정`;
  return (
    <div className="flex justify-center">
      <Calendar
        formatDay={(locale, date) => moment(date).format("DD")}
        onChange={setDate}
        value={date}
        onClickDay={handleClickDay}
        onViewChange={(newView) =>  setView(newView)}
        views={["month", "week", "day"]}
        tileContent={({ date }) => {
          const formattedDate = moment(date).format("YYYY/MM/DD");          
          const hasSchedule = schedule.some(
            (item) => {          
              return item.start_at &&
              moment(item.start_at).format("YYYY/MM/DD") === formattedDate
            }
              
          );
          if (hasSchedule) {
            return (
              <>
                <div className="flex justify-center items-center">
                  <div className="dot"></div>
                </div>
              </>
            );
          } else {
            return null;
          }
        }}
      />
      <Modal isOpen={modal} fade={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink onClick={()=>{tabtoggle("check")}}>확인</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={()=>{tabtoggle("insert")}}>입력</NavLink>              
            </NavItem> 
            <NavItem>
              <NavLink onClick={()=>{tabtoggle("update")}}>수정</NavLink>              
            </NavItem>             
          </Nav>
          <TabContent activeTab={tabid}>
            <TabPane tabId='check'>              
              <Table className="t-a-c t-s-small">
                <tr>
                  <th></th>
                  <th className="schedule_head_row schedule_w100">업무이름</th>
                  <th className="schedule_head_row schedule_w100">업무내용</th>
                  <th className="schedule_head_row schedule_w100">업무상태</th>                  
                  <th className="schedule_head_row schedule_w100">등록일</th>                  
                  <th className="schedule_head_row schedule_w100">완료예정일</th>                   
                </tr>
                {scheduleBySelectedDate.map((item) => (
                  <tr key={item.id} className="schedule_data_row">
                    <td><input type="checkbox" onClick={() => handleCheckboxClick(item.id)}></input></td>
                    <td className="">{item.title}</td>
                    <td className="">{item.content}</td>                               
                    <td className="">{item.status}</td>
                    <td className="">{dayjs(item.start_at).format('YYYY.MM.DD')}</td>
                    <td className="">{dayjs(item.deadline).format('YYYY.MM.DD')}</td>                                     
                  </tr>
                ))}                
              </Table>
              <Table>
              <tr>
                  <th className="">완료처리</th>
                  <td><button id="schedule_complete_btn" type="button" >완료</button></td>
                </tr>
              </Table>
            </TabPane>
            <TabPane tabId='insert'>              
              <form>                
                <InputGroup>                  
                  <InputGroupText>업무 이름</InputGroupText>
                  <Input placeholder="예) 결산 확인, 재고 정리 등 간략히.." name="title"></Input>
                </InputGroup>
                <InputGroup>
                  <InputGroupText>업무 내용</InputGroupText>                  
                  <Input placeholder="예) .." name="content"></Input>
                </InputGroup>
                <InputGroup>                  
                  <InputGroupText>업무 상태</InputGroupText>
                  <Input></Input>
                  
                    <Button id="popover_id" type="button">?</Button>
                    <UncontrolledPopover placement="right" target="popover_id">
                      <PopoverHeader>업무 상태 분류</PopoverHeader>
                      <PopoverBody>
                        <tr>                          
                          <td>보통</td>
                        </tr>
                        <tr>                          
                          <td>중요</td>
                        </tr>
                        <tr>                          
                          <td>매우중요</td>
                        </tr>
                        <tr>                          
                          <td>긴급</td>
                        </tr>
                      </PopoverBody>
                    </UncontrolledPopover>
                  
                </InputGroup>
                <InputGroup>
                  <InputGroupText>작성자</InputGroupText>
                  <Input></Input>
                </InputGroup>
                <InputGroup>
                  <InputGroupText>등록일</InputGroupText>
                  <Input value={format(selectedDate, "yyyy년 MM월 dd일")}></Input>
                </InputGroup>
                <InputGroup>
                  <InputGroupText>완료예정일</InputGroupText>
                  <Input placeholder="아래에서 선택하세요"></Input>                
                  <DatePicker selected={dueDate} onChange={handleDueDateChange} />                  
                </InputGroup>                 
              </form>
            </TabPane>
            <TabPane tabId='update'>[일정수정]</TabPane>
          </TabContent>

        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  )
}
export default CalendarApp;