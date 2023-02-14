import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";

function EditPass({userInfo, close}) {
    const { register, handleSubmit, getValues, formState: { isSubmitting, isDirty, errors }} = useForm({
        defaultValues: useMemo(() => userInfo),
    });

    const onsubmit = (formData) => {
        fetch("/api/user/pass", {
            method : 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    alert('정보가 성공적으로 수정되었습니다.');
                    // close();
                }
            }
            )
            .catch(error => {console.log(error)});
    }

    return (
    <form className="form-box pass" onSubmit={handleSubmit(onsubmit)}>
        <div className="input-box text">
            {/*<div className="title">비밀번호</div>*/}
            {/*<div className="input">*/}
            {/*    <input*/}
            {/*        id="userPass"*/}
            {/*        type="text"*/}
            {/*        name="userPass"*/}
            {/*        {...register("userPass", {*/}
            {/*            required: "비밀번호를 입력해주세요.",*/}
            {/*        })}*/}
            {/*    />*/}
            {/*</div>*/}

            <div className="input_group">
                <label htmlFor="userPass" className="title">비밀번호</label>
                <input
                    className="form_control"
                    id="userPass"
                    type="password"
                    name="userPass"
                    {...register("userPass", {
                        required: "비밀번호를 입력해주세요.",
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
        </div>

        <div className="btn-group" style={{marginTop: '2em', display: 'flex', justifyContent: 'space-between'}}>
            <Button title='변경' backgroundColor="var(--main-bg-color)"/>
            <Button title='취소' color="#333" onClick={close}/>
        </div>
    </form>
    );
}

export default EditPass;

