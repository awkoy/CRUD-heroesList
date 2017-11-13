import React from 'react';

const Item = (props) => {

    const handleRedactClick = () => {
        props.redact();
    };

    const {
        date,
        img,
        name,
        status
    } = props;

    return (
        <div className="main__item">
            <div className="main__item__photo">
                <img src={img} alt=""/>
            </div>
            <div className="main__item__content">
                <div className="main__item__info">
                    <div className="main__item__info__name">
                        {name}
                    </div>
                    <div className="main__item__info__date">
                        {date}
                    </div>
                    <div className="main__item__info__status">
                        {status}
                    </div>
                </div>
                <button onClick={handleRedactClick} className="main__btn btn__blue">Редактировать</button>
            </div>
        </div>
    );
};

export default Item;