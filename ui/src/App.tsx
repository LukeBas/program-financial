import './App.css';
import MainHeader from "./headers/MainHeader.tsx";
import { CRFMainBody } from "./bodies/CRFMainBody.tsx";
import { FEDEBOMMainBody } from "./bodies/FEDEBOMMainBody.tsx";
import { useEffect, useState } from "react";
import { msalInstance, loginRequest, getUserProfile } from './api/AuthService.tsx';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import {HomeBody} from "./bodies/HomeBody.tsx";
import warning from "./assets/warning.png";

function App() {
    const [userName, setUserName] = useState<string>("");
    const [loadingError, setLoadingError] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const authenticateUser = async () => {
            try {
                if (typeof msalInstance.initialize === "function") {
                    await msalInstance.initialize();
                }

                const accounts = msalInstance.getAllAccounts();
                let account;

                if (accounts.length === 0) {
                    const loginResponse = await msalInstance.loginPopup(loginRequest);
                    account = loginResponse.account;
                } else {
                    account = accounts[0];
                }

                const tokenResponse = await msalInstance.acquireTokenSilent({
                    ...loginRequest,
                    account,
                });

                const userProfile = await getUserProfile(tokenResponse.accessToken);
                setUserName(userProfile.displayName);
                setIsAuthenticated(true);
                setLoadingError(false);
            } catch (error) {
                // @ts-ignore
                if(error.message == "user_cancelled: User cancelled the flow."){
                    setLoadingError(true);
                }
                console.error("Authentication error:", error);
            }
        };

        authenticateUser();
    }, []);

    if (!isAuthenticated && !loadingError) {
        return( <div className="loading-conteiner-father">
                    <div className="loading-conteiner">
                    </div>
                </div>
        )
    }

    else if(loadingError){
        return(
            <div className="loading-error">
                <h1>Authentication Error!</h1>
                <h2>User cancelled the flow.
                    <br></br>
                    Please reload the page before logging in again.
                </h2>
                <img id="warning-img" src={warning} alt="warning"/>
            </div>
        )
    } else {
        return (
            <div className="main-body">
                <MainHeader userName={userName}/>
                <BrowserRouter>
                    <ConditionalNav />
                    <Routes>
                        <Route path="/crf" element={<CRFMainBody />} />
                        <Route path="/fedebom" element={<FEDEBOMMainBody />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

function ConditionalNav() {
    const location = useLocation();

    const hideNavPaths = ["/crf", "/fedebom"];

    const shouldHideNav = hideNavPaths.includes(location.pathname);

    return (
        !shouldHideNav && (
            <>
                <HomeBody/>
            </>
        )
    );
}

export default App;
