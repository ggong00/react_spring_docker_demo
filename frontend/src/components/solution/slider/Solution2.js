import Slider from "react-slick";
import Solution2_1 from "../../../assets/img/solution/코리아피앤시/1_BOM관리.png";
import Solution2_2 from "../../../assets/img/solution/코리아피앤시/2_대시보드.png";
import Solution2_3 from "../../../assets/img/solution/코리아피앤시/3_자재현황.png";
import Solution2_4 from "../../../assets/img/solution/코리아피앤시/4_작업지시.png";
import Solution2_5 from "../../../assets/img/solution/코리아피앤시/5_프로젝트현황.png";

function Solution2() {
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
                <div className="title">BOM관리</div>
                <img src={Solution2_1} data-name='BOM관리'/>
            </div>
            <div className="img-box">
                <div className="title">대시보드</div>
                <img src={Solution2_2} data-name='대시보드'/>
            </div>
            <div className="img-box">
                <div className="title">자재현황</div>
                <img src={Solution2_3} data-name='자재현황'/>
            </div>
            <div className="img-box">
                <div className="title">작업지시</div>
                <img src={Solution2_4} data-name='작업지시'/>
            </div>
            <div className="img-box">
                <div className="title">프로젝트현황</div>
                <img src={Solution2_5} data-name='프로젝트현황'/>
            </div>
        </Slider>
    );
}

export default Solution2;