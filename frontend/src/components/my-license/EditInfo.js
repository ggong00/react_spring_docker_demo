import React, { useEffect, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from 'react-phone-number-input'
import Button from "../common/Button";
import 'react-phone-number-input/style.css'

function EditInfo({userInfo, close}) {
    const { register, handleSubmit, reset, control,formState: { isSubmitting, isDirty, errors }} = useForm({
        defaultValues: useMemo(() => userInfo),
    });

    const onsubmit = (formData) => {

        fetch("/api/user/info", {
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
                    close();
                }
            }
            )
            .catch(error => {console.log(error)});
    }

    return (
    <form className="form-box" onSubmit={handleSubmit(onsubmit)}>
        <div className="input-box text">
            {/*<div className="title">소속</div>*/}
            {/*<div className="input">*/}
            {/*    <input*/}
            {/*        // id="belong"*/}
            {/*        type="text"*/}
            {/*        name="belong"*/}
            {/*        defaultValue={userInfo?.belong}*/}
            {/*        {...register("belong", {*/}
            {/*            required: "소속을 입력해주세요.",*/}
            {/*        })}*/}
            {/*    />*/}
            {/*</div>*/}

            <div className="input_group">
                <label htmlFor="belong" className="title">소속</label>
                <input
                    className="form_control"
                    // id="belong"
                    type="text"
                    name="belong"
                    defaultValue={userInfo?.belong}
                    {...register("belong", {
                        required: "소속을 입력해주세요.",
                    })}
                />
                <div className="error-box">
                    <div className="error-msg">{errors.belong?.message}</div>
                </div>
            </div>

            <div className="input_group">
                <label htmlFor="name" className="title">성함</label>
                <input
                    className="form_control"
                    // id="name"
                    type="text"
                    name="name"
                    defaultValue={userInfo?.name}
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
                    // id="position"
                    type="text"
                    name="position"
                    defaultValue={userInfo?.position}
                    {...register("position", {
                        required: "칙책을 입력해주세요.",
                    })}
                />
                <div className="error-box">
                    <div className="error-msg">{errors.position?.message}</div>
                </div>
            </div>

            <div className="input_group">
                <label htmlFor="tel" className="title">연락처</label>
                <Controller
                    name="tel"
                    control={control}
                    rules={{ required: "연락처를 입력해주세요." }}
                    render={({ field: { onChange, value } }) => (
                        <PhoneInput
                            className="form_control"
                            // id="tel"
                            type="tel"
                            name="tel"
                            international
                            initialValueFormat="national"
                            onChange={onChange}
                            value={userInfo?.tel}
                            defaultCountry="TR"
                        />
                    )}
                />
                <div className="error-box">
                    <div className="error-msg">{errors.tel?.message}</div>
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

export default EditInfo;

