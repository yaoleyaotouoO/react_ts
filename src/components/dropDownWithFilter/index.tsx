import * as React from 'react';

import Scrollbars from 'react-custom-scrollbars';
import * as style from './index.css';


export interface IIdName {
    id: number;
    name: string;
}

export interface IDropDownConfing {
    rawData: IIdName[];
    selectedIds: number[];
}

export interface IDropDownWithFilterProps {
    height?: number;
    data: IDropDownConfing;
    toggleCheck: Function;
    toggleCheckAll: Function;
}

export interface IDropDownWithFilterState {
    filterText: string;
    open: boolean;
    height: number;
}

export interface IContentLiProps {
    data: IIdName[];
    selectedIds: number[];
    toggleCheck: Function;
    filterText: string;
}

export interface IContentLiState {

}

class ContentLi extends React.Component<IContentLiProps, IContentLiState> {
    constructor(props: IContentLiProps) {
        super(props);
    }

    render() {
        const { data, selectedIds, toggleCheck, filterText } = this.props;

        let sortData: IIdName[] = [];
        data.forEach((item) => {
            selectedIds.indexOf(item.id) > -1 ? sortData.unshift(item) : sortData.push(item);
        });

        return sortData.map(data => {
            return <li key={data.id}>
                <div className={style.form_check}>
                    <label className={style.form_check_label}>
                        <input
                            type="checkbox"
                            className={style.form_check_input}
                            value={data.id}
                            checked={selectedIds.indexOf(data.id) > -1}
                            onChange={() => toggleCheck(data)} />
                        <span>{data.name}</span>
                    </label>
                </div>
            </li>;
        });
    }
}


const DEFAULT_HEIGHT = 350;
export class DropDownWithFilter extends React.Component<IDropDownWithFilterProps, IDropDownWithFilterState>{
    input: HTMLInputElement;
    scroll: Scrollbars;
    groupNode: React.Ref<HTMLDivElement>;
    ulNode: React.Ref<HTMLDivElement>;

    constructor(props: IDropDownWithFilterProps) {
        super(props);

        const { height = DEFAULT_HEIGHT } = props;
        this.state = {
            filterText: '',
            open: false,
            height
        }

        this.groupNode = React.createRef()
        this.ulNode = React.createRef()
    }

    getPlaceHolderText = () => {
        return 'Filter by Service Category';
    }

    toggleSelection = () => {
        this.setState({ open: !this.state.open });
    }

    searchTextOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    clearSearchText = () => {

    }

    onToggleCheckAll = () => {
        this.props.toggleCheckAll();
    }

    render() {
        const { open, filterText, height } = this.state;
        const { data: { rawData, selectedIds }, toggleCheck } = this.props;

        const showSelectAll = this.state.filterText === '' && rawData.length !== 0;
        const selectedAll = rawData.length === selectedIds.length;

        const getDropdownStyle = () => {
            const defaultStyle = `${style.dropdown_menu} ${style.multi_select_dropdown}`;

            return open ? `${defaultStyle} ${style.show}` : defaultStyle;
        }

        return <div className={style.select_body}>
            <div
                className={`${style.search_group} ${style.dropdown_filter}`}
                ref={this.groupNode}>
                <input
                    readOnly
                    type="text"
                    className={style.form_control}
                    placeholder={this.getPlaceHolderText()}
                    onClick={() => this.toggleSelection()} />
                <ul className={getDropdownStyle()}>
                    <li className={style.filter} value="0">
                        <div className={style.input_group}>
                            <span className={style.input_group_addon}>
                                <i className={`${style.fa} ${style.fa_search}`}></i>
                            </span>
                            <input
                                type="text"
                                value={filterText}
                                onChange={(e) => this.searchTextOnchange(e)}
                                className={style.form_control}
                                placeholder="Search"
                                ref={(dom) => { this.input = dom; }} />
                            <span
                                onClick={() => this.clearSearchText()}
                                className={style.input_group_addon}>
                                <a className={style.multi_clear_filter}>
                                    <i className={style.mdi_navigation_close}></i>
                                </a>
                            </span>
                        </div>
                    </li>

                    <Scrollbars
                        ref={(dom) => { this.scroll = dom; }}
                        style={{ height: height }}
                        autoHide>
                        <div ref={this.ulNode}>
                            {
                                showSelectAll ?
                                    <li>
                                        <div className={style.form_check}>
                                            <label className={style.form_check_label}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAll}
                                                    onChange={() => this.onToggleCheckAll()}
                                                    className={style.form_check_input} />
                                                <span>Select All</span>
                                            </label>
                                        </div>
                                    </li> :
                                    null
                            }
                            {
                                open ?
                                    <ContentLi
                                        data={rawData}
                                        selectedIds={selectedIds}
                                        toggleCheck={() => { }}
                                        filterText={filterText} /> :
                                    null
                            }
                        </div>
                    </Scrollbars>
                </ul>
            </div>
        </div>
    }
}
