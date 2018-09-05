import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import rootStore from './store/store';

import Note from './containers/note';

(window as any).rootStore = rootStore;
ReactDOM.render(
    <Provider rootStore={rootStore}>
        <HashRouter>
            <Switch>
                <Route exact path='/' render={() => <Note />}></Route>
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)
