import ViewAnDnav from "../components/ViewAllandDepartment/ViewAnDnav";
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
)(ViewAnDnav);