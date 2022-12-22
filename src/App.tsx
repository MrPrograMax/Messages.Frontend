import { FC, ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import userManager, { loadUser, signinRedirect, signoutRedirect } from './auth/user-service';
import AuthProvider from './auth/auth-provider';
import SignInOidc from './auth/SigninOidc';
import SignOutOidc from './auth/SignoutOidc';
import MessageList from './messages/MessageList';
import MessageById from './messages/MessageById';


const App: FC<{}> = (): ReactElement => {
    loadUser();
    return (
        <div className="App">
            <button className="firstButtton" onClick={() => signinRedirect()}>Login</button>
            <header className="App-header">
                <br/>
                <AuthProvider userManager={userManager}>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={MessageById} />
                            <Route
                                path="/signout-oidc"
                                component={SignOutOidc}
                            />
                            <Route path="/signin-oidc" component={SignInOidc} />
                        </Switch>
                        <Switch>
                        <Route exact path="/" component={MessageList} />
                            <Route
                                path="/signout-oidc"
                                component={SignOutOidc}
                            />
                            <Route path="/signin-oidc" component={SignInOidc} />
                        </Switch>
                    </Router>
                </AuthProvider>
            </header>
        </div>
    );
};

export default App;