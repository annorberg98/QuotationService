import React from 'react';
import { Container, Card, CardTitle, CardBody, CardSubtitle } from 'reactstrap';

export class Quotation extends React.Component {
    renderOptions() {
        if (this.props.qoute.selectedOptions.length > 0) {
            let optionsList = Object.entries(this.props.qoute.options).map(([key, val]) =>
                <li key={key}>{key}: {val}kr</li>
            );
            return (
                <ul>
                    {optionsList}
                </ul>
            );
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <h1>Quotation</h1>
                    <Card>
                        <CardBody>
                            <CardTitle><h2>{this.props.qoute.city}</h2></CardTitle>
                            <CardSubtitle>Surface Unit Price: {this.props.qoute.surfaceUnitPrice} kr/m<sup>2</sup></CardSubtitle>
                            <div>
                                <p>Selected amount of m<sup>2</sup>: {this.props.qoute.surfaceToClean}</p>
                                <div>{this.renderOptions()}</div>
                                <p><b>Total Price: {this.props.qoute.totalPrice}kr</b></p>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}