import React from "react";
import {Route, Switch} from "react-router-dom";

import Splash from './Splash';
import Auth from './Auth';
import Home from './Home';

const Routes: React.FC = props => {
    return <Switch>
        <Route path={'/auth'} component={Auth} />
        <Route path={'/home'} component={Home} />
        <Route path={'/'} component={Splash} />
    </Switch>;
}

export default Routes;