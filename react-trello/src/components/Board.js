import React from 'react';
import List from './List';
import data from '../sampleData';
import {listsRef} from '../firebase';

class Board extends React.Component {

    state = {
        currentLists: []
    };

    componentDidMount() {
        this.setState( {currentLists: data.lists});
    }

    addBoardInput = React.createRef()

    createNewList = async (e) => { 
        try {
        e.preventDefault();
        const list = {
            title: this.addBoardInput.current.value,
            board: this.props.match.params.boardId,
            createdAt: new Date()
        }
        if(list.title && list.board) {
            await listsRef.add({ list });
            this.addBoardInput.current.value = '';
        }
    } catch(error) {
        console.error('Error creating a new list ', error);
    }
}

    render() {
        return (
            <div
            className="board-wrapper"
            style={{
                backgroundColor: this.props.location.state.background
            }}>
            <div className="board-header">
                <h3>{this.props.location.state.title}</h3>
                <button>Delete board</button>
            </div>
            <div className="'lists-wrapper">
                {Object.keys(this.state.currentLists).map(key => 
                    <List key={this.state.currentLists[key].id}
                    list={this.state.currentLists[key]} />
                )}
            </div>
            <form onSubmit={this.createNewList} className="new-list-wrapper">
                <input 
                type="text"
                ref = {this.addBoardInput}
                name="name"
                placeholder=" + New List" />
            </form>
            </div>
        );
    }
}

export default Board;