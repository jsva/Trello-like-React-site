import React from "react";
import { AuthConsumer } from './AuthContext';

class UserForm extends React.Component {
    emailInput = React.createRef()
    passwordInput = React.createRef()

    render() {
        return(
            <AuthConsumer>
                { ({signUp }) => (
                    <React.Fragment>
                    <div className='sign-up-wrapper'>
                        <h2>Sign in or create account</h2>
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
                </React.Fragment>
                )}
            </AuthConsumer>
        )
    }

}

export default UserForm;