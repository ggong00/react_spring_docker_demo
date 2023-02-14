import React, { useEffect, useState } from "react";
import Button from "./Button";

function QuestionFooter(props) {
    const {errors, register, type} = props

    return (
        <>
            <div className="agree">
                <input
                    id="agree"
                    type="checkbox"
                    name="agree"
                    value="on"
                    {...register("agree", {
                        required: "개인정보 수집 및 이용에 동의해주세요.",
                    })}
                />
                <label htmlFor="agree" className="title">개인정보 수집 및 이용에 동의합니다. (필수)</label>
            </div>
            {errors.agree && <div className="error-box">{errors.agree.message}</div>}

            <div className="btn-group" style={{marginTop: '2em', display: 'flex', justifyContent: 'center'}}>
                <Button title={type === 'license' ? '신청하기' : '문의하기'} backgroundColor="var(--main-bg-color)"/>
            </div>
        </>
    )
}

export default QuestionFooter;
