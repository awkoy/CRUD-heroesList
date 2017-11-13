import React, {Component} from 'react';
import {connect} from 'react-redux';

import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import 'moment/locale/ru';

import Item from './../components/Item/item';
import ItemRedactor from './itemRedactor';

import {loadItems, saveItem, deleteItem } from "./../actions/CRUD";
import {loadStatus} from "./../actions/statusAction";
import {searchItem} from "./../actions/searchAction";
import {sortAction} from "./../actions/sortAction";

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            directionSort: true,
            redactItem: this.props.items.find(el => el.id === 1)
        }
    }

    componentDidMount() {
        this.props.loadStatus();
        this.props.loadItems();
    }

    componentWillReceiveProps(nextProps) {
        if ( Object.keys(this.props.items).length !== Object.keys(nextProps.items).length ){
            this.setState({ redactItem: nextProps.items[0] });
        }
    }

    // redact list handlers
    handleSearch = (e) => {
        e.key === 'Enter' && this.props.searchItem(this.itemSearchInput.value);
    };
    handleSort = () => {
        this.props.sortAction();
        this.setState({directionSort: !this.state.directionSort});
    };

    // redact item handlers
    redactItem = (id) => {
        this.setState({redactItem: this.props.items.find(el => el.id === id)});
        window.scrollTo(0, 0);
    };
    deleteItem = (id) => {
        this.props.deleteItem(id);
    };

    render() {

        const { status } = this.props;
        const { directionSort, redactItem = {} } = this.state;

        return (
            <div className="container">

                {/*item redactor begin*/}
                {(Object.keys(redactItem).length > 0) &&
                    <ItemRedactor
                        itemID={redactItem.id}
                        fName={redactItem.first_name}
                        lName={redactItem.last_name}
                        date={redactItem.birth_date}
                        img={redactItem.image}
                        rang={status[redactItem.post-1].name}
                        post={redactItem.post}
                        text={redactItem.description}
                        delete={this.deleteItem}
                        save={this.props.saveItem}
                    />
                }
                {/*item redactor end*/}

                {/*item list begin*/}
                <div className="main__list">

                    {/*item control-block begin*/}
                    <div className="main__list__control">
                        <div className="main__list__search">
                            <FontAwesome
                                className='main__list__search__icon'
                                name='search'
                            />
                            <input
                                type="text"
                                placeholder="Поиск"
                                onKeyPress={this.handleSearch}
                                ref={(input) => {this.itemSearchInput = input}}/>
                        </div>
                        <div className="main__list__sort" onClick={this.handleSort}>
                            По возрасту
                            {directionSort ?
                                <FontAwesome
                                    className='main__list__search__icon'
                                    name='arrow-down'/>
                                :
                                <FontAwesome
                                    className='main__list__search__icon'
                                    name='arrow-up'
                                />
                            }
                        </div>
                    </div>
                    {/*item control-block end*/}

                    {/*items begin*/}
                    {this.props.items.length === 0 &&
                        <span className="main__list__error">
                            Ничего не найдено
                        </span>
                    }
                    {this.props.items.map((item) =>
                        <Item
                            key={item.id}
                            id={item.id}
                            img={item.image}
                            name={`${item.first_name} ${item.last_name}`}
                            date={moment(item.birth_date).format("LL")}
                            status={status[item.post - 1].name}
                            description={item.description}
                            redact={() => {
                                this.redactItem(item.id)
                            }}
                        />
                    )}
                    {/*items end*/}
                </div>
                {/*item list end*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.item,
        status: state.status
    }
};

const mapDispatchToProps = {
    loadStatus,
    loadItems,
    searchItem,
    sortAction,
    saveItem,
    deleteItem
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);