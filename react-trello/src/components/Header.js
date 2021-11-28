import React from "react";
import { AuthConsumer } from "./AuthContext";

const Header = () => (
    <header>
        <AuthConsumer>
            {({user, logOut}) => (
                <React.Fragment>
                    <a href='/'>
                        <span role='img' aria-label='house emoji'> &#127968;</span>
                    </a>
                    <h1> React Trello</h1>
                    <div className='user-area'>
                    <small>user: {user.email} </small>
                    <button onClick={(e) => logOut(e)}> Log Out</button>
                    <small>Please sign in</small>
                    </div>
                </React.Fragment>
            )}
        </AuthConsumer>
    </header>
)

export default Header;