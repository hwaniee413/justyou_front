
import ErpNavContainer from "../../containers/ErpNavContainer";
import EmpViewAll from "./EmpViewAll";
import EmpListByDeptName from "./department/EmpListByDeptName";
import EmpInsert from "./insert/EmpInsert.tsx";
import EmpSearch from "./search/EmpSearch";


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const ErdMain = (props) => {

    const history = useNavigate();
    useEffect(() =>{
        if(props.empdeptname.sub!=='인사관리부') {
            Swal.fire({
                text: '인사관리부만 접속할 수 있습니다.',
                icon: 'info',
                showConfirmButton: false,
                timer:2000
            })
            history('/');
        }

        
    }, [])

    let article;
    
    if (props.mode === '사원검색') {
        article = <EmpSearch title={props.mode}/>
    } else if (props.mode === '사원입력') {
        article = <EmpInsert title={props.mode}/>
    } else {
        article = <EmpSearch title={'사원검색'}/>
    }
    return (
        <div className="flex w-100 p-0 bg-white justify-between">            
            <ErpNavContainer/>            
            {article}        
        </div>
        
    )

}
export default ErdMain;