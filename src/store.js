import { createStore } from 'redux';

var initState = {
    mode: undefined,    
}

function reducer(state=initState, action){
    if(action.type ==='notice') {
        return {...state, mode:'notice'};
    }
    if(action.type ==='depositor') {
        return {...state, mode:'depositor'};
    }
    if(action.type ==='review') {
        return {...state, mode:'review'};
    }
    if(action.type ==='listAll') {
        return {...state, mode:'listAll'};
    }
    if(action.type ==='임원') {
        return {...state, mode:'임원'};
    }
    if(action.type ==='총무부') {
        return {...state, mode:'총무부'};
    }
    if(action.type ==='회계부') {
        return {...state, mode:'회계부'};
    }
    if(action.type ==='인사관리부') {
        return {...state, mode:'인사관리부'};
    }
    if(action.type ==='상품관리부') {
        return {...state, mode:'상품관리부'};
    }
    if(action.type ==='서버관리부') {
        return {...state, mode:'서버관리부'};
    }
    if(action.type ==='고객관리부') {
        return {...state, mode:'고객관리부'};
    }
    if(action.type ==='마케팅부') {
        return {...state, mode:'마케팅부'};
    }
    if(action.type ==='사원검색') {
        return {...state, mode:'사원검색'};
    }
    if(action.type ==='사원입력') {
        return {...state, mode:'사원입력'};
    }
    if(action.type ==='viewAllProducts') {
        return {...state, mode:'viewAllProducts'};
    }
    if(action.type ==='searchProducts') {
        return {...state, mode:'searchProducts'};
    }
    if(action.type ==='cateEventList') {
        return {...state, mode:'cateEventList'};
    }    
    return state;
}
export default createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);