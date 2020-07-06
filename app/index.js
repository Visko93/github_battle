import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { ThemeProvider } from './contexts/theme'

import Popular from './components/Popular'
import Battle from "./components/Battle";
import Nav from "./components/Nav";
import Results from './components/Results';


import './index.css';


// Components
// States
// Lifecycle
// UI

class App extends React.Component {
  state = {
    theme: 'light',
    toogleTheme: () => {
      this.setState(({theme}) => ({
        theme: theme === 'light' ? 'dark': 'light'
      }))
    }

  }
  render () {
    return(
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
            <Nav />
              <Switch>
                <Route exact path='/' component={Popular} />
                <Route exact path='/battle' component={Battle} />
                <Route path='/battle/results' component={Results}/>
                <Route render={() => <h1>404</h1>}/>
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Router>

     
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);