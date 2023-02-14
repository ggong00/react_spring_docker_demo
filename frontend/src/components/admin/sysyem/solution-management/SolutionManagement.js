import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import Modal from "../../../common/Modal";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function SolutionManagement(props) {
    const [solution, setSolution] = useState();
    const [processingSolution, setProcessingSolution] = useState();
    const [modal, setModal] = useState({})
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    const columnDefs = [
        { headerName: '번호', field: 'solutionId', flex: 1,},
        { headerName: '솔루션 명', field: 'solutionName', flex: 1,},
        { headerName: '상세', field: 'detailCnt', flex: 1,},
        { headerName: '라이선스', field: 'licenseCnt', flex: 1,},
        { headerName: '이미지', field: 'imgCnt', flex: 1,},
    ];
    
    // 솔루션 정보 조회
    useEffect(() => {
        fetch(`/api/solution`, {
            method : 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((json) => {
            if (json.code == "00") {
                const processing = json.data
                    .filter(ele => ele.solutionId != 99)
                    .map(ele => ({...ele, detailCnt: ele.detail.length , licenseCnt: ele.license.length, imgCnt: 0}));

                setSolution(json.data);
                setProcessingSolution(processing);    
            }
        });
    }, [reload]);

    // 모달
    const openModal = (data) => {
        setModal({
            ...modal,
            type: 'solution-management',
            solution: data,
            reload: () => {
                closeModal();
                setReload(!reload);
            },
            status : true
        });
    };

    const closeModal = () => {
        setReload(!reload);
        setModal({
            ...modal,
            status : false
        });
    };

    const cellClickHandler = (e) => {
        [...solution].forEach(ele => {
            if(ele.solutionId == e.data.solutionId) {
                openModal(ele);
            }
        });
    }

    return (
      <div className="system-main solution-management">
        <div className="header">
            <input type='text'/>
            <button>추가</button>
        </div>

        <div className="ag-theme-alpine"  style={{ width: "100%", height: "700px" }}>
            <AgGridReact
                rowData={processingSolution}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={25}
                onCellClicked={cellClickHandler}
                overlayNoRowsTemplate={"데이터가 없습니다."}
            />
        </div>

        <Modal
            open={modal.status}
            close={closeModal}
            header={`솔루션 관리 (${modal.solution?.solutionName})`}
            modal={modal}
        >
        </Modal>
      </div>
    );
}

export default SolutionManagement;
