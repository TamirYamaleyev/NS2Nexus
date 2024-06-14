import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import HomePage from "../Pages/HomePage";
import PlayerPage from "../Player/PlayerPage";
import RoundPage from "../Round/RoundPage";
//import SignupPage from "../User/SignupPage";
//import LoginPage from "../User/LoginPage";

export default function Router() {
    return (
        <Routes>
            <Route path={ROUTES.ROOT} element={<HomePage/>} />
            <Route path={`${ROUTES.PLAYER}/:playerId`} element={<PlayerPage />} />
            <Route path={`${ROUTES.ROUND}/:roundId`} element={<RoundPage />} />

            {/*<Route path={ROUTES.LOGIN} element={<LoginPage />} />*/}
            {/*<Route path={ROUTES.SIGNUP} element={<SignupPage />} />*/}
        </Routes>
    )
}