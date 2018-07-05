import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import App from 'components/App';
import StateAPI from 'state-api/lib';
import {host, port} from 'config';


const serverRender = async () => {
  const response = await axios.get(`http://${host}:${port}/data`);
  const store = new StateAPI(response.data);

  return {
    initialMarkup: ReactDOMServer.renderToString(
      <App store={store} />
    ),
    initialData: response.data
  };
};

export default serverRender;