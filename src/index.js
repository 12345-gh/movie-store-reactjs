import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/App';
import Popular from './components/Pages/Popular/Popular';
import Search from './components/Pages/Search/Search';
import Favorites from './components/Pages/Favorites/Favorites';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Popular}/>
			<Route path="/search" component={Search}/>
			<Route path="/favorites" component={Favorites}/>
		</Route>
	</Router>
), document.getElementById('root'));

registerServiceWorker();
