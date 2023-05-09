import EmpViewAll from '../Erp/EmpViewAll';
import EmpListByDeptName from '../Erp/department/EmpListByDeptName';
import ViewAnDnavConatiner from '../../containers/ViewAnDnavConatiner';
const ViewAllandDepartment = (props) => {
    
    let article ='';
    if (props.mode === 'listAll') {
        article = <EmpViewAll/>;
    } else if (props.mode === '임원') {
        article = <EmpListByDeptName deptname={props.mode}/>
    } else if (props.mode === '총무부') {
        article = <EmpListByDeptName deptname={props.mode}/>
    } else if (props.mode === '회계부') {
        article = <EmpListByDeptName deptname={props.mode}/>
    } else if (props.mode === '서버관리부') {
        article = <EmpListByDeptName deptname={props.mode}/>
    } else if (props.mode === '인사관리부') {
        article = <EmpListByDeptName deptname={props.mode}/>
    } else if (props.mode === '마케팅부') {
        article = <EmpListByDeptName deptname={props.mode}/>
    } else if (props.mode === '상품관리부') {
        article = <EmpListByDeptName deptname={props.mode}/>
    } else if (props.mode === '고객관리부') {
        article = <EmpListByDeptName deptname={props.mode}/>
    } else {
        article = <EmpViewAll/>;
    }

    return(

        <div className="flex w-100 p-0 bg-white .justify-between">            
            <ViewAnDnavConatiner/>            
            {article}        
        </div>       
    )
}

export default ViewAllandDepartment;