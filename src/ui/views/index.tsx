import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import AppRoutes from "../../core/models/static/routes/app-routes";
import SortingView from "./sorting";


const ApplicationViews = () => {

    return (
        <>
            <Routes>
                <Route path={AppRoutes.landing} element={<SortingView/>}/>

                {/* --- Redirect ---*/}
                <Route
                    index
                    path={'*'}
                    element={<Navigate to={AppRoutes.landing} replace/>}
                />
            </Routes>
        </>
    );
}

export default ApplicationViews;
