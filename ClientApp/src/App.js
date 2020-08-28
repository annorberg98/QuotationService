import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Form } from './components/Form';
import { Quotation } from './components/Quotation';

import './custom.css'
import { Container } from 'reactstrap';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>


        <Layout>
          <Route exact='/' component={Form} />
          <Route exact path='/quotation' component={Quotation} />
        </Layout>
      </div>
      /*<Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/form' component={Form} />
      </Layout> */
    );
  }
}
