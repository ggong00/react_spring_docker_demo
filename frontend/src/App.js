import {Routes, Route, Navigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import './App.css';
import "./assets/css/font.css";
import "./assets/css/common.css";
import Header from "./components/common/Header";
import Login from "./components/login/Login";
import Join from "./components/join/Join";
import Solution from "./components/solution/Solution";
import MyLicense from "./components/my-license/MyLicense";
import Management from "./components/admin/management/Management";
import QuestionPage from "./components/question/QuestionPage";
import System from "./components/admin/sysyem/System";
import Footer from "./components/common/Footer";

function App() {
  const [menu, setMenu] = useState([]);
  const [reloadUserInfo, setReload] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [selectedMenu, setSelectedMenu] = useState();

  useEffect(() => {
 
    // 서버세션 확인
    loginChk();

    // 메뉴 설정
    const LoginUser = localStorage.getItem("user");
    if (LoginUser) {
      if (localStorage.getItem("role") == "ROLE_USER") {
        setMenu([
          {id: "solution", name: "솔루션 소개", url: "/solution"},
          {id: "question", name: "문의하기", url: "/question"},
          {id: "MyLicense", name: "내 라이선스", url: "/my_license"},
        ]);
      }

      if (localStorage.getItem("role") == "ROLE_ADMIN") {
        const tmpMenu = [...menu]
        tmpMenu.push(
            {id: "solution", name: "솔루션 소개", url: "/solution"},
            {id: "question", name: "문의하기", url: "/question"},
            {id: "admin-question", name: "문의글 관리", url: "/admin/management/question"},
            {id: "admin-license", name: "라이선스 관리", url: "/admin/management/license"},
            {id: "MyLicense", name: "내 라이선스", url: "/my_license"},
        )
        setMenu(tmpMenu);
      }
    } else {
      setMenu([
        {id: "solution", name: "솔루션 소개", url: "/solution"},
        {id: "question", name: "문의하기", url: "/question"},
      ]);
    }
  }, [reloadUserInfo]);

  const loginChk = () => {
    fetch("/api/loginChk", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => res.json())
        .then((json) => {
          if (!json.data) {
            if (localStorage.getItem("user") && localStorage.getItem("role")) {
              localStorage.removeItem("user");
              localStorage.removeItem("role");
              alert('세션이 만료되었습니다.');
              window.location.reload();
            }
          } else {
            setUserInfo(json.data);
          }

        });
  };

  const reloadUserinfo = () => {
    setReload(!reloadUserInfo);
  }

  return (
      <div className="App">
        <Header menu={menu} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
        <Routes>
          <Route path="/" element={<Navigate to="/solution" replace />} />
          <Route path="/solution" element={<Solution userInfo={userInfo}/>} />
          <Route path="/question" element={<QuestionPage userInfo={userInfo}/>} />
          <Route path="/my_license" element={<MyLicense userInfo={userInfo} reloadUserInfo={reloadUserinfo}/>} />
          <Route path="/admin/management/question" element={<Management userInfo={userInfo} type="mgm-question"/>} />
          <Route path="/admin/management/license" element={<Management userInfo={userInfo} type="mgm-license"/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/system" element={<System />} />
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;
