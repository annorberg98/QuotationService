import React from 'react';

export class Quotation extends React.Component {
    static displayName = "Quotation";


    render() {
        return (
            <div>
                <h1>Quotation</h1>
                <h2>Selected City: <em>{this.props.qoute.city}</em></h2>
            </div>
        );
    }
}