
import { useEffect, useState } from "react";

const API_URL = 'http://127.0.0.1:8080/emp';

const EmpTotalCount = () => {

    const [ totalCount, setTotalCount ] = useState(0);
    useEffect(() => {
        const fetchEmp = async ()=> {
            const response = await fetch(`${API_URL}/totalcount`);
            const totalCount = await response.json();
            console.log("totalCount: ", totalCount);            
            setTotalCount(totalCount);
        };  
        fetchEmp();
    }, null);

    return(
            <p>총 임직원 수 : {totalCount} 명</p>                    
    )

}
export default EmpTotalCount;