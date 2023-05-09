import Board_nav from "../components/Nav/Board_nav";
import { connect } from "react-redux";

export default connect(
    null,
    function(dispatch){
        return {
            buttonClick: (param) => {                    
                console.log('nav param: ' + param);    
                dispatch({type:param});
            }
        }
    }
)(Board_nav);
