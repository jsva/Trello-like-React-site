import React from 'react';

class EditCardModal extends React.Component {

    state = {
        availableLabels: [
            '#80ccff',
            '#80ffaa',
            '#f94a1e',
            '#ffb3ff',
            '#bf00ff',
            '#ffad33',
        ],
        selectedLabels: []
    }

    render() {
        return (
            <div 
            className='modal-wrapper'
            style={{display: this.props.modalOpen ? 'block' : 'none'}}>
                <div className='modal-body'>
                    <form>
                        <div>
                            <span className='modal-close'
                            onClick={this.props.toggleModal}>&times;</span>
                            <p cclassName='label-title'> add / remove labels</p>
                            {this.state.availableLabels.map(label => {
                                return <span 
                                    className='label' 
                                    style={{ background: label }}></span>
                            })}
                            <hr />
                        </div>
                        <div className='edit-area'>
                            <span className='edit-icon'>&#x270E;</span>
                            <input className='textbox-edit'></input>

                        </div>
                        <div>
                            <p className='label-title'>labels:</p>
                            {/* TODO:display labels */}
                        </div>
                        <button type='submit'>Save changes</button>
                    </form>
                </div>
            </div>
        );

    }
}


export default EditCardModal;