import React from "react";
import "../../assets/css/modal.css";
import Question from "../common/Question";
import ManagementModal from "../admin/management/ManagementModal";
import MyLicneseModal from "../../components/my-license/MyLicenseModal"
import SolutionManagementModal from "../admin/sysyem/solution-management/SolutionManagementModal";

function Modal(props) {
    const { open, close, header, modal } = props;

    const style = {
        paddingTop: '2.5em', paddingBottom: '3em'
    }

    return (
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section className={header === '내 정보 수정' ? "modal-md" : "modal-lg"}>
                    <header>
                        {header}
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    {
                        modal.type == "question" && 
                        <main style={style} className={modal.type}>
                            <Question 
                                id={modal.id} 
                                name={modal.name}
                                type='license' 
                                userInfo={modal.userInfo}
                                changeModal={modal.changeModal}
                                licenseInfo={modal.licenseInfo}
                                changeLicense={modal.changeLicense}
                            />
                        </main>
                    }
                    {
                        modal.type == "management" && 
                        <main style={style} className={modal.type}>
                            <ManagementModal
                                data={modal.data} 
                                reload={modal.reload}
                                type={modal.managementType}
                            />
                        </main>
                    }
                    {
                        modal.type == "my-license" && 
                        <main><MyLicneseModal userInfo={modal.userInfo} reload={modal.reload}/></main>
                    }
                    {
                        modal.type == "solution-management" && 
                        <main><SolutionManagementModal solution={modal.solution} reload={modal.reload}/></main>
                    }
                </section>
            ) : null}
        </div>
    );
}

export default Modal;
