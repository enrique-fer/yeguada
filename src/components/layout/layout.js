import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../../history';

class Layout extends Component {
    constructor() {
        super();
    }

    // Añadir reducer para featuresCards y navLinks

    render() {
        return (
            <div className="layout">
                {/* Headers */}

                <Router history={history}>
                    <Switch>
                        <Route path='/' exact component={Home} />

                        {/* Other routes */}
                    </Switch>
                </Router>

                {/* Footer */}
            </div>
        );
    }
}

export default Layout;