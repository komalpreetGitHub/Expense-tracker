import "./nav.css"
import { useRecoilState } from "recoil";
import { pageState } from "../../state";
// import { FaUser } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { BiMenu } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate();
    const [page, setPage] = useRecoilState(pageState);
    const [showMobileLinks, setShowMobileLinks] = useState(false);
    const [signin, setSignin] = useState(false);


    useEffect(() => {
        if (localStorage.getItem("token")) {
            setSignin(!signin);
        }
    }, []);


    const avatar = localStorage.getItem("name")?.slice(0,1)

    function logout() {
        localStorage.clear()
        navigate("/")
    }


    const handleLinkClick = () => {

        setShowMobileLinks(false);
    };

  

    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <h1
                    onClick={() => {
                        setPage("Home");
                        handleLinkClick();
                    }}>BudgetBuddy  <GiTakeMyMoney /></h1>
                </div>
                <div className="links">
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
                        <li onClick={() => {
                            setPage("Insights");
                            handleLinkClick();
                        }
                        }>Insights</li>
                    </ul>
                </div>
                <div className="main">
                    {signin ? (<button className="user">{avatar}</button>) : null}

                    {signin ? (<button className="logout-btn" onClick={logout}>
                        Log out</button>) : null}

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
                        <li onClick={() => { setPage("Insights"); handleLinkClick(); }}>Insights</li>
                        <li>Log out</li>
                    </ul>
                </div>
            )}
        </>
    );
}


