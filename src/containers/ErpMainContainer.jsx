import ErpMain from "../components/Erp/ErpMain";
import { connect } from "react-redux";

export default connect(
    function(state){
        return {mode:state.mode}
    },
    null
)(ErpMain);