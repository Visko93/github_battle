import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from './contexts/theme'

import Popular from './components/Popular'
import Battle from "./components/Battle";
import Nav from "./components/Nav";


import './index.css';


// Components
// States
// Lifecycle
// UI

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: 'light',
      toogleTheme: () => {
        this.setState(({theme}) => ({
          theme: theme === 'light' ? 'dark': 'light'
        }))
      }

    }
  console.log(this.state.theme)

  }
  render () {
    return(
      <ThemeProvider value={this.state}>
         <div className={this.state.theme}>
           <div className='container'>
            <Nav />
            <Popular />
          </div>
         </div>
      </ThemeProvider>
     
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);