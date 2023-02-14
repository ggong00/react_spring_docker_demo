import React, { useEffect, useState } from "react";
import "../../assets/css/my-license-modal.css"
import EditInfo from "./EditInfo";
import EditPass from "./EditPass";

function ManagementModal({userInfo, reload}) {
    const [selectedMenu, setSelectedMenu] = useState();

    useEffect(() => {
        setSelectedMenu('info')
    }, [])

    const changeMenu = ({target}) => {
        if(target.tagName != 'LI') return;

        setSelectedMenu(target.dataset.menu);
    }

    return (
        <>
            <ul className="edit-form-menu" onClick={changeMenu}>
                <li data-menu='info' className={selectedMenu == 'info' ? 'selected' : ''}>기본정보 변경</li>
                <li data-menu='pass' className={selectedMenu === 'pass' ? 'selected' : ''}>비밀번호 변경</li>
            </ul>
            {
                selectedMenu == 'info' &&
                <EditInfo userInfo={userInfo} close={reload}/>
            }
                       {
                selectedMenu == 'pass' &&
                <EditPass userInfo={userInfo} close={reload}/>
            }
        </>
    );
}

export default ManagementModal;

