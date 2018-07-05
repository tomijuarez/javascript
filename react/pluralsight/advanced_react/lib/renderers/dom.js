import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import StateAPI from 'state-api';


const store = new StateAPI(window.initialData);

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);