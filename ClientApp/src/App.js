import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Form } from './components/Form';

import './custom.css'
import { Container } from 'reactstrap';

export default class App extends Component {
  static displayName = App.name;

    render() {
        console.log(React.version)
      return (
          <div>
              <Container>
                  <Form />
              </Container>
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
