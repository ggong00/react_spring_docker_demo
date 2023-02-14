import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import "../../assets/css/question.css"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import QuestionFooter from "./QuestionFooter";

function Question({data, id, name, userInfo, licenseInfo, changeModal, mode ,type}) {
    const [ solutionList, setSolutionList ] = useState([]);
    const { register, handleSubmit, reset, control,formState: { isSubmitting, isDirty, errors }} = useForm({
        defaultValues: useMemo(() => userInfo),
    });
    const navigate = useNavigate();

    useEffect(() => {
  
        // 전체 솔루션 정보 조회
        fetch(`/api/solution`, {
            method : 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((json) => {
            if (json.code == "00") {
                setSolutionList(json.data);
            }
        });
    }, []);

    // 문의글 작성
    const onsubmit = (formData) => {
        if(!formData.solutionId) formData.solutionId = id;

        let userId = '';
        let url = ''; 

        if(type == 'question') {
            url = "/api/question";

        } else if(type == 'license') {
            userId = localStorage.getItem("user");
            url = "/api/license-question";
        }

        fetch(url , {
            method : 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...formData, userId : userId})
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    alert("답변은 이메일로 보내드립니다.");
                    // window.location = "/";
                    navigate("/");
                }
            }
            )
            .catch(error => {console.log(error)});
    }

    const cardStyle = {
        background: '#f5f7f9', padding: '1em', border: '0', borderRadius: '.5em',
        // display: 'flex',
    }

    return (
        <form className="form-box form-box2" onSubmit={handleSubmit(onsubmit)}>

            { 
                type == 'license' ? 
                <div className="input-box">
                    <ol className="type_info">
                        <li style={{paddingRight: '1em'}}>
                            <h5 style={{fontSize: '1.5em', marginBottom: '1em'}}>{name}</h5>

                            <div>
                                <h6 style={{fontSize: '1.125em'}}>제품 유형</h6>

                                <dl className="type_list">
                                    <dd>
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            data-name="체험 상품" 
                                            defaultValue='trial'
                                            defaultChecked={licenseInfo.name == '체험 상품'}
                                            {...register("type",{
                                                onChange: changeModal
                                            })}
                                        /> 체험상품</dd>
                                    <dd>
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            data-name="Basic" 
                                            defaultValue='basic'
                                            defaultChecked={licenseInfo.name == 'Basic'}
                                            {...register("type",{
                                                onChange: changeModal
                                            })}
                                        /> Basic</dd>
                                    <dd>
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            data-name="Premium" 
                                            defaultValue='premium'
                                            defaultChecked={licenseInfo.name == 'Premium'}
                                            {...register("type",{
                                                onChange: changeModal
                                            })}
                                        /> Premium</dd>
                                    <dd>
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            data-name="맞춤형 상품" 
                                            defaultValue='custom'
                                            defaultChecked={licenseInfo.name == '맞춤형 상품'}
                                            {...register("type",{
                                                onChange: changeModal
                                            })}
                                        /> 맞춤형 상품</dd>
                                </dl>
                            </div>

                        </li>
                        <li style={{paddingLeft: '1em'}}>
                            <div className="cost_info" style={cardStyle}>
                                <div style={{display:'flex', justifyContent: 'space-between'}}>
                                    <span style={{marginTop: '.25em'}}>비용</span>
                                    <dl>
                                        <dd>
                                            <span className="cost">{licenseInfo.license['연간 구독형'] == undefined ? '　' :licenseInfo.license['연간 구독형']}</span>
                                            {licenseInfo.license['연간 구독형'] == undefined ? '' : ' / 연간 구독형'}
                                        </dd>
                                        <dd>
                                            <span className="cost">{licenseInfo.license['영구 라이선스'] == undefined ? '0$' : licenseInfo.license['영구 라이선스']}</span>
                                            {licenseInfo.license['연간 구독형'] == undefined ? ' / 15일' : ' / 영구 라이선스'}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <span style={{marginTop: '.25em', fontSize: '.875em', color: '#888', fontWeight: '400', textAlign: 'right', display: 'block'}}>※설치비 및 부가세 별도</span>
                        </li>
                    </ol>
                </div> : null
            }
            
            { 
                type == 'question' || mode == 'management' ? 
                <>
                    <ul className={type == 'mgm-license' ? "mgm-license-info" : ""}>
                        <li>{data?.licenseType}</li>
                        {data?.license?.map(ele => {

                            return (
                                <li>
                                    <span>{`${data.licenseType === 'trial' ? '0$' : ele.type}`} / </span>
                                    <span>{`${data.licenseType === 'trial' ? '무료 체험' : ele[data.licenseType]}`}</span>
                                </li>
                            )
                        })}
                    </ul>
                    <div></div>
                    <div className="input-box category">
                        <div className="title">{type === 'mgm-question' ? '선택 제품' : '관심 제품 선택'}</div>

                        <div className="inner-input">
                            {!data ? (solutionList.map((ele) => {
                                return (
                                    <div className="input" key={ele.solutionId}>
                                        <input
                                            id={"solution-" + ele.solutionId}
                                            type="radio"
                                            name="solution"
                                            value={ele.solutionId}
                                            defaultChecked={id ? ele.solutionId == id && true : ele.solutionId == 1 && true}
                                            {...register("solutionId")}
                                        />
                                        <label htmlFor={"solution-" + ele.solutionId}>{ele.solutionName}</label>
                                    </div>
                                )
                            })) : (<div className="selected-solution">{data.solutionName}</div>)}
                        </div>
                    </div>
                </> : null
            }


            <div className={type === 'mgm-question' || type === 'mgm-license' ? 'input-box text input_flex' : 'input-box text'}>
                {
                    type == 'question' || mode == 'management' ? 
                    <>
                        <div className="input_group">
                            <label htmlFor="belong" className="title">회사명</label>
                            <input
                                className="form_control"
                                id="belong"
                                type="text"
                                name="belong"
                                disabled={data && true}
                                defaultValue={data ? data.belong : userInfo?.belong}
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
                                disabled={data && true}
                                defaultValue={data ? data.name : userInfo?.name}
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
                                disabled={data && true}
                                defaultValue={data ? data.position : userInfo?.position}
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
                                        disabled={data && true}
                                        value={data ? data.tel : userInfo?.tel}
                                        defaultCountry="TR"
                                    />
                                )}
                            />
                            <div className="error-box">
                                <div className="error-msg">{errors.tel?.message}</div>
                            </div>
                        </div>

                        <div className="input_group">
                            <label htmlFor="email" className="title">이메일</label>
                            <input
                                className="form_control"
                                id="email"
                                type="email"
                                name="email"
                                disabled={data && true}
                                defaultValue={data ? data.email : userInfo?.email}
                                {...register("email", {
                                    required: "이메일을 입력해주세요.",
                                })}
                            />
                            <div className="error-box">
                                <div className="error-msg">{errors.email?.message}</div>
                            </div>
                        </div>
                    </> 
                    : null
                }

                <div className="input_group" style={type === 'mgm-question' || type === 'mgm-license' ? {width: '100%'} : {}}>
                    <label htmlFor="title" className="title">제목</label>
                    <input
                        className="form_control"
                        id="title"
                        type="text"
                        name="title"
                        disabled={data && true}
                        defaultValue={data && data.title}
                        {...register("title", {
                            required: "제목을 입력해주세요",
                        })}
                    />
                    <div className="error-box">
                        <div className="error-msg">{errors.title?.message}</div>
                    </div>
                </div>

                <div className="input_group" style={type === 'mgm-question' || type === 'mgm-license' ? {width: '100%', height: 'auto'} : {}}>
                    <label htmlFor="contents" className="title">내용</label>
                    <textarea
                        className="form_control"
                        id="contents"
                        type="text"
                        name="contents"
                        disabled={data && true}
                        defaultValue={data && data.contents}
                        {...register("contents", {
                            required: "내용을 입력해주세요.",
                        })}
                    />
                    {errors.contents && <div className="error-box">{errors.contents.message}</div>}
                </div>
            </div>

            {!data && <QuestionFooter errors={errors} register={register} type={type} />}
        </form>
    );
}

export default Question;
