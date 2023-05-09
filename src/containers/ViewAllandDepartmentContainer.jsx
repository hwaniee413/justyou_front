import ViewAllandDepartment from "../components/ViewAllandDepartment/ViewAllandDepartment";
import { connect } from "react-redux";

export default connect(
    function(state){
        return {mode:state.mode}
    },
    null
)(ViewAllandDepartment);