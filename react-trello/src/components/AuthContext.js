import React from "react";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state = {
        user: {
            name: 'TestUser'
        }
    }

    render() {
        return (
            <AuthContext.Provider
                value={{ user: this.state.user }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer } 