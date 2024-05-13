import "./nav.css"
import { useRecoilState } from "recoil";
import { pageState } from "../../state";
import { FaUser } from "react-icons/fa6";
import { useState,useEffect } from "react";
import { BiMenu } from "react-icons/bi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const [page, setPage] = useRecoilState(pageState);
    const [showMobileLinks, setShowMobileLinks] = useState(false);
    const[signin ,setSignin] = useState(false);

    const handleLinkClick = () => {
        
        setShowMobileLinks(false);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setSignin(!signin);
        }
    }, []);


    function logout() {
      localStorage.clear()
        navigate("/signup")
    }

    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <h1>BudgetBuddy  <FaHandHoldingDollar /></h1>
                </div>
                <div  className="links">
                    <ul>
                        <li onClick={() => {
                            setPage("Home");
                            handleLinkClick();
                        }
                        }>Home</li>
                        <li onClick={() => {
                            setPage("Expenses");
                            handleLinkClick();
                        }
                        }>Expenses</li>
                        <li onClick={() => {
                            setPage("Reports");
                            handleLinkClick();
                        }
                        }>Reports</li>
                        <li>Settings</li>
                    </ul>
                </div>
                <div className="main">
                    <button className="user"><FaUser /></button>

              {signin?( <button className="logout-btn" onClick={logout}>
                  Log out</button>):null}

                    <button className="menu-btn" onClick={() => setShowMobileLinks(!showMobileLinks)}>
                    <BiMenu />
          </button>
                </div>
            </div>

            {showMobileLinks && (
        <div className="mobile-navbar">
          <ul className="mobile-links">
            <li onClick={() => { setPage("Home"); handleLinkClick(); }}>Home</li>
            <li onClick={() => { setPage("Expenses"); handleLinkClick(); }}>Expenses</li>
            <li onClick={() => { setPage("Reports"); handleLinkClick(); }}>Reports</li>
            <li>Settings</li>
            <li>Log out</li>
          </ul>
        </div>
      )}
        </>
    );
}


