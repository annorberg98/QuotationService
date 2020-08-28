import React from 'react';

export class Quotation extends React.Component {
    static displayName = "Quotation";

    constructor(props) {
        super(props);
        this.state = {
            offer: {}
        }
    }

    render() {
        return (
            <h1>Quotation</h1>
        );
    }
}