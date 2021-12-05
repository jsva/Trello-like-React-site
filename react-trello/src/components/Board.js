import React from 'react';
import List from './List';
import { boardsRef, listsRef } from '../firebase';
import PropTypes from 'prop-types';
import {AuthConsumer} from './AuthContext';

class Board extends React.Component {

    state = {
        currentBoard: {},
        currentLists: [],
        message: '',
        boardIds: [],
        nextId: this.props.match.params.boardId,
        prevId: this.props.match.params.boardId
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
                .onSnapshot(snapshot => {
                    snapshot.docChanges()
                    .forEach(change => {
                        const doc = change.doc
                        const list = {
                            id: doc.id,
                            title: doc.data().list.title,
                            minimized: doc.data().list.minimized
                        }
                        if(change.type === 'added') {
                            this.setState( {
                                currentLists: [...this.state.currentLists, list]
                            }) 
                        }
                        if (change.type === 'removed') {
                            this.setState( {
                                currentLists: [
                                    ...this.state.currentLists.filter(list => {
                                        return list.id !== change.doc.id
                                    })
                                ]
                            })
                        }
                        if(change.type === 'modified') {
                            const index = this.state.currentLists.findIndex(item => {
                                return item.id === change.doc.id;
                            })
                            const lists = [...this.state.currentLists];
                            lists[index] = list;
                            this.setState( { currentLists: lists});
                        }
                    })
                })

        } catch(error) {
            console.log('Error fetching lists: ', error);
        }
    }

    getBoard = async boardId => {
        try {
            const board = await boardsRef.doc(boardId).get();
            this.setState( { currentBoard: board.data().board } )
            this.getBoardIds();
        } catch(error) {
            this.setState( {
                message: 'Board not found'
            })
        }
    }

    addBoardInput = React.createRef()

    createNewList = async (e, userId) => { 
        try {
        e.preventDefault();
        const list = {
            title: this.addBoardInput.current.value,
            board: this.props.match.params.boardId,
            createdAt: new Date(),
            user: userId,
            minimized: false
        }
        if(list.title && list.board) {
            await listsRef.add({ list });
            this.addBoardInput.current.value = '';
        }
    } catch(error) {
        console.error('Error creating a new list ', error);
    }
}

    deleteBoard = async () => {
        const boardId = this.props.match.params.boardId;
        this.props.deleteBoard(boardId);
        this.setState( {
            message: 'Board not found'
        })
    }

    updateBoard = e => {
        const boardId = this.props.match.params.boardId;
        const newTitle = e.currentTarget.value;
        if(boardId && newTitle) {
            this.props.updateBoard(boardId, newTitle);
        }
    }

    getBoardIds = async () => {
        try {
            const userId = this.state.currentBoard.user
            const boards = await boardsRef
            .where('board.user', '==', userId)
            .orderBy('board.createdAt')
            .get();
            boards.forEach(board => {
                const newId = board.id;
                this.setState( { boardIds: [...this.state.boardIds, newId]})
            })
            this.setNextId();
            this.setPrevId();
        } catch(error) {
          console.log('Error getting boards ', error);
        }
      }
    
    setNextId = () => {
        if(this.state.boardIds.length <= 1) {
            this.setState({nextId: this.props.match.params.boardId});
            return;
        }
        const currentId = this.props.match.params.boardId;
        const index = this.state.boardIds.findIndex(id => {
            return id === currentId;
        });
        let nextId = this.state.boardIds[0];
        if (index + 1 < this.state.boardIds.length) {
            nextId = this.state.boardIds[index + 1];
        }
        console.log('nextId',nextId)
        this.setState( {
            nextId: nextId
        })
    }

    setPrevId = () => {
        const length = this.state.boardIds.length;
        if(length <= 1) {
            this.setState({prevId: this.props.match.params.boardId});
            return;
        }
        const currentId = this.props.match.params.boardId;
        const index = this.state.boardIds.findIndex(id => {
            return id === currentId;
        });
        let prevId = this.state.boardIds[length -1];
        if (index > 0) {
            prevId = this.state.boardIds[index - 1];
        }
        console.log('prevId',prevId)
        this.setState( {
            prevId: prevId
        })
    }

    render() {
        return (
            <AuthConsumer>
            { ({ user }) =>(
                <React.Fragment>
                {
                    user.id === this.state.currentBoard.user ? (
                <div
            className="board-wrapper"
            style={{
                backgroundColor: this.state.currentBoard.background
            }}>
            {this.state.message === '' ? (
            <div className="board-header">
                {/* <h3>{this.state.currentBoard.title}</h3> */}
                <input
                type='text'
                name='boardTitle'
                onChange={this.updateBoard}
                defaultValue={this.state.currentBoard.title}
                />
                <button onClick = {this.deleteBoard}>Delete board</button>
            </div>
            ): (
                <h2>{this.state.message}</h2>
            )}
            <div className="'lists-wrapper">
                {Object.keys(this.state.currentLists).map(key => 
                    <List 
                    key={this.state.currentLists[key].id}
                    list={this.state.currentLists[key]} 
                    deleteList = {this.props.deleteList} />
                )}
            </div>
            <form onSubmit={(e) => this.createNewList(e, user.id)} 
                className="new-list-wrapper">
                <input 
                type={this.state.message === '' ? 'text' : 'hidden'}
                ref = {this.addBoardInput}
                name="name"
                placeholder=" + New List" />
            </form>
            <a href={`/board/${this.state.prevId}`}>
            <button>Previous Board</button> </a>
            <a href={`/board/${this.state.nextId}`}>
            <button>Next Board</button> </a>
            </div>
            ) :(
                <span></span>
                )
            }
            </React.Fragment>
        )}
            </AuthConsumer>
        );
    }
}

Board.propTypes = {
    deleteBoard: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired,
    updateBoard: PropTypes.func.isRequired,
}

export default Board;