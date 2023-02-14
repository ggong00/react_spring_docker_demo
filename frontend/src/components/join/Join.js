import React, { useEffect, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthMail from "../common/AuthMail";
import 'react-phone-number-input/style.css'
import '../../assets/css/join.css'
import PhoneInput from 'react-phone-number-input'

function Join() {
    const { register, handleSubmit, reset, control, watch, getValues, formState: { isSubmitting, isDirty, errors }} = useForm();
    const [ mailSuccess, setMailSuccess] = useState();
    const [ idSuccess, setIdSuccess] = useState();
    const navigate = useNavigate();

    const success = () => {
        setMailSuccess(true);
    }

    const fail = () => {
        setMailSuccess(false);
    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
            // window.location = "/";
            navigate("/");
        }

    }, [idSuccess, mailSuccess])

    const onSubmit = (formData) => {
        fetch("/api/join", {
            method : 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    alert("회원가입이 완료되었습니다.");
                    navigate('/login');
                    // window.location = '/login';
                }
            }
            )
            .catch(error => {console.log(error)});
    }

    const errorHandle = (error) => {
        if(error.email && error.email.type != 'required') {
            alert(error.email.message)
            return;
        }

        if(error.userId && error.userId.type != 'required') {
            alert(error.userId.message)
            return;
        }
    }

    const idDuplChk = () => {
        if(idSuccess) return;

        if(!watch("userId")) {
            alert('아이디를 입력해주세요.');
            return;
        }

        fetch("/api/user/dupl-check", {
            method : 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(watch("userId"))
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    setIdSuccess(true);
                    alert('사용 가능한 아이디입니다..')
                } else if (json.code == "06") {
                    setIdSuccess(false);
                    alert('이미 사용중인 아이디입니다.')
                }
            }
            )
            .catch(error => {console.log(error)});
    }

    return (
    <div className="join-contents">
        <div className="container">
            <h2>회원가입</h2>

            <div className="join_wrap">
                {/*<div className="title"></div>*/}
                <form className="form-box" onSubmit={handleSubmit(onSubmit,errorHandle)}>
                    <div className="input-box text">
                        <div className="input_group">
                            {/*<div className="id-header">*/}
                                <label htmlFor="userId" className="title">아이디</label>
                            {/*</div>*/}
                            <div style={{display: 'flex'}}>
                                <input style={{
                                    flex:'5',
                                    padding: '6px',
                                    marginRight: '8px',
                                    borderRadius: '4px',
                                }}
                                    className="form_control"
                                    id="userId"
                                    type="text"
                                    name="userId"
                                    autoComplete="new-password"
                                    {...register("userId", {
                                        required: "아이디는 필수 입력입니다.",
                                        validate: () => {
                                            if(idSuccess) {
                                                return true;
                                            } else {
                                                return '아이디 중복체크를 진행해주세요.'
                                            }
                                        },
                                        onChange: () => setIdSuccess(false)
                                    })}
                                />
                                <button
                                    style={{
                                        flex:'1',
                                        cursor: 'pointer',
                                        backgroundColor: idSuccess ? '#54B435' : 'rgb(131 142 128 / 54%)',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        width: '8em',
                                        marginLeft: '.5em',
                                        color: 'white'
                                    }}
                                    type="button"
                                    onClick={idDuplChk}
                                >중복 확인</button>
                            </div>

                            <div className="error-box">
                                <div className="error-msg">{errors.userId?.type == 'required' && errors.userId?.message}</div>
                            </div>
                        </div>

                        <div htmlFor="userPass" className="input_group">
                            <label className="title">비밀번호</label>
                            <input
                                id="userPass"
                                className="form_control"
                                type="password"
                                name="userPass"
                                autoComplete="new-password"
                                {...register("userPass", {
                                    required: "비밀번호는 필수 입력입니다.",
                                })}
                            />
                            <div className="error-box">
                                <div className="error-msg">{errors.userPass?.message}</div>
                            </div>
                        </div>

                        <div className="input_group">
                            <label htmlFor="userPass2" className="title">비밀번호 확인</label>
                            <input
                                className="form_control"
                                id="userPass2"
                                type="password"
                                name="userPass2"
                                autoComplete="new-password"
                                {...register("userPass2", {
                                    validate: () => {
                                        if(getValues('userPass') == getValues('userPass2')) {
                                            return true;
                                        } else {
                                            return '비밀번호가 일치하지 않습니다.'
                                        }
                                    },
                                })}
                            />
                            <div className="error-box">
                                <div className="error-msg">{errors.userPass2?.message}</div>
                            </div>
                        </div>

                        <div className="input_group">
                            <label htmlFor="belong" className="title">회사명</label>
                            <input
                                className="form_control"
                                id="belong"
                                type="text"
                                name="belong"
                                {...register("belong", {
                                    required: "회사명을 입력해주세요.",
                                })}
                            />
                            <div className="error-box">
                                <div className="error-msg">{errors.belong?.message}</div>
                            </div>
                        </div>

                        <div className="input_group">
                            <label htmlFor="name" className="title">이름</label>
                            <input
                                className="form_control"
                                id="name"
                                type="text"
                                name="name"
                                {...register("name", {
                                    required: "이름을 입력해주세요.",
                                })}
                            />
                            <div className="error-box">
                                <div className="error-msg">{errors.name?.message}</div>
                            </div>
                        </div>

                        <div className="input_group">
                            <label htmlFor="position" className="title">직책</label>
                            <input
                                className="form_control"
                                id="position"
                                type="text"
                                name="position"
                                {...register("position", {
                                    required: "칙책을 입력해주세요.",

                                })}
                            />
                            <div className="error-box">
                                <div className="error-msg">{errors.position?.message}</div>
                            </div>
                        </div>

                        <div className="input_group">
                            <label htmlFor="tel" className="title">핸드폰</label>
                            <Controller
                                name="tel"
                                control={control}
                                rules={{ required: "전화번호를 입력해주세요." }}
                                render={({ field: { onChange, value } }) => (
                                    <PhoneInput
                                        className="form_control"
                                        id="tel"
                                        type="tel"
                                        name="tel"
                                        international
                                        initialValueFormat="national"
                                        onChange={onChange}
                                        defaultCountry="TR"
                                    />
                                )}
                            />
                            <div className="error-box">
                                <div className="error-msg">{errors.tel?.message}</div>
                            </div>
                        </div>

                        <AuthMail success={success} fail={fail} to={watch("email")} state={mailSuccess} register={register} errors={errors}/>

                        <div className="agree">
                            <input type="checkbox" id="agree" style={{fontSize: '.875em'}}/>
                            <label htmlFor="agree">개인정보 수집 및 이용에 동의합니다. (필수)</label>
                        </div> 

                        <div className="btn-submit">
                            <button className="btn" type="submit">회원가입</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
    );
}

export default Join;