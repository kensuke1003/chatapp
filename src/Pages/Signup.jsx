import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'; //hooks
import { auth } from '../config/firebase';

////////////////////////////////////// material UI makestyles関数の中で使いたいスタイルをクラス基準で作っていく,下のreturn内のh1に紐づける 26,38行目
const useStyles = makeStyles({
    title: {
        color: 'red',
    },
    form: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',      //縦並び
        height: '400px',
        width: '350px',
        margin: '0 auto',   //formは全体に適応させる　26,36行目
    },
});
//////////////////////////////////////

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();  //hooks
    const [pass, setPass] = useState("pass");

    const handleSubmit = (e) => {  //送信されたときの関数
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)  //ユーザー登録の関数 最小限の情報　ユーザ―ネームが登録されていない　37行目でユーザーネームを登録する
            //成功時 以下で通信状況を把握する
            .then((result) => {
                result.user.updateProfile({ displayName: username }).then(() => {
                    console.log('ユーザー登録成功', result);
                });
            })
            //失敗時
            .catch((error) => {
                console.log('ユーザー登録失敗', error);
            });
    };


    return (
        <form onSubmit={handleSubmit} className={classes.form}>

            <h1 className={classes.title}>ユーザー登録ページ</h1>
            <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant='standard'                                           //variantは3種類
                label='ユーザーネーム'
            />
            <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant='filled'
                label='メールアドレス'
            />
            <TextField
                //type='password'
                type={pass} //変数として管理
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant='outlined'
                label='パスワード' />

            <Link to='/login'>アカウントをすでにお持ちの方</Link>
            <Button type='submit' variant='contained' color='primary'>
                登録
            </Button>

            <Button onClick={() => setPass(pass === 'password' ? 'text' : 'password')}>パスワード表示</Button>
        </form>
    );
};

export default Signup;