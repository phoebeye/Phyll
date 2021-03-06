import * as Tether        from 'tether';
import Bootstrap          from 'bootstrap';
import React              from 'react';
import { Provider }       from 'react-redux';
import { render }         from 'react-dom';
import { createHistory }  from 'history';
import {
  Router,
  Route,
  Redirect,
  browserHistory,
  IndexRoute,
  useRouterHistory, }     from 'react-router';

import makeStore          from './redux/store/store';
import App                from './views/app.jsx';
import Home               from './views/home.jsx';
import About              from './views/about.jsx';
import Conservatory       from './views/conservatory.jsx';

const history = useRouterHistory(createHistory)({
  basename: '/base-path'
});

// Import stylesheets
require('./stylesheets/main.scss');

// INSTANTIATE new Redux Store
export const store = makeStore();

require('./stylesheets/main.scss');

// ES6 CLASS SYNTAX TO CREATE A REACT COMPONENT
class MyApp extends React.Component {

  render() {

    return (

      <Provider store={ store }>
        <Router history={ browserHistory }>
          <Route path='/' component={ App }>
            <IndexRoute component={ Home } />
            <Route path='conservatory' component={ Conservatory } />
            <Route path='about' component={ About } />
          </Route>
          <Redirect from="*" to="/" />
        </Router>
      </Provider>

    );
    
  }
}

render(<MyApp />, document.getElementById('app'));
