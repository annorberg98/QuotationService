import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import OptionsCheckbox from './OptionCheckbox';

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableCities: [],
            city: "",
            surface: "",
            unitPrice: null,
            error: null,
            dataRecieved: false,
            checkboxes: [],
        };

        this.cityChange = this.cityChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.createCheckbox = this.createCheckbox.bind(this);
        this.createCheckboxlist = this.createCheckboxlist.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.surfaceChange = this.surfaceChange.bind(this);
        this.createSelectOption = this.createSelectOption.bind(this);
        this.renderCityOptions = this.renderCityOptions.bind(this);
    }

    componentWillMount() {
        this.getCities();
    }

    //Requests the available cities from backend
    async getCities() {
        await axios.get('/city').then(result => {
            this.setState({
                availableCities: result.data
            });
        });
        console.log(this.state.availableCities);
    }

    //Handler for selecting checkboxes
    handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            }
        }));
    };

    //Creates singel option in dropdown
    createSelectOption(city) {
        return (
            <option key={city} value={city}>{city}</option>
        );
    }

    //Renders items in city dropdown
    renderCityOptions() {
        return (this.state.availableCities.map(this.createSelectOption));
    }

    //Renders a checkbox
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

    //Renders the list of checkboxes
    createCheckboxlist = () => {
        return this.state.options.map(this.createCheckbox);
    }

    //Handler for selecting City
    cityChange(event) {
        this.setState({ city: event.target.value });

        this.getCityPriceData(event.target.value);
    }

    //Handler for entering surface to clean
    surfaceChange(event) {
        const reg = /^[0-9\b]+$/;

        if (event.target.value === '' || reg.test(event.target.value)) {
            this.setState({ surface: event.target.value });
        }
    }

    //Sends request to the backend with the City selected
    async getCityPriceData(city) {
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
                dataRecieved: true,
                checkboxes: boxes,
                options: availableOptions
            });
        }
        ).catch(error => this.setState({
            error,
            dataRecieved: false,
        }));
    }

    //Submits the form and sends all data to backend, recieving a Quotation object
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

    // Sends the request to backend
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

    //Renders the first form
    renderCityForm() {
        return (
            <div>
                <h1>Request quotation</h1>

                <form>
                    <p><label>City: </label>
                        <select value={this.state.city} onChange={this.cityChange}>
                            <option value="DEFAULT" default>Select City</option>
                            {this.renderCityOptions()}
                        </select>
                    </p>
                </form>
            </div>
        );
    }

    //Renders the full form containing data from backend
    renderFullForm() {
        return (
            <div>
                <h1>Request quotation</h1>

                <form>
                    <p><label>City: </label>
                        <select value={this.state.city} onChange={this.cityChange}>
                            <option value="DEFAULT" default>Select City</option>
                            <option value="Stockholm">Stockholm</option>
                            <option value="Uppsala">Uppsala</option>
                        </select>
                    </p>
                    <p><label>Surface to clean (m<sup>2</sup>): </label>
                        <input type="number" value={this.state.surface} onChange={this.surfaceChange} />
                    </p>
                    <p><label>Select aditional options options: </label></p>
                    {this.createCheckboxlist()}

                    <div>
                        <Button variant="success" onClick={this.onFormSubmit} disabled={this.state.surface.length < 1}>Request quotation</Button>{''}
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