import React from "react";

class UserForm extends React.Component {
    emailInput = React.createRef()
    passwordInput = React.createRef()

    render() {
        return(
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
                            <button>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }

}

export default UserForm;