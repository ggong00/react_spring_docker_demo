import React, { useEffect, useState } from "react";
import ImageModal from "../../common/Image_Modal";
import Solution1 from "./Solution1";
import Solution2 from "./Solution2";
import Solution3 from "./Solution3";

function SolutionSlider({solutionId}) {
    const [modal, setModal] = useState({})

    // 모달
    const openModal = ({target}) => {
        if (target.tagName != 'IMG') return;

        setModal({
            ...modal,
            type: 'image',
            src: target.src,
            name: target.dataset.name,
            status : true
        });
    };

    const closeModal = () => {
        setModal({
            ...modal,
            status : false
        });
    };

    return (
        <div onClick={openModal}>
            {
                solutionId == 1 ? <Solution1/> :
                    solutionId == 2 ? <Solution2/> :
                        solutionId == 3 ? <Solution3/> :
                            <div></div>
            }

            <ImageModal
                open={modal.status}
                close={closeModal}
                header="솔루션 체험 신청"
                modal={modal}
            >
            </ImageModal>
        </div>
    );
}

export default SolutionSlider;
