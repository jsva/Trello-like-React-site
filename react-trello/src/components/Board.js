import React from 'react';
import List from './List';
import { boardsRef, listsRef } from '../firebase';

class Board extends React.Component {

    state = {
        currentBoard: {},
        currentLists: []
    };

    componentDidMount() {
        this.getBoard(this.props.match.params.boardId);
        this.getLists(this.props.match.params.boardId);
    }

    getLists = async boardId => {
        try {
            const lists = await listsRef
                .where('list.board', '==', boardId)
                .orderBy('list.createdAt')
                .get();
            lists.forEach(list => {
                const data = list.data().list;
                const listObj = {
                    id: list.id,
                    ...data
                }
            this.setState({ currentLists: [...this.state.currentLists, listObj]})
            })
        } catch(error) {
            console.log('Error fetching lists: ', error);
        }
    }

    getBoard = async boardId => {
        try {
            const board = await boardsRef.doc(boardId).get();
            this.setState( { currentBoard: board.data().board } )
        } catch(error) {
            console.log('error getting boards ', error);
        }
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
                backgroundColor: this.state.currentBoard.background
            }}>
            <div className="board-header">
                <h3>{this.state.currentBoard.title}</h3>
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