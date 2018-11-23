import * as React from 'react';
import { Layout } from 'antd';
import { NavLink } from 'react-router-dom';


export interface IDesignProps {

}

export interface IDesignState {

}

export default class Design extends React.Component<IDesignProps, IDesignState>{
    constructor(props: IDesignProps) {
        super(props);
    }

    render() {
        const { Sider } = Layout;

        return <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => { console.log(broken); }}
                onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
            >
                <div className="logo" />
                <ul>
                    <li>
                        <NavLink to={'/design/select'} activeClassName='active'>Select</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/design/animation'} activeClassName='active'>Animation</NavLink>
                    </li>
                </ul>
            </Sider>
            {this.props.children}
        </Layout>;
    }
}