import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import RootStore from './store/store';

import 'antd/dist/antd.css';
import './assets/style/main.css';

// import Task from './containers/task';
import Design from './containers/design';
// import Select from './containers/design/components/select';
// import Animation from './containers/design/components/animation';

//const Design = React.lazy(() => import('./containers/design'));
const Select = React.lazy(() => import(/* webpackChunkName: 'select' */ './containers/design/components/select'));
const Animation = React.lazy(() => import(/* webpackChunkName: 'animation' */ './containers/design/components/animation'));

const rootStore = new RootStore();
ReactDOM.render(
    <HashRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
            <Design>
                <Switch>
                    <Route path='/design/select' render={() => <Select />}></Route>
                    <Route path='/design/animation' render={() => <Animation />}></Route>
                </Switch>
            </Design>
        </React.Suspense>
    </HashRouter>,
    document.getElementById('root')
)
