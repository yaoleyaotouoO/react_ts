import * as React from 'react';

import Scrollbars from 'react-custom-scrollbars';
import * as style from './index.css';
import HidePopupUtil from '../../util/hidePopup';


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
    placeholder: string;
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

        return sortData.filter(item => item.name.match(new RegExp(filterText, 'ig'))).slice(0, 300).map(item => {
            return <li key={item.id}>
                <div className={style.form_check}>
                    <label className={style.form_check_label}>
                        <input
                            type="checkbox"
                            className={style.form_check_input}
                            value={item.id}
                            checked={selectedIds.indexOf(item.id) > -1}
                            onChange={(e) => toggleCheck(e.target.checked, item.id)} />
                        <span>{item.name}</span>
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
    dropDownNode: React.Ref<HTMLDivElement>;
    ulNode: React.Ref<HTMLDivElement>;
    hidePopupUtil: { clear: () => void };

    constructor(props: IDropDownWithFilterProps) {
        super(props);

        const { height = DEFAULT_HEIGHT } = props;
        this.state = {
            filterText: '',
            open: false,
            height
        }

        this.dropDownNode = React.createRef();
        this.ulNode = React.createRef();
    }

    componentDidMount() {
        this.hidePopupUtil = HidePopupUtil.init((this.dropDownNode as any).current, () => {
            if (this.state.open) {
                this.setState({ open: false });
            }
        })
    }

    componentWillUnmount() {
        this.hidePopupUtil && this.hidePopupUtil.clear();
    }

    componentWillReceiveProps(nextProps: IDropDownWithFilterProps) {
        let count = nextProps.data.rawData.length;
        this.autoScrollHandle(count ? count++ : count);
    }

    getPlaceHolderText = () => {
        const { data: { selectedIds, rawData }, placeholder } = this.props;

        if (!selectedIds.length) {
            return placeholder;
        } else if (selectedIds.length === rawData.length) {
            return `All selected(${rawData.length})`;
        } else if (selectedIds.length >= 4) {
            return `selected(${selectedIds.length})`;
        }

        let textArr: string[] = [];
        rawData.map(x => {
            if (selectedIds.indexOf(x.id) > -1) {
                textArr.push(x.name);
            }
        });

        return textArr.join(', ');
    }

    toggleSelection = () => {
        this.setState({ open: !this.state.open });

        if (this.input) {
            setTimeout(() => {
                this.input.focus();
            }, 100);
        }
    }

    searchTextOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { rawData } = this.props.data;

        let filterText = e.target.value;
        let count = rawData.filter(item => item.name.match(new RegExp(filterText, 'ig'))).length;

        if (!filterText) {
            count = rawData.length;
            count ? count++ : count;
        }

        this.autoScrollHandle(count);
        this.setState({ filterText });
    }

    clearSearchText = () => {
        let count = this.props.data.rawData.length;
        this.autoScrollHandle(count ? count++ : count);
        this.setState({ filterText: '' });
    }

    onToggleCheck = (checked: boolean, checkedId: number) => {
        let top = this.scroll.getScrollTop();
        requestAnimationFrame(() => {
            this.scroll.scrollTop(top);
        })

        this.props.toggleCheck(checked, checkedId);
    }

    autoScrollHandle = (count: number) => {
        const { height = DEFAULT_HEIGHT } = this.props;
        this.setState({ height: count * 37 >= height ? height : count * 37 });
    }

    render() {
        const { open, filterText, height } = this.state;
        const { data: { rawData, selectedIds }, toggleCheckAll } = this.props;

        const showSelectAll = this.state.filterText === '' && rawData.length !== 0;
        const selectedAll = rawData.length === selectedIds.length;

        const getDropdownStyle = () => {
            const defaultStyle = `${style.dropdown_menu} ${style.multi_select_dropdown}`;

            return open ? `${defaultStyle} ${style.show}` : defaultStyle;
        }

        return <div className={`${style.search_group} ${style.dropdown_filter}`} ref={this.dropDownNode}>
            <input
                readOnly
                type="text"
                className={style.form_control}
                placeholder={this.getPlaceHolderText()}
                onClick={() => this.toggleSelection()} />

            <ul className={getDropdownStyle()}>
                <li className={style.filter}>
                    <div className={style.input_group}>
                        <span className={style.input_group_addon}>
                            <i className={`${style.fa} ${style.fa_search}`}></i>
                        </span>
                        <input
                            type="text"
                            value={filterText}
                            onChange={(e) => this.searchTextOnChange(e)}
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
                    style={{ height }}
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
                                                onChange={(e) => toggleCheckAll(e.target.checked)}
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
                                    toggleCheck={(checked: boolean, checkedId: number) => this.onToggleCheck(checked, checkedId)}
                                    filterText={filterText} /> :
                                null
                        }
                    </div>
                </Scrollbars>
            </ul>
        </div>;
    }
}
