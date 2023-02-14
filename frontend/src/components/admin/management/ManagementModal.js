import React, { useEffect, useState } from "react";
import Question from "../../common/Question"
import CreateUser from "../CreateUser";
import CreateLicense from "../CreateLicense";
import SendMail from "../SendMail";
import "../../../assets/css/management-modal.css"

function ManagementModal({data, reload, type}) {
    const [isUserDupl ,setIsUserDupl] = useState();

    useEffect(() => {

        // 계정 체크
        fetch("/api/admin/userChk", {
            method : 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((json) => {

                    if (json.code == "00") {
                        setIsUserDupl(false)
                    }
                    if (json.code == "05") {
                        setIsUserDupl(true)
                    }
                }
            )
            .catch(error => {console.log(error)});
    }, [isUserDupl]);

    const reset = () => {
        setIsUserDupl(!isUserDupl);
    }

    return (
        <>
            <Question data={data} mode="management" type={type}/>
            {/* {data.resYn == '신규' && !isUserDupl && <CreateUser data={data} reset={reset}/>} */}
            {data.resYn == '신규' && type == 'mgm-license' && <CreateLicense data={data} reload={reload}/>}
            {data.resYn == '신규' && type == 'mgm-question' && <SendMail data={data} reload={reload}/>}
        </>
    );
}

export default ManagementModal;

