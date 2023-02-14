import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";

function CreateLicense({data, reload}) {
    const { register, handleSubmit, getValues, formState: { isSubmitting, isDirty, errors }} = useForm();

    const defaultMailMsg = {
        title: '안녕하세요 에이테크입니다.',
        message: '신청하신 라이선스에 계정 정보입니다.....'
    }

    const create = (formData) => {

        //FormData 셋팅
        if(!formData.mailTitle) formData.mailTitle = defaultMailMsg.title; 
        if(!formData.message) formData.message = defaultMailMsg.message; 
        const newFormData = new FormData();
        formData = {...data, ...formData}
        for(const name in formData) {
            if(name == 'attachFileList') {
                [...formData[name]].forEach(file => {
                    newFormData.append(name, file);
                })
            }else {
                newFormData.append(name, formData[name]);
            }
        }

        //라이선스 지급 + 메일 전송
        fetch("/api/admin/license", {
            method: 'post',
            body: newFormData
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    alert("성공적으로 지급되었습니다.");
                    reload();
                } else if (json.code == "05-2") {
                    alert("사이트 계정을 먼저 생성해주세요");
                } else if (json.code == "08") {
                    alert("메일주소를 찾을 수 없습니다.");
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    const errorHadle = (error) => {
        const order = ['siteId', 'sitePass', 'siteUrl'];
        const first = order
                        .map(ele => error[ele])
                        .find(ele => ele);

        alert(first.message);
    }

    const onDelete = () => {

        fetch(`/api/admin/license-question/${data.licenseQuestionId}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    reload();
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <>
            <form className="user-form" onSubmit={handleSubmit(create,errorHadle)}>
                <div className="form-header">
                    <div className="form-title">솔루션</div>
                </div>
                <div className="form-main">
                    <div className="input">
                        <label className="essential">아이디</label>
                        <input
                            className="form_control"
                            type="text"
                            name="siteId"
                            autoComplete="off"
                            {...register("siteId", {
                                required: "아이디는 필수 입력입니다.",                                                   
                            })}
                        />
                    </div>
                    <div className="input">
                        <label className="essential">비밀번호</label>
                        <input
                            className="form_control"
                            type="text"
                            name="sitePass"
                            autoComplete="off"
                            {...register("sitePass", {
                                required: "비밀번호는 필수 입력입니다.",
                            })}
                        />
                    </div>
                    <div className="input">
                        <label className="essential">주소</label>
                        <input
                            className="form_control"
                            type="text"
                            name="siteUrl"
                            autoComplete="off"
                            {...register("siteUrl", {
                                required: "주소는 필수 입력입니다.",
                            })}
                        />
                    </div>
                </div>

                <div className="form-header">
                    <div className="form-title">메일</div>
                </div>
                <div className="form-main">
                    <div className="input">
                        <label>제목</label>
                        <input
                            className="form_control"
                            type="text"
                            name="mailTitle"
                            autoComplete="off"
                            placeholder={`기본 : ${defaultMailMsg.title}`}
                            {...register("mailTitle", {
                            })}
                        />
                    </div>
                    <div className="input">
                        <label>내용</label>
                        <textarea
                            className="form_control"
                            type="text"
                            name="message"
                            placeholder={`기본 : ${defaultMailMsg.message}`}
                            {...register("message", {
                            })}
                        />
                    </div>
                    <div className="input file">
                        <label>첨부파일</label>
                        <input
                            className="form_control"
                            type="file"
                            multiple={true}
                            name="attachFileList"
                            autoComplete="off"
                            {...register("attachFileList", {
                            })}
                        />
                    </div>
                </div>    

                <div className="button-wrap" style={{display: 'flex', justifyContent: "space-between", marginTop: '2em'}}>
                    <Button
                        title="라이선스 지급"
                        backgroundColor="var(--main-bg-color)"
                    />
                    <Button
                        title="닫기"
                        onClick={reload}
                        backgroundColor="#555"
                    />
                </div>
            </form>
        </>
    );
}

export default CreateLicense;
