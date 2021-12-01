import React from 'react';
import PropTypes from 'prop-types';
import {cardsRef} from '../firebase';
import EditCardModal from './EditCardModal';
import TextareaAutosize from 'react-autosize-textarea';



class Card extends React.Component {

    state = {
        modalOpen: false,
        checkboxClicked: false
    }

    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen})
    }

    updateCard = async () => {
        try {
            // e.preventDefault();
            const cardId = this.props.data.id;
            const card = await cardsRef.doc(cardId);
            console.log('Made it here')
            console.log(card)
            card.update( {
                'card.checkboxClicked' : this.state.checkboxClicked
            });
        } catch(error) {
            console.error('Error updating cards: ', error);
        }
    }

    componentDidMount() {
        console.log(this.props.data.checkboxClicked)
        this.setState( {
            checkboxClicked: this.props.data.checkboxClicked
        });
    }

    deleteCard = async e => {
        try {
            e.preventDefault();
            const cardId = this.props.data.id;
            const card = await cardsRef.doc(cardId);
            card.delete();
        } catch(error) {
            console.error('Error deleting card: ', error)
        }
    }

    clickCheckbox = () => {
        this.setState( {
            checkboxClicked: !this.state.checkboxClicked
        })
        this.updateCard();
    }

    render() {
        return (
            <React.Fragment>
            <div className={!this.state.checkboxClicked ? "card" : "card-hidden"}>
                <div className='cards-labels'>
                    {this.props.data.labels.map(label => {
                        return <span   
                                key={label}
                                style={{ background: label }}
                                className='label'
                                ></span>;
                    })}
                </div>
                <div className="card-body">
                    {/* <p onClick = {this.toggleModal}>{this.props.data.text}</p> */}
                    <TextareaAutosize 
                    onClick = {this.toggleModal}
                    readOnly
                    value={this.props.data.text}> </TextareaAutosize>
                    <input type='checkbox' id='checkbox1' className='checkbox'
                    onClick= {this.clickCheckbox} checked={this.state.checkboxClicked} />
                    {/* <label for='checkbox1'> Done </label> */}
                    <span onClick={this.deleteCard}> &times; </span>

                </div>
            </div>
            <EditCardModal 
            modalOpen={this.state.modalOpen}
            toggleModal={this.toggleModal}
            cardData={this.props.data} />
            </React.Fragment>
        );
    }
}
Card.propTypes = {
    data: PropTypes.object.isRequired
}

export default Card;