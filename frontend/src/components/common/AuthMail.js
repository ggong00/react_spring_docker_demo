import { ColDefUtil } from "ag-grid-community";
import React, {useEffect, useState} from "react";

function AuthMail({to,success,fail,state,register,errors}) {
    const [codeValue, setCodeValue] = useState();

    const changeHandle = ({target}) => {
        setCodeValue(target.value);
    }

    const sendAuthMail = () => {
        if(state) return;

        if(!to) {
            alert('메일을 입력해주세요.');
            return;
        }

        fetch(`/api/send-code`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(to)
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    alert('인증코드를 메일로 전송했습니다.');
                } else if (json.code == "05") {
                    alert('이미 가입한 이메일입니다.');
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    const onAuth = () => {
        if(state) return;

        if(!codeValue) {
            alert('인증코드를 입력해주세요.');
            return;
        }

        fetch(`/api/code-check`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(codeValue)
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    success();
                } else if (json.code == "-1") {
                    alert('인증코드가 올바르지 않습니다.');
                    fail();
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <>
            <div className="input_group">
                <label htmlFor="email" className="title">이메일</label>
                <div style={{display: 'flex'}}>
                    <input style={{
                            flex: '5',
                            padding: '6px',
                            marginRight: '8px',
                            borderRadius: '4px',
                        }}
                        className="form_control"
                        id="email"
                        type="email"
                        name="email"
                        {...register("email", {
                            required: "메일을 입력해주세요.",
                            validate: () => {
                                if(state) {
                                    return true;
                                } else {
                                    return '메일을 인증해주세요.'
                                }
                            },
                            onChange: fail
                        })}
                    />
                    <button
                        style={{
                            cursor: 'pointer',
                            flex: '1',
                            backgroundColor: 'rgb(240 125 125)',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '8px',
                            fontSize: '.875em', fontWeight: "700", color: 'white',
                            marginLeft: '.5em'
                        }}
                        type="button"
                        onClick={sendAuthMail}
                    >
                        메일 전송
                    </button>
                </div>    
                <div className="error-box">
                    <div className="error-msg">{errors.email?.type == 'required' && errors.email?.message}</div>
                </div>
            </div>
            <div style={{
                display: 'flex',
                // alignItems: 'center',
                margin: '16px 0px',
            }}>
                <input
                    className="form_control"
                    style={{
                        flex: '5',
                        padding: '6px',
                        marginRight: '8px',
                        borderRadius: '4px',
                    }}
                    type="text"
                    placeholder="인증코드를 입력해주세요."
                    maxLength={8}
                    onChange={changeHandle}
                />
                <button
                    style={{
                        cursor: 'pointer',
                        flex: '1',
                        backgroundColor: state ? '#54B435' : 'rgb(131 142 128 / 54%)',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px',
                        fontSize: '.875em', fontWeight: "700", color: 'white',
                        marginLeft: '.5em'
                    }} 
                    type="button"
                    onClick={onAuth}
                >
                    인증 확인
                </button>
            </div>
        </>        
    )
}

export default AuthMail;