import React, { Component } from 'react';
import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

// Below is how we make it so that the configurestore is available to all files.
// wrapping everything in Provider
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
         <div className="App">
           <Main />
         </div>
       </BrowserRouter>
     </Provider>
    );
  }
}
export default App;
