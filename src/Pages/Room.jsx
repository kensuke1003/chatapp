import { useContext, useEffect, useState } from 'react';　//グローバルステートを受け取る側のhooks　バケツリレーをしなくてもよくなる　孫コンポーネントにもいきなり渡せる
import { AuthContext } from '../context/AuthContext';
import { auth, db } from '../config/firebase';

import { Card, TextField, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
    root: {
        backgroundColor: "F3F3F3",
    },
    card: {
        margin: '15px',
        padding: '15px',
    },
});

const Room = () => {
    const user = useContext(AuthContext);
    console.log(user.displayName)
    const classes = useStyles();
    const [text, setText] = useState('');
    const [messages, setMessage] = useState([]);
    console.log(text);


    const logout = () => {
        auth.signOut();
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        //空文字入力を防止する
        if (text.length === 0) {
            alert('文字を入力してください');
            return;
        }
        setText("");   //送信後、textが空になるように setTextに空文字を入れておく

        db.collection("messages").add({
            content: text,
            createdAt: new Date(),
            username: user.displayName,
        })

            .then(() => { console.log("登録成功") })
            .catch(() => { console.log("登録失敗") })
    }
    useEffect(() => {
        db.collection('messages')
            .orderBy('createdAt', 'desc')  //入力された順に表示させるメソッド asc：昇順　　desc:降順　
            .onSnapshot((querySnapshot) => {
                setMessage(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));    //documentの１つ１つがdocument.Snapshot

            });
    }, [])
    //リアルタイムでdbの情報取得することができる　再読み込みをしなくても
    //dbの更新を監視して更新があれば再取得する

    //docはFirestoreのdocumentのこと

    return (
        <div>
            <h1>チャットルーム</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='チャットを入力' />
                <Button type='submit' variant='contained'>送信</Button>
            </form>
            {messages.map((message) => {
                return <Card className={classes.card} key={message.id}>
                    <span>{message.username}</span>:{message.content}</Card>
            })}
            <button onClick={logout}>ログアウト</button>
        </div>
    )

};

export default Room;