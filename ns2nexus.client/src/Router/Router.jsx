import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";

import HomePage from "../Pages/HomePage";
import PlayerPage from "../Player/PlayerPage";

export default function Router() {
    return (
        <Routes>
            <Route path={ROUTES.ROOT} element={<HomePage/>} />
            <Route path={`${ROUTES.PLAYER}/:playerId`} element={<PlayerPage/>} />
        </Routes>
    )
}