import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import reportWebVitals from './reportWebVitals';

import configureStore from './REDUX_STORE/STORE/configureStore'

const store = configureStore()

store.subscribe(() => {
	console.log("UPDAETED STORE IS :: ", store.getState())
})

const jsx = (
	<Provider store = {store}> 
		<App />
	</Provider>
)

ReactDOM.render(jsx,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();