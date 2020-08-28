import React, { Component } from 'react';
import { Form } from './components/Form';
import { Quotation } from './components/Quotation';

import './custom.css'
import { Container } from 'reactstrap';

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = {
      page: "Form",
      quotation: {}
    }

    this.setQoutation = this.setQoutation.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  //Sets quotaion in state
  setQoutation(value) {
    this.setState({ quotation: value });
  }

  // Changes current page
  setPage(value) {
    this.setState({ page: value });
    if (value === "Form") {
      this.setState({ quotation: {} });
    }
  }

  renderPage() {
    if (this.state.page === "Form") {
      return (<Form setPage={this.setPage} setQoutation={this.setQoutation} />);
    } else if (this.state.page === "Quotation") {
      return (<Quotation qoute={this.state.quotation} setPage={this.setPage} />);
    }
  }

  render() {
    return (
      <div>
        <Container>
          {this.renderPage()}
        </Container>
      </div>
    );
  }
}
