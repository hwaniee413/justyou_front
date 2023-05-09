import Board from "../components/Board/Board";
import { connect } from "react-redux";

export default connect(
    function(state){
        return {mode:state.mode}
    },
    null
)(Board);