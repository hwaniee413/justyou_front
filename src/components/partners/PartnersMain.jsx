import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PartnersMain = (props) => {
    const history = useNavigate();
    useEffect(() =>{
        if(props.empdeptname.sub!=='마케팅부') {
            Swal.fire({
                text: '마케팅부만 접속할 수 있습니다.',
                icon: 'info',
                showConfirmButton: false,
                timer:2000
            })
            history('/');
        }

        
    }, [])

    return(
        <h1>[This is PartnersMain]</h1>
    )
}

export default PartnersMain;