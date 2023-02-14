import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../assets/css/login.css";

function Login() {
    const { register, handleSubmit, formState: { isSubmitting, isDirty, errors }} = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("user")) {
            // window.location = "/";
            navigate('/');
        }

    }, [])

    const onSubmit = (formData) => {
        fetch("/api/login", {
            method : 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((json) => {

                // 로그인 성공
                if (json.code == "03") {
                    localStorage.setItem("user", json.data.userId);
                    localStorage.setItem("role", json.data.role);
                    window.location = "/";
                    // navigate('/');
                }

                // 로그인 실패
                if (json.code == "04") {
                    alert("아이디 또는 비밀번호가 잘못되었습니다.")
                }
            });
    }

    return (
        // <div id="route-contents">
            <div className="login-contents">
                <div className="login_wrap">
                    <form className="" onSubmit={handleSubmit(onSubmit)} >
                        <div className="logo">
                            <img src={require("../../assets/img/common/logo.png")} />
                        </div>
                        <div className="login-input">


                            <div className="input_group">
                                <label htmlFor="idInput">아이디</label>
                                <input
                                    className="form_control"
                                    id="idInput"
                                    type="text"
                                    name="userId"
                                    {...register("userId")}
                                />
                            </div>
                            <div className="input_group">
                                <label htmlFor="PassInput">비밀번호</label>
                                <input
                                    className="form_control"
                                    id="PassInput"
                                    type="password"
                                    name="userPass"
                                    {...register("userPass")}
                                />
                            </div>
                            <div className="btn-submit">
                                <button className="btn" type="submit">로그인</button>
                            </div>
                        </div>
                    </form>

                    <div className="snsLoginArea">
                        <p><span>SNS 로그인</span></p>
                        <ul>
                            <li><button className="btn" style={{background:'#00c73c', border: '1px solid #00c73c', color: '#fff'}}>
                                <img className="ico" src={require("../../assets/img/login/ico_naver.png")}/>
                                네이버로 로그인
                            </button></li>
                            <li><button className="btn" style={{background: '#fff', border: '1px solid #dadce0'}}>
                                <img className="ico" src={require("../../assets/img/login/ico_google.png")}/>
                                구글로 로그인
                            </button></li>
                            <li><button className="btn" style={{background:'#fef124', border: '1px solid #fef124', color: '#3e2723'}}>
                                <img className="ico" src={require("../../assets/img/login/ico_kakao.png")}/>
                                카카오로 로그인
                            </button></li>
                        </ul>

                    </div>
                </div>
                {/*<div className="section2">*/}
                {/*    <img src={require("../../assets/img/login/사이드이미지.png")} />*/}
                {/*</div>*/}
            </div>
        // </div>
    );
}

export default Login;
