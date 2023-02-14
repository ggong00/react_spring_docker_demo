import Slider from "react-slick";
import Solution3_1 from "../../../assets/img/solution/한국섬유개발원/1_작업지시.png";
import Solution3_2 from "../../../assets/img/solution/한국섬유개발원/2_생산정보.png";
import Solution3_3 from "../../../assets/img/solution/한국섬유개발원/3_생산완료정보.png";
import Solution3_4 from "../../../assets/img/solution/한국섬유개발원/4_설비유지보수.png";
import Solution3_5 from "../../../assets/img/solution/한국섬유개발원/5_모니터링.png";

function Solution3() {
    const sliderSettings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...sliderSettings}>
            <div className="img-box">
                <div className="title">작업지시</div>
                <img src={Solution3_1} data-name='작업지시'/>
            </div>
            <div className="img-box">
                <div className="title">생산정보</div>
                <img src={Solution3_2} data-name='생산정보'/>
            </div>
            <div className="img-box">
                <div className="title">생산완료정보</div>
                <img src={Solution3_3} data-name='생산완료정보'/>
            </div>
            <div className="img-box">
                <div className="title">설비유지보수</div>
                <img src={Solution3_4} data-name='설비유지보수'/>
            </div>
            <div className="img-box">
                <div className="title">모니터링</div>
                <img src={Solution3_5} data-name='모니터링'/>
            </div>
        </Slider>
    );
}

export default Solution3;