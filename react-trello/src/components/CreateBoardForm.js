import React from 'react';
import PropTypes from 'prop-types';
import { AuthConsumer } from '../components/AuthContext';

class CreateBoardForm extends React.Component {

    state = {
        title: '',
        background: '#80ccff',
        colorOneValue: '#',
        colorOneName: 'Extra Color 1', 
        colorTwoValue: '#',
        colorTwoName: 'Extra Color 2',
        colorThreeValue: '#', 
        colorThreeName: 'Extra Color 3',
        showExtraColor: false

    }

    handleSubmit = (e, userId) => {
        e.preventDefault();
        const board = {
            title: this.state.title,
            background: this.state.background,
            createdAt: new Date(),
            user: userId
        }
        if(board.title && board.background && board.user) {
            this.props.createNewBoard(board)
        } 
    }

    updateColorName = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState( {
            [name]: value
        })
    }

    updateColorValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState( {
            [name]: value
        })
    }

    showColorPicker = () => {
        this.setState({
            showExtraColor: !this.state.showExtraColor
        })
    }
    
    render() {
        return (
            <AuthConsumer>
                {({ user }) => (
                <React.Fragment>
                <form className="create-board-wrapper" 
            onSubmit={(e) => this.handleSubmit(e, user.id)}>
                <input
                    type="text"
                    name="name"
                    placeholder="Board name"
                    onChange={(e) => this.setState({ title: e.target.value})}
                    />
                <select name="background" 
                onChange={(e) => this.setState({background: e.target.value})}>
                    <option value="#80ccff">Blue</option>
                    <option value="#80ffaa">Green</option>
                    <option value="#f94a1e">Red</option>
                    <option value="#ffb3ff">Pink</option>
                    <option value="#bf00ff">Purple</option>
                    <option value="#ffad33">Orange</option>
                    <option value={this.state.colorOneValue}>{this.state.colorOneName}</option>
                    <option value={this.state.colorTwoValue}>{this.state.colorTwoName}</option>
                    <option value={this.state.colorThreeValue}>{this.state.colorThreeName}</option>
                </select>
                <button type="submit">Create new board</button>
            </form>  
            <div>
                <button onClick={this.showColorPicker}> {this.state.showExtraColor ? 'Hide' : 'Show'} extra color selector</button>
                { this.state.showExtraColor ? (
                <React.Fragment>
                <input
                    type='text'
                    name='colorOneName'
                    onChange={(e) => {
                        this.updateColorName(e);
                    }}
                    defaultValue={this.state.colorOneName}
                />
                <input
                    type='text'
                    name='colorOneValue'
                    onChange={(e) => {
                        this.updateColorValue(e);
                    }}
                    defaultValue={this.state.colorOneValue}
                />
                <input
                    type='text'
                    name='colorTwoName'
                    onChange={(e) => {
                        this.updateColorName(e);
                    }}
                    defaultValue={this.state.colorTwoName}
                />
                <input
                    type='text'
                    name='colorTwoValue'
                    onChange={(e) => {
                        this.updateColorValue(e);
                    }}
                    defaultValue={this.state.colorTwoValue}
                />
                <input
                    type='text'
                    name='coloThreeName'
                    onChange={(e) => {
                        this.updateColorName(e);
                    }}
                    defaultValue={this.state.colorThreeName}
                />
                <input
                    type='text'
                    name='colorThreeValue'
                    onChange={(e) => {
                        this.updateColorValue(e);
                    }}
                    defaultValue={this.state.colorThreeValue}
                />
                </React.Fragment>
                ) : (
                    <span> </span>
                )}
            </div>
            
            </React.Fragment>
            )}
            </AuthConsumer>
         
        )
    }
    
}

CreateBoardForm.propTypes = {
    createNewBoard: PropTypes.func.isRequired
}


export default CreateBoardForm;