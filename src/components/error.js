import React, { Component } from 'react';

class ErrorPage extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="error">
                {/* imagen de error */}
                <div className="error__title">
                    Error 404
                </div>

                <div className="error__content">
                    No se pudo encontrar la pagina indicada
                </div>
            </div>
        );
    }
}

export default ErrorPage;