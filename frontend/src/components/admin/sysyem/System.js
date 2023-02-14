import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import SolutionManagement from "./solution-management/SolutionManagement";
import UserManagement from "./user-management/UserManagement";
import LicenseManagement from "./licnese-management/LicenseManagement";
import "../../../assets/css/system.css"

function System() {
    const [selectedSystemMenu, setSelectedSystemMenu] = useState({id: 'SolutionManagement', name: '솔루션 관리'});
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("role") != 'ROLE_ADMIN') {
            // window.location = "/";
            navigate('/');
        }

    }, [selectedSystemMenu])

    const changeMenu = ({target})  => {
      if(target.tagName != 'LI') return;

      setSelectedSystemMenu({id: target.dataset.menu, name: target.textContent});
    }

    return (
      <div className="system">
        <ul className="system-nav" onClick={changeMenu}>
            <li data-menu="SolutionManagement" className={selectedSystemMenu.id == 'SolutionManagement' ? 'selected' : ''}>솔루션 관리</li>
            <li data-menu="UserManagement" className={selectedSystemMenu.id == 'UserManagement' ? 'selected' : ''}>사용자 관리</li>
            <li data-menu="LicenseManagement" className={selectedSystemMenu.id == 'LicenseManagement' ? 'selected' : ''}>발급 라이선스 관리</li>
        </ul>

        <div>
          <div className="title">{selectedSystemMenu.name}</div>
          {
            selectedSystemMenu.id == 'SolutionManagement' && <SolutionManagement/> 
          }
          {
            selectedSystemMenu.id == 'UserManagement' && <UserManagement/> 
          }
          {
            selectedSystemMenu.id == 'LicenseManagement' && <LicenseManagement/> 
          }
        </div>
      </div>
    );
}

export default System;
