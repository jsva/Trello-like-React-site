import React from 'react';
import Card from './Card';

class List extends React.Component {

    render() {
        return(
            <div className="list">
                <div>
                    <p>{this.props.list.title}</p>

                </div>
            </div>
        );
    }

}

export default List;

