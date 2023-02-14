import React, { useEffect, useState } from "react";
import Question from "../common/Question";

function QuestionPage({userInfo}) {
    return (
        <div id="route-contents" style={{background:'#fff'}}>
            <div className="container">
                {/*<div id="contents-title">문의하기</div>*/}
                <h2>문의하기</h2>
                <Question userInfo={userInfo} type="question"/>
            </div>
        </div>
    );
}

export default QuestionPage;
