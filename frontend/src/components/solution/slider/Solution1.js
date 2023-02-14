import Slider from "react-slick";
import Solution1_1 from "../../../assets/img/solution/선재하이테크/1_수주관리.png";
import Solution1_2 from "../../../assets/img/solution/선재하이테크/2_생산계획.png";
import Solution1_3 from "../../../assets/img/solution/선재하이테크/3_자재소요량산출.png";
import Solution1_4 from "../../../assets/img/solution/선재하이테크/4_작업지시.png";
import Solution1_5 from "../../../assets/img/solution/선재하이테크/5_작업실적.png";
import Solution1_6 from "../../../assets/img/solution/선재하이테크/6_계획대비실적.png";
import Solution1_7 from "../../../assets/img/solution/선재하이테크/7_BOM현황.png";

function Solution1() {
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
                <div className="title">수주관리</div>
                <img src={Solution1_1} data-name='수주관리'/>
            </div>
            <div className="img-box">
                <div className="title">생산계획</div>
                <img src={Solution1_2} data-name='생산계획'/>
            </div>
            <div className="img-box">
                <div className="title">자재소요량산출</div>
                <img src={Solution1_3} data-name='자재소요량산출'/>
            </div>
            <div className="img-box">
                <div className="title">작업지시</div>
                <img src={Solution1_4} data-name='작업지시'/>
            </div>
            <div className="img-box">
                <div className="title">작업실적</div>
                <img src={Solution1_5} data-name='작업실적'/>
            </div>
            <div className="img-box">
                <div className="title">계획대비실적</div>
                <img src={Solution1_6} data-name='계획대비실적'/>
            </div>
            <div className="img-box">
                <div className="title">BOM현황</div>
                <img src={Solution1_7} data-name='BOM현황'/>
            </div>
        </Slider>
    );
}

export default Solution1;
