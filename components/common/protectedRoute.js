

import React from "react";
import { Route, Redirect } from "react-router-dom";

import cookie from '../../utils/cookie';

export const ProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (cookie.get('googleAuthId')[0]) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;
