import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/common/Modal";
import "../../assets/css/my-license.css";

function MyLicense({userInfo, reloadUserInfo}) {
    const [myLicenseData, setMyLicenseData] = useState([]);
    const [modal, setModal] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (!role) {
            // window.location = "/";
            navigate("/");
        }
        getData();
    }, []);

    const getData = () => {
        fetch(`/api/my-license`, {
            method : 'get'
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    setMyLicenseData(json.data);
                }
            });
    }

    const moveLink = (e) => {
        const link = e.target.dataset.url;
        window.open(link, "_blank");
    }

      // 모달
      const openModal = () => {
        setModal({
            ...modal,
            type: 'my-license',
            userInfo: userInfo,
            reload: reload,
            status : true
        });
    };
    const closeModal = () => {
        setModal({
            ...modal,
            status : false
        });
    };

    const reload = () => {
        setModal({
            ...modal,
            status : false
        });

        reloadUserInfo();
    };


    return (
        <div id="route-contents">
            <div className="container">
                <h2>마이페이지</h2>

                <div className="my-license-contents">
                    {/*<div className="title">마이페이지</div>*/}
                    <div className="user">
                        <div className="user-info">
                            <div className="name">{userInfo?.name}</div>
                            <div className="belong">{userInfo?.belong}</div>
                        </div>
                        <div className="edit-info" onClick={openModal}><FontAwesomeIcon icon={faUserGear}/></div>
                    </div>
                    <table className="my-license-table">
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>제품정보</th>
                            <th>계정정보</th>
                            <th>신청일</th>
                            <th>만료일</th>
                            <th>상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            myLicenseData
                            .map((ele,idx) => {
                                return (
                                    <tr key={ele.myLicenseId}>
                                        <td>{idx + 1}</td>
                                        <td>{ele.solutionName}</td>
                                        <td>{`${ele.siteId} / ${ele.sitePass}`}</td>
                                        <td>{ele.startDate}</td>
                                        <td>{ele.endDate}</td>
                                        <td>{
                                            ele.status ?
                                                <button
                                                    className="btn-solution-link"
                                                    onClick={moveLink}
                                                    data-url={ele.siteUrl}
                                                >바로가기</button>
                                                :
                                                <div>만료</div>
                                        }
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                open={modal.status}
                close={closeModal}
                header="내 정보 수정"
                modal={modal}
            >
            </Modal>
        </div>
    );
}

export default MyLicense;
