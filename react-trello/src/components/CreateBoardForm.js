import React from 'react';
import PropTypes from 'prop-types';
import { AuthConsumer } from '../components/AuthContext';
import { colorsRef } from '../firebase';


class CreateBoardForm extends React.Component {

    state = {
        title: '',
        background: '#80ccff',
        extraColors: {},
        showExtraColor: false

    }

    componentDidMount() {
        this.getColors(this.props.userId)
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

    getColors = async (userId) => {
        try {
            const retrievedColors = await colorsRef
            .where('colors.user', '==', userId)
            .get();
            if (retrievedColors.size === 0) {
                const colors = {
                    user: userId,
                    colorOneValue: '#',
                    colorOneName: 'Extra Color 1', 
                    colorTwoValue: '#',
                    colorTwoName: 'Extra Color 2',
                    colorThreeValue: '#', 
                    colorThreeName: 'Extra Color 3',
                }
                console.log('Found no database entry, Creating new')
                const newColors = await colorsRef.add({colors});
                this.setState({extraColors: colors, id: newColors.id })
            }
            else {
            retrievedColors.forEach(colors => {
                const data = colors.data().colors;
                this.setState({extraColors: data, id: colors.id});
                })
            }
        } catch(error) {
            console.log('ERROR', error.message)
        }
    }

    updateColorName = async (e) => {
        try {
            const name = 'colors.' + e.target.name;
            const value = e.target.value;
            const colors = await colorsRef.doc(this.state.id);
            colors.update({[name]: value})
            this.setState(prevState => ({
                extraColors: {
                    ...prevState.extraColors,
                    [e.target.name] : value
                }
            }))            
        } catch(error) {
            console.error('Error updating color name: ', error);
          }
    }

    updateColorValue = async (e) => {
        try {
            const name = 'colors.' + e.target.name;
            const value = e.target.value;
            const colors = await colorsRef.doc(this.state.id);
            colors.update({[name]: value})
            this.setState(prevState => ({
                extraColors: {
                    ...prevState.extraColors,
                    [e.target.name] : value
                }
            }))
            
        } catch(error) {
            console.error('Error updating color value: ', error);
          }
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
                    <option value={this.state.extraColors.colorOneValue}>
                        {this.state.extraColors.colorOneName}</option>
                    <option value={this.state.extraColors.colorTwoValue}>
                        {this.state.extraColors.colorTwoName}</option>
                    <option value={this.state.extraColors.colorThreeValue}>
                        {this.state.extraColors.colorThreeName}</option>
                </select>
                <button type="submit">Create new board</button>
            </form>  
            <div>
                <button onClick={this.showColorPicker}> {this.state.showExtraColor ? 'Hide' : 'Show'} extra color selector</button>
                { this.state.showExtraColor ? (
                <React.Fragment>
                 <div style={{ backgroundColor: this.state.extraColors.colorOneValue}}>
                <input
                    type='text'
                    name='colorOneName'
                    onChange={(e) => {
                        this.updateColorName(e);
                    }
                    }
                    defaultValue={this.state.extraColors.colorOneName}
                />
                <input
                    type='text'
                    name='colorOneValue'
                    onChange={(e) => {
                        this.updateColorValue(e);
                    }}
                    defaultValue={this.state.extraColors.colorOneValue}
                />
                </div>
                <br/>
                <div style={{ backgroundColor: this.state.extraColors.colorTwoValue}}>
                <input
                    type='text'
                    name='colorTwoName'
                    onChange={(e) => {
                        this.updateColorName(e);
                    }}
                    defaultValue={this.state.extraColors.colorTwoName}
                />
                <input
                    type='text'
                    name='colorTwoValue'
                    onChange={(e) => {
                        this.updateColorValue(e);
                    }}
                    defaultValue={this.state.extraColors.colorTwoValue}
                />
                </div>
                <br/>
                <div style={{ backgroundColor: this.state.extraColors.colorThreeValue}}>
                <input
                    type='text'
                    name='colorThreeName'
                    onChange={(e) => {
                        this.updateColorName(e);
                    }}
                    defaultValue={this.state.extraColors.colorThreeName}
                />
                <input
                    type='text'
                    name='colorThreeValue'
                    onChange={(e) => {
                        this.updateColorValue(e);
                    }}
                    defaultValue={this.state.extraColors.colorThreeValue}
                />
                </div>
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
    createNewBoard: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
}


export default CreateBoardForm;