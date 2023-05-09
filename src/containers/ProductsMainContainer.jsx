import ProductsMain from "../components/Products/ProductsMain";
import { connect } from "react-redux";

export default connect(
    function(state){
        return {mode:state.mode}
    },
    null
)(ProductsMain);