import React, { Component } from 'react'
import { Nav, NavItem, NavLink, ListGroup, ListGroupItem } from 'reactstrap'

export default class Board_nav extends Component {
    urlHandler = (param) => {
        var url = '/board/' + param;
        window.location.href=url;        
    }
    render() {
        return (
            <nav>
                <ListGroup>                
                    <ListGroupItem tag="button" onClick={
                        e => this.urlHandler("depositor")
                        }>                    
                            입금자 찾기
                    </ListGroupItem>
                    <ListGroupItem tag="button" onClick={
                        e => this.urlHandler("deposit&delivery")}>                    
                            입금&배송
                    </ListGroupItem>
                    <ListGroupItem tag="button" onClick={
                        e => this.urlHandler("goods&size")}>                    
                            상품&사이즈
                    </ListGroupItem>
                    <ListGroupItem tag="button" onClick={
                        e => this.urlHandler("exchange&return")}>                    
                            교환&반품
                    </ListGroupItem>
                    <ListGroupItem tag="button" onClick={
                        e => this.urlHandler("fix")}>                    
                        사이트&회원정보&오류문의
                    </ListGroupItem>
                    <ListGroupItem tag="button" onClick={
                        e => this.props.buttonClick("review")}>                    
                        구매후기    
                    </ListGroupItem>
                    {/* 
                    ListGroupItem tag="button" onClick={
                        e => this.props.buttonClick("notice")
                        }>공지사항
                    </ListGroupItem>
                    */}
                    <ListGroupItem tag="button" onClick={
                        e => this.urlHandler("notice")}>
                        공지사항
                    </ListGroupItem>
                </ListGroup>
        
            </nav>
        
        )
    }
}

