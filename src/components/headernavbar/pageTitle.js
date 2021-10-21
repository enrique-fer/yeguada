import React, { Component } from 'react';

class PageTitle extends Component {
    constructor() {
        super();
    }

    render() {
        const { className, title } = this.props;

        return (
            <div className={`${className} page-title`}>
                <h1>{title}</h1>
            </div>
        );
    }
}

export default PageTitle;