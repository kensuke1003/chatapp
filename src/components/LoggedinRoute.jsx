import { Component, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const LoggedinRoute = ({ component: Component, ...otherProps }) => { //最初のはcomponentにしてComponentを受け取っている

    const user = useContext(AuthContext);  //ログインしているuserの情報を取得している AuthContext.jsxより
    console.log(otherProps);

    //userのログイン状態によってページの遷移先を分けている
    if (!user) {                                              //userではなかった場合の条件分け
        return <Redirect to='/login' />;
    }
    return <Route {...otherProps} component={Component} />;  //以下と同じ

    /*return (
        <Route
            {...otherProps}
            render={(props) =>
                user ? <Component {...props} /> : <Redirect to='login' />
            }
        />
    );*/
};

export default LoggedinRoute;