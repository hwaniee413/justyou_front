import React, { Component } from 'react';

class Footer extends Component {
  render () {
    return (
        <footer className="footer">
            <ul>
              <li className="priv"><a href="#n">개인정보처리방침</a></li>
              <li className="em_bt"><a href="#n">이메일주소무단수집거부</a></li>
            </ul>
            <div className="ft_p">
              <a href="location"><span>주소 : 서울특별시 금천구 가산디지털2로 123</span></a>
              <span>Tel : 02-1234-5678</span>
            </div>
            <p>COPYRIGHT &copy; (주)저스트유, ALL RIGHTS RESERVED.{this.props.name}</p>
        </footer>
    );
  }
}

export default Footer;