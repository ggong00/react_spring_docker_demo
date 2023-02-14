import React from "react";
import "../../assets/css/modal.css";

function ImageModal(props) {
    const { open, close, header, modal } = props;

    return (
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section className="modal-xxl image-modal">
                    <header>
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>
                        <img src={modal.src} style={{width:'100%',height:'100%'}}/>
                    </main>
                </section>
            ) : null}
        </div>
    );
}

export default ImageModal;
