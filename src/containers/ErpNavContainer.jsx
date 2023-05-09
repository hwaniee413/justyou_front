import ErpNav from "../components/Erp/ErpNav";
import { connect } from "react-redux";

export default connect(
    null,
    function(dispatch){
        return {
            buttonClick: (param) => {                    
                console.log('erdnav param: ' + param);    
                dispatch({type:param});
            }
        }
    }
)(ErpNav);