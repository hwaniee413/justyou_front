import { useEffect, useState } from "react";

const API_URL = 'http://127.0.0.1:8080/emp';

const DepartmentCount = (props) => {

    const [ totalCount, setTotalCount ] = useState(0);
    useEffect(() => {
        
        const fetchEmp = async ()=> {
            const response = await fetch(`${API_URL}/dept/${props.deptname}/totalcount`);
            const totalCount = await response.json();
            console.log("totalCount: ", totalCount);            
            setTotalCount(totalCount);
        };  
        fetchEmp();
    }, null);

    return(
            <p>부서원 수 : {totalCount} 명</p>                    
    )

}
export default DepartmentCount;