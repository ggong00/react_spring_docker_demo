import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";

function CreateUser({data, reset}) {
    const { register, handleSubmit, getValues, formState: { isSubmitting, isDirty, errors }} = useForm();
    
    const create = (formData) => {
        fetch("/api/admin/create-user", {
            method : 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...data, ...formData})
        })
            .then((res) => res.json())
            .then((json) => {
                    if (json.code == "00") {
                        alert("정상적으로 처리되었습니다.");
                        reset();
                    }
                    if (json.code == "06") {
                        alert("ID가 중복됩니다.");
                    }
                }
            )
            .catch(error => {console.log(error)});
    }

    const errorHadle = (error) => {
        const order = ['userId', 'userPass'];
        const first = order
                        .map(ele => error[ele])
                        .find(ele => ele);

        alert(first.message);
    }
    
    return (
        <>
            <form className="user-form" onSubmit={handleSubmit(create,errorHadle)}>
                <div className="form-header">
                    <div className="form-title">사이트</div>
                </div>
                <div className="form-main">
                    <div className="input">
                        <label className="essential">아이디</label>
                        <input
                            type="text"
                            name="userId"
                            autoComplete="off"
                            {...register("userId", {
                                required: "아이디는 필수 입력입니다.",
                            })}
                        />
                    </div>
                    <div className="input">
                        <label className="essential">비밀번호</label>
                        <input
                            type="text"
                            name="userPass"
                            autoComplete="off"
                            {...register("userPass", {
                                required: "비밀번호는 필수 입력입니다.",
                            })}
                        />
                    </div>
                </div>
                <div className="button-wrap">
                    <Button
                        title="생성"
                        backgroundColor="#54B435"
                    />
                </div>
            </form>
        </>
    );
}

export default CreateUser;

