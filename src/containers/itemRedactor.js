import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { loadStatus } from "./../actions/statusAction";

class ItemRedactor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            startDate: moment(this.props.date),
            itemID: this.props.itemID,
            rang: this.props.rang,
            rangID: this.props.post,
            fName: this.props.fName,
            lName: this.props.lName,
            text: this.props.text,
            status: this.props.status
        };
    }

    static defaultProps = {
        startDate: moment("1938-05-31T21:00:00.000Z"),
        itemID: 1,
        rang: 1,
        fName: '',
        lName: '',
        text: '',
        status: ''
    };

    handleChange = (e) => {
        let errors = {...this.state.errors};
        delete errors[e.target.name];
        this.setState({
            [e.target.name]: e.target.value,
            errors: errors
        });
    };

    handleChangeDate = (date) => {
        this.setState({
            startDate: date
        });
    };

    handleSelectChange = (el) => {
        this.setState({ rang: el.target.val })
    };

    onChange = (e) => {
        const name = e.target.name;
        this.setState({ [name]: e.target.value });
    };

    handleSelect = (val, id) => {
        this.setState({ rang: val, rangID: id });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            itemID: nextProps.itemID,
            startDate: moment(nextProps.date),
            rang: nextProps.rang,
            fName: nextProps.fName,
            lName: nextProps.lName,
            text: nextProps.text,
            status: nextProps.status
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        //validation
        let errors = {};
        if (this.state.message === '') errors.message = "Can't be empty";
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0;

        //submit
        if (isValid) {
            const { itemID, rangID, fName, lName, text, startDate } = this.state;
            const newItem = {
                id: itemID,
                first_name: fName,
                last_name: lName,
                post: rangID,
                description: text,
                image: this.props.img,
                birth_date: startDate._i
            };
            this.props.save(newItem);
        }
    };

    delete = (id) => {
        this.props.delete(id);
    };


    render() {

        const {
            startDate,
            lName,
            fName,
            rang,
            text,
            itemID,
            status,
        } = this.state;
        const { img } = this.props;

        return (
            <div className="main__container">
                <div className="main__redactor__title">Редактирование</div>
                <div className="main__redactor__content">
                    <form className="main__form"
                          onSubmit={this.handleSubmit}>

                        {/*img begin*/}
                        <div className="main__redactor__photo">
                            <img src={img} alt=""/>
                        </div>
                        {/*img end*/}

                        <div className="main__redactor__group">

                            {/*LastName begin*/}
                            <div className="main__redactor__input">
                                <input value={lName} type="text" name="lName" onChange={this.onChange} required />
                                <div className="input__placeholder">
                                    Фамилия
                                </div>
                            </div>
                            {/*LastName end*/}

                            {/*FirstName begin*/}
                            <div className="main__redactor__input">
                                <input value={fName} type="text" name="fName" onChange={this.onChange} required />
                                <div className="input__placeholder">
                                    Имя
                                </div>
                            </div>
                            {/*FirstName end*/}

                            {/*DatePicker begin*/}
                            <div className="main__redactor__input input__date">
                                <DatePicker
                                    openToDate={moment("1093-09-28")}
                                    selected={startDate}
                                    onChange={this.handleChangeDate}
                                />
                                <div className="input__placeholder">
                                    Дата рождения
                                </div>
                            </div>
                            {/*DatePicker end*/}

                            {/*Status begin*/}
                            <div className="main__redactor__input input__status">
                                <input type="text" name="rang" required
                                       value={rang}
                                       onChange={this.handleSelectChange}
                                       ref={(input) => {this.selectInput = input}}
                                />
                                <div className="input__list">
                                    {status.map((el) =>
                                        <div key={el.id} onClick={() => {this.handleSelect(el.name, el.id)}} className="input__list__item">
                                            {el.name}
                                        </div>
                                    )}
                                </div>
                                <div className="input__placeholder">
                                    Звание
                                </div>
                            </div>
                            {/*Status end*/}

                        </div>
                        <div className="main__redactor__textarea">
                            <textarea className="page__comment__form__textarea page__textarea"
                                      name="text"
                                      onChange={this.handleChange}
                                      value={text}
                                      ref={(textarea) => {this.addCommentField = textarea}}/>
                            <div className="input__placeholder">
                                Характеристика
                            </div>
                        </div>
                        <div className="main__redactor__control">
                            <button className="main__btn btn__blue">Сохранить</button>
                            <a
                                onClick={() => {this.delete(itemID)}}
                                className="main__btn btn__grey"> Удалить </a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.status
    }
};

const mapDispatchToProps = {
    loadStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemRedactor);