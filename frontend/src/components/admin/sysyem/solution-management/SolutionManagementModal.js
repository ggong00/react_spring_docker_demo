import React, { useEffect, useState } from "react";
import Button from "../../../common/Button";
import { useForm } from "react-hook-form";

function SolutionManagement({solution, reload}) {
    const {register, handleSubmit} = useForm();
    const [changedSolution, setChangedSolution] = useState(solution);
    const [detailInput, setDetailInput] = useState();
    const [selectDetail, setSelectDetail] = useState(solution.detail[0]?.detailId);
    
    const addDetail = () => {
        const tmpSolution = {...changedSolution};
        let minId = 10000;
        tmpSolution.detail.forEach(ele => {
            if (minId > ele.detailId) {
                minId = ele.detailId
            }
        })
        if (minId > 0) minId = minId*-1
        else minId = minId -1

        tmpSolution.detail.push({detailId: minId, contents: detailInput});
        setChangedSolution(tmpSolution);
    }

    const detaildelete = (e) => {
        const tmpSolution = {...changedSolution};
        const tmpDetail = [];
        tmpSolution.detail.forEach(ele2 => {
            if(selectDetail !== ele2.detailId) {
                tmpDetail.push(ele2);
            }
        })
        tmpSolution.detail = tmpDetail;
        setChangedSolution(tmpSolution);
    };

    const onSubmit = (data) => {
        console.log(changedSolution.detail)

        const postLicense = changedSolution.license.map(ele => {
            return {
                    licenseId: ele.licenseId,
                    type: ele.type,
                    basic: data[`${ele.type}/basic`],
                    premium: data[`${ele.type}/premium`],
                    custom: data[`${ele.type}/custom`]
                }
        });

        const patchData = {
            solutionId: changedSolution.solutionId,
            solutionName: data.solutionName,
            detail: changedSolution.detail,
            license: postLicense,
        }

        // 변경사항 전송
        fetch("/api/solution", {
            method : 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patchData)
        })
        .then((res) => res.json())
        .then((json) => {
                if (json.code == "00") {
                    alert('수정이 완료되었습니다.');
                    reload();
                }
            }
        )
        .catch(error => {console.log(error)});
    }

    const onDelete = () => reload();

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mgm-name">
            <div className="title">이름</div>  
            <input 
                type="text"
                defaultValue={changedSolution.solutionName}
                {...register(`solutionName`)}
            >
            </input>        
        </div>

        <div className="mgm-detail">
            <div className="title">솔루션 설명</div>
            <ul>
                {changedSolution.detail.map(ele => {
                    return (
                        <li 
                            key={ele.detailId} 
                            className={selectDetail === ele.detailId ? "detail-li selected" : 'detail-li'}
                            onClick={() => setSelectDetail(ele.detailId)}
                        >
                            {ele.contents}
                        </li>
                    )
                })}
                <li>
                    <input
                        type="text"
                        autoComplete="off"
                        placeholder="추가할 내용을 입력해주세요."
                        value={detailInput}
                        onChange={(e) => {
                            setDetailInput(e.target.value)
                        }}
                    />
                </li>
            </ul>
            <div className="button-wrap">
                <button type="button" className="add" onClick={addDetail}>추가</button>
                <button type="button" className="delete" onClick={detaildelete} >삭제</button>
            </div>
        </div>
        
        <div className="mgm-license">
            <div className="title">라이선스 정보</div>
            <table>
                <thead>
                <tr>
                    <th>분류</th>
                    <th>기본</th>
                    <th>프리미엄</th>
                    <th>맞춤형</th>
                </tr>
                </thead>
                <tbody>
                {
                    changedSolution.license
                    .map((ele) => {
                        return (
                            <tr key={ele.licenseId}>
                                <td>{ele.type}</td>
                                <td><input type="text" defaultValue={ele.basic} {...register(`${ele.type}/basic`)}/></td>
                                <td><input type="text" defaultValue={ele.premium} {...register(`${ele.type}/premium`)}/></td>
                                <td><input type="text" defaultValue={ele.custom} {...register(`${ele.type}/custom`)}/></td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
            <div className="btn-wrap">
            </div>
        </div>
        
        <div className="mgm-image">

        </div>

        <div className="button-wrap">
            <Button
                title="완료"
                backgroundColor="var(--main-bg-color)"
            />
            <Button
                title="취소"
                onClick={onDelete}
                backgroundColor="red"
            />
        </div>
    </form>
    );
}

export default SolutionManagement;
