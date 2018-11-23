import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import RootStore from './store/store';

import 'antd/dist/antd.css';
import './assets/style/main.css';

import Task from './containers/task';
import Design from './containers/design';
import Select from './containers/design/components/select';
import Animation from './components/animation';


const rootStore = new RootStore();
ReactDOM.render(
    <Provider rootStore={rootStore}>
        <HashRouter>
            <Switch>
                <Route exact path='/' render={(props) => <Task {...props} />}></Route>
                <Design>
                    <Switch>
                        <Route path='/design/select' render={() => <Select />}></Route>
                        <Route path='/design/animation' render={() => <Animation />}></Route>
                    </Switch>
                </Design>
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)
