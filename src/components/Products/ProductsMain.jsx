import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import ProductNav from "./ProductNav";
import ProductsNavContainer from "../../containers/ProductsNavContainer";
import ViewAllProductsList from "./ViewAllProductsList";
import SearchProductsDetail from "./SearchProductsDetail";
import CateEventList from "./CateEventList";

const ProductsMain = (props) => {
    const history = useNavigate();
    useEffect(() =>{
        if(props.empdeptname.sub!=='상품관리부') {
            Swal.fire({
                text: '상품관리부만 접속할 수 있습니다.',
                icon: 'info',
                showConfirmButton: false,
                timer:2000
            })
            history('/');
        }        
    }, [])

    let article='';
    if(props.mode==='viewAllProducts'){
        article = <ViewAllProductsList/>
    } else if (props.mode==='searchProducts') {
        article = <SearchProductsDetail/>
    } else if (props.mode==='cateEventList') {
        article = <CateEventList/>
    } else {
        article = <ViewAllProductsList/>
    }
    return(
         <div className="flex w-100 p-0 bg-white justify-between">            
            <ProductNav/>            
            [This is Main]       
        </div>       
    )
}

export default ProductsMain;
