import React, { useEffect, useState } from "react";

function Footer(props) {
    const btn_link = {
        background: '#545e7e', fontSize: '.875em', color: '#C6CCE2',
        padding: '.25em .75em', borderRadius: '.25em', marginLeft: '.25em'
    }
    const highlight_font = {
        fontWeight: '400', color: '#C6CCE2'
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer_logo">
                    <img src={require("../../assets/img/common/footer_logo1.png")} />
                    <span>에이테크</span>
                </div>
                <div className="footer_info">
                    <div className="footer_addr">
                        <span>주소 : (44547) 울산광역시 중구 종가로 655, 2F-307호(서동, 혁신센트럴시티)</span>
                        <span>Tel : 052-281-4780</span>
                    </div>
                    <div><b style={highlight_font}>고객지원</b> : <b style={highlight_font}>전화 상담</b> 평일 9:00-18:00 또는 <a href="/question" style={btn_link}>문의하기</a></div>

                    <div className="footer_copyright" style={{marginTop: '1em'}}><b>©A-TECH COMPANY. ALL RIGHTS RESERVED.</b></div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;



