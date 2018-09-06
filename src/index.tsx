import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import RootStore from './store/store';

import Task from './containers/task';


const rootStore = new RootStore();
(window as any).rootStore = rootStore;
ReactDOM.render(
    <Provider rootStore={rootStore}>
        <HashRouter>
            <Switch>
                <Route exact path='/' render={() => <Task />}></Route>
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)
