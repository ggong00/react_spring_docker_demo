import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/solution.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from "../../components/common/Modal";
import SolutionSlider from "./slider/SolutionSlider";

// 라이선스 정보
function License(licenseInfo, solution, idx){
    licenseInfo.map(m => {
        let obj2 = {};
        solution[idx].license.map(k => {
            obj2[k.type] = k[m.id];
        })
        m.license = obj2;
    });
}

function Solution({userInfo}) {
    const [solution, setSolution] = useState([]);
    const [selectedNav, setSelectedNav] = useState({});
    const [selectedLicense, setSelectedLicense] = useState({});
    const [modal, setModal] = useState({});
    const navigate = useNavigate();

    const [solutionInfo, setSolutionInfo] = useState({
        1: `작업지시에서 완성품까지\n생산활동을 추적/최적화`,
        2: "프로젝트별 관리체계 구축을 통해\n가시성 및 업무 생산성 강화",
        3: "방사/제직 공정 데이터를\n수집·통합하여 생산관리 효율화"
    });

    const [licenseInfo, setLicenseInfo] = useState([
        {id: "trial", name: "체험 상품", desc: "서비스를 체험해\n보고 싶은 고객", btn: "체험 신청", license: {}},
        {id: "basic", name: "Basic", desc: "합리적인 비용으로\n사용하고 싶은 고객", btn: "도입 문의", license: {}},
        {id: "premium", name: "Premium", desc: "프리미엄 서비스를\n사용하고 싶은 고객", btn: "도입 문의", license: {}},
        {id: "custom", name: "맞춤형 상품", desc: "기업 맞춤형으로\n사용하고 싶은 고객", btn: "도입 문의", license: {}}
    ]);
    // const [license, setLicense] = useState();

    // 솔루션 정보 조회
    useEffect(() => {
        fetch("/api/solution", {
            method : 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    const solution = json.data.filter(ele => ele.solutionId != 99);

                    // 솔루션 정보 저장
                    setSolution(solution);
                    setSelectedNav({id: solution[0].solutionId, name: solution[0].solutionName});

                    // 라이선스 정보 저장
                    License(licenseInfo, solution, 0);
                }
            });
    }, []);

    const changeSolution = (e) => {
        setSelectedNav({id: e.target.id, name: e.target.dataset.name});

        License(licenseInfo, solution, e.target.id - 1);
    }

    // 모달
    const openModal = ({target}) => {

        // 로그인 체크
        const role = localStorage.getItem("role");
        if (!role) {
            alert('로그인이 필요합니다.');
            navigate("/login");
            // window.location = "/login";
        }

        setModal({
            ...modal,
            type: 'question',
            id: selectedNav.id,
            name: selectedNav.name,
            userInfo: userInfo,
            licenseInfo: licenseInfo.find(ele => ele.name === target.dataset.name),
            changeModal: changeModal,
            status : true
        });
    };

    const closeModal = () => {
        setModal({
            ...modal,
            status : false
        });
    };

    const changeModal = (e) => {
        closeModal();
        openModal(e);
    }

    return (
        <div id="route-contents" style={{background: '#F5F7F9'}}>
            <div className="container">
                <h2>솔루션 소개</h2>

                <ul className="top-nav">
                    {solution?.map((ele) => {
                        return (
                            <li
                                id={ele.solutionId}
                                data-name={ele.solutionName}
                                key={ele.solutionId}
                                className={ele.solutionId == selectedNav.id ? "selected" : ""}
                                onClick={changeSolution}
                            >{ele.solutionName}
                            </li>
                        )
                    })}
                </ul>
                <div className="section-header">솔루션 주요기능</div>
                <div className="solution-contents">
                    <div className="custom-slider">
                        <SolutionSlider solutionId={selectedNav.id}/>
                    </div>

                    <div className="section2">
                        <h4 className="sec_title">
                            {solutionInfo[selectedNav.id]}
                        </h4>
                        <ul className="solution-detail">
                            {solution
                                .find(ele => ele.solutionId == selectedNav.id)
                                ?.detail
                                .map(ele => {
                                    return (
                                        <li
                                        key={ele.detailId}
                                        >{ele.contents}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                <div className="section-header">구축 비용</div>
                <div className="section3">
                    <ul className="license-info">
                        {licenseInfo.map((m) => {
                            return (
                                <li key={m.id} id={m.id}>
                                    <div className="card">
                                        <div className="card_header">
                                            <h6>{m.name}</h6>
                                            <p>{m.desc}</p>
                                        </div>
                                        <div className="card_body">
                                            <dl>
                                                <dd>
                                                    <span className="cost">{m.license['연간 구독형'] == undefined ? '　' : m.license['연간 구독형']}</span>
                                                    {m.license['연간 구독형'] == undefined ? '' : ' / 연간 구독형'}
                                                </dd>
                                                <dd>
                                                    <span className="cost">{m.license['영구 라이선스'] == undefined ? '0$' : m.license['영구 라이선스']}</span>
                                                    {m.license['연간 구독형'] == undefined ? ' / 15일' : ' / 영구 라이선스'}
                                                </dd>
                                            </dl>
                                            <div className="question-wrap">
                                                <button
                                                    data-name={m.name}
                                                    className="btn-question"
                                                    onClick={openModal}
                                                >{m.btn}</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    
                    {/*<table className="license-info-table">*/}
                        {/*<thead>*/}
                        {/*    <tr>*/}
                        {/*        <th>구분</th>*/}
                        {/*        <th>Basic</th>*/}
                        {/*        <th>Premium</th>*/}
                        {/*        <th>맞춤형 제작</th>*/}
                        {/*    </tr>*/}
                        {/*</thead>*/}
                        {/*<tbody>*/}
                        {/*{solution*/}
                        {/*    .find(ele => ele.solutionId == selectedNav)*/}
                        {/*    ?.license*/}
                        {/*    .map(ele => {*/}
                        {/*        return (*/}
                        {/*            <tr key={ele.licenseId}>*/}
                        {/*                <td>{ele.type}</td>*/}
                        {/*                <td>{ele.basic}</td>*/}
                        {/*                <td>{ele.premium}</td>*/}
                        {/*                <td>{ele.custom}</td>*/}
                        {/*            </tr>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*}*/}
                        {/*</tbody>*/}
                    {/*</table>*/}
                </div>
            </div>

            <Modal
                open={modal.status}
                close={closeModal}
                header="솔루션 체험 신청"
                modal={modal}
            >
            </Modal>
        </div>
);
}

export default Solution;
