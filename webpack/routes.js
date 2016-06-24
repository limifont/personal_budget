import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NoMatch from './components/NoMatch';
import Bills from './components/Bills';
import Bill from './component/Bill';

export default (
  <Route>
    <Route path="/" component={App} >
      <IndexRoute component={Bills} />
      <Route path="/bills" component={Bills} />
      <Route path="/bills/:id" component={Bill} />
    </Route>
    <Route path="*" status={404} component={NoMatch}/>
  </Route>
)

