import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const MainLoginRegister = () => {
    const history = useNavigate();
    const urlHandler = (param) => {
        const url = '/' + param;
        history(url);
      }
    return (    
        <div className='main-body'>
          <div className='main-container'>
            <div className='main-subcontainer1 flex justify-center'>
              <h1>Just You 대시보드</h1>
            </div>
            <div className='main-subcontainer2 flex justify-center'>
              <Button color='primary' onClick={e => urlHandler('login')}>로그인</Button>              
            </div>
          </div>
        </div>
      )
}
export default MainLoginRegister;