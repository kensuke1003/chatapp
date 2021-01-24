
import { useState, useContext } from 'react';   //useContextはグローバルステートを受け取る側でのhooks
import { Link, Redirect } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'; //hooks

import { auth } from "../config/firebase"
import { AuthContext } from '../context/AuthContext';


/*const Login = () => {
    return <h1>ログインページ</h1>
};*/


const useStyles = makeStyles({
    title: {
        color: 'red',
    },
    form: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '400px',
        width: '350px',
        margin: '0 auto',
    },
});


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const user = useContext(AuthContext);


    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                // ログインが成功した時の処理
                console.log('ログイン成功', result);
            })
            .catch((error) => {
                // ログインが失敗した時の処理
                console.log('ログイン失敗', error);
            });
    };
    if (user) {
        return <Redirect to='/' />;  //redirectはそこにもう一度アクセスする
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>

            <h1 className={classes.title}>ログインページ</h1>
            <TextField onChange={(e) => { setEmail(e.target.value) }} variant='filled' label='メールアドレス' />
            <TextField onChange={(e) => { setPassword(e.target.value) }} variant='outlined' label='パスワード' />

            <Link to='/signup'>アカウントをお持ちでない方</Link>
            <Button onClick={handleSubmit} variant='contained' color='secondary'>
                ログイン
            </Button>
        </form>
    );
}


export default Login;