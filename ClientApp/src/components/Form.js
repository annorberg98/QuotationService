import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import OptionsCheckbox from './OptionCheckbox';

export class Form extends Component {
    static displayName = "Form";

    constructor(props) {
        super(props);
        this.state = {
            city: "",
            surface: "",
            unitPrice: null,
            isLoading: false,
            error: 0,
            dataRecieved: false,
            checkboxes: [],
        };

        this.cityChange = this.cityChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.createCheckbox = this.createCheckbox.bind(this);
        this.createCheckboxlist = this.createCheckboxlist.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.surfaceChange = this.surfaceChange.bind(this);
    }

    handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            }
        }));
    };

    createCheckbox(option) {
        return (
            <OptionsCheckbox
                label={option}
                isSelected={this.state.checkboxes[option]}
                onCheckboxChange={this.handleCheckboxChange}
                key={option}
            />
        );
    }

    createCheckboxlist = () => {
        return this.state.options.map(this.createCheckbox);
    }

    cityChange(event) {
        this.setState({ city: event.target.value });

        this.populatePriceData(event.target.value);
    }

    surfaceChange(event) {
        if (Number(event.target.value)) {
            this.setState(prevState => ({
                error: prevState.error + 1
            }));
        }
        this.setState({ surface: event.target.value });
    }

    async populatePriceData(city) {
        this.setState({ isLoading: true });

        if (city === "DEFAULT") {
            return;
        }

        const params = new URLSearchParams();
        params.append('city', city.toLowerCase());

        await axios.get("/options", {
            params: params
        }).then(result => {
            let availableOptions = Object.keys(result.data.Options);
            let boxes = {};
            availableOptions.forEach((entry) => {
                boxes[entry] = false;
            });

            this.setState({
                unitPrice: result.data,
                isLoading: false,
                dataRecieved: true,
                checkboxes: boxes,
                options: availableOptions
            });
        }
        ).catch(error => this.setState({
            error,
            isLoading: false,
            dataRecieved: false,
        }));
    }

    async onFormSubmit(event) {
        event.preventDefault();

        if (this.state.error < 0) {
            return;
        }

        let city = this.state.city;
        let surface = this.state.surface;
        let selectedOptions = [];

        Object.keys(this.state.checkboxes)
            .filter(checkbox => this.state.checkboxes[checkbox])
            .forEach(checkbox => {
                selectedOptions.push(checkbox);
            });

        await this.RequestQuotation(city, selectedOptions, surface);


        this.props.setPage("Quotation")
    }

    async RequestQuotation(city, selectedOptions, surface) {
        const params = new URLSearchParams();
        params.append('city', city);
        params.append('surface', surface);
        params.append('options', JSON.stringify(selectedOptions));

        await axios.get('/offer', {
            params: params
        }).then(result => {
            this.props.setQoutation(result.data);
        });
    }

    renderCityForm() {
        return (
            <div>
                <h1>Form</h1>

                <p>This is a simple example of a React component.</p>

                <form>
                    <p><label>City: </label>
                        <select value={this.state.city} onChange={this.cityChange}>
                            <option value="DEFAULT" default>Select City</option>
                            <option value="Stockholm">Stockholm</option>
                            <option value="Uppsala">Uppsala</option>
                        </select>
                    </p>
                </form>
            </div>
        );
    }

    renderFullForm() {
        return (
            <div>
                <h1>Form</h1>

                <p>This is a simple example of a React component.</p>

                <form>
                    <p><label>City: </label>
                        <select value={this.state.city} onChange={this.cityChange}>
                            <option value="DEFAULT" default>Select City</option>
                            <option value="Stockholm">Stockholm</option>
                            <option value="Uppsala">Uppsala</option>
                        </select>
                    </p>
                    <p><label>Surface to clean: </label>
                        <input type="number" value={this.state.surface} onChange={this.surfaceChange} />
                    </p>
                    <p><label>Select options: </label></p>
                    {this.createCheckboxlist()}

                    <div>
                        <Button variant="success" onClick={this.onFormSubmit}>Request quotation</Button>{''}
                    </div>
                </form>
            </div>
        );
    }

    render() {
        if (!this.state.dataRecieved) {
            return this.renderCityForm();
        } else {
            return this.renderFullForm();
        }
    }
}