//import { Button, Switch } from '@material-ui/core';   //マテリアルユーアイを使用
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Room from './Pages/Room';

import AuthProvider from "./context/AuthContext";
import LoggedInRoute from './components/LoggedinRoute'

/*
マテリアルユーアイ使用例
const App = () => {
    //return <h1>chat App</h1>;
    return (
        <Button variant='contained' color='secondary'>
            ボタンです！
        </Button>
    );
};
*/

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <LoggedInRoute exact path='/' component={Room} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    );
};

//pathとcomponentがpropsの役割,exactで指定する役割
//authproviderが親コンポーネントになり、上記の3つを管理するイメ―ジ authproviderはグローバルステート用
export default App;

