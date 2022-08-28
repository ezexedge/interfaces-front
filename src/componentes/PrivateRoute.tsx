import React, { Component, PropsWithChildren } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isAuth} from '../helpers'


const PrivateRoute = ({ component: Component, ...rest }: PropsWithChildren) => (
    <Route
        {...rest}
        render={props =>
            isAuth() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    ></Route>
);

export default PrivateRoute;