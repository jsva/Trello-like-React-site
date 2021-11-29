import React from "react";
import { AuthConsumer } from './AuthContext';

class UserForm extends React.Component {
    emailInput = React.createRef()
    passwordInput = React.createRef()

    redirect = (userId) => {
        this.props.history.push(`/${userId}/boards`)
    }

    render() {
        return(
            <AuthConsumer>
                { ({signUp, logIn, user, authMessage }) => (
                    <React.Fragment>
                    {!user.id ? (
                    <div className='sign-up-wrapper'>
                        <h2>Sign in or create account</h2>
                        {authMessage ? <span>{authMessage}</span>  : ''}
                        <form className='sign-up-form'>
                            <div>
                                <input 
                                    ref={this.emailInput}
                                    name='email'
                                    type='email'
                                    placeholder='email'
                                    />
                                    <input 
                                    ref={this.passwordInput}
                                    name='password'
                                    type='password'
                                    placeholder='password'
                                    />
                            </div>
                            <div>
                                <button
                                    onClick={ (e) => logIn(
                                        this.emailInput.current.value,
                                        this.passwordInput.current.value,
                                        e
                                    )} > Login </button>
                                <button
                                onClick={(e) => signUp(
                                    this.emailInput.current.value,
                                    this.passwordInput.current.value,
                                    e
                                )}>
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                    ) : (
                        <button onClick={ () => this.redirect(user.id)}>
                            Go to my boards
                        </button>
                    )}
                </React.Fragment>
                )}
            </AuthConsumer>
        )
    }

}

export default UserForm;