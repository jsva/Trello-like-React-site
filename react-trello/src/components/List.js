import React from 'react';
import Card from './Card';

class List extends React.Component {

    render() {
        return(
            <div>
                <p>list component</p>
                <Card />
                <Card />
                <Card />
            </div>
        );
    }

}

export default List;

