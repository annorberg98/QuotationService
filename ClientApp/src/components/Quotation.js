import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

export class Quotation extends React.Component {

    constructor(props) {
        super(props);

        this.setNewPage = this.setNewPage.bind(this);
    }
    // Renders selected options with price
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

    //Changes page
    setNewPage() {
        this.props.setPage("Form");
    }

    render() {
        return (
            <div>
                <Container>
                    <h1>Quotation</h1>
                    <Card>
                        <Card.Body>
                            <Card.Title><h2>{this.props.qoute.city}</h2></Card.Title>
                            <Card.Subtitle>Surface Unit Price: {this.props.qoute.surfaceUnitPrice} kr/m<sup>2</sup></Card.Subtitle>
                            <div>
                                <p>Selected amount of m<sup>2</sup>: {this.props.qoute.surfaceToClean}</p>
                                <div>{this.renderOptions()}</div>
                                <p><b>Total Price: {this.props.qoute.totalPrice}kr</b></p>
                            </div>
                            <div>
                                <Button variant="success" onClick={this.setNewPage}>Request new quotation</Button>{''}
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}