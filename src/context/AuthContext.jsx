import { createContext, useState, useEffect } from "react";
import { auth } from '../config/firebase';
export const AuthContext = createContext(null);

//Reactのコンポーネント↓
const AuthProvider = ({ children }) => {
    //const user = "こんにちは"
    const [user, setUser] = useState(null);　//壱行上のuserはグローバルステートでどのコンポ―ネントとでも使用可
    //なので、userをstateで管理すればよい　
    const [isLoading, setLoading] = useState(true);
    console.log('ロード状態,isLoading')
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            //console.log("じっこうされたようの", authUser)      ログインされたときに表示される


            setUser(authUser);
        });
    }, []);
    //console.log(user);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}





//valueに入るものがグローバルステート　すなわちこれはどこからでもアクセスできる
//valueのこんにちはがどこからでもアクセス可能な変数になった(props) 渡す準備完了

//onなんちゃら関数は中身に設定されたものが何らかのきっかけが起きたら実行される  
//onAuthStateChanged関数の引数にはユーザーの情報が入る
export default AuthProvider;

//useEffectはタイミングを調整する関数,副作用(===通信)を緩和するhooks
    //第一引数：調整されたタイミングで実行されたコールバック関数
    // =＞return内のjsxがDOMに反映された後（レンダーされた後,つまりhtmlに反映された後)に1回実行される（最初の一回だけ実行）
    // =＞依存配列内(第二引数)の変数の値が変更されるたびに実行される

    //第二引数：依存配列(依存配列内の変数の値が変わるたびに第一引数のコールバック関数が実行される)


//onなんちゃら関数は中身に設定されたものが何らかのきっかけが起きたら実行される   ex)onclickはクリックされたときに、onsubmitはフォームが送信されたときに、
//onAuthStateChanged関数の引数にはユーザーの情報が入る

//onAuthStateChanged関数はユーザーのログイン状態の変更を監視する,ログインしているユーザーの情報をgetできる　ログイン、ログアウトを監視するs
//　　　=＞ログイン状態の変更（2回目以降）
// 　　 =＞onAuthStateChanged関数が実行されたとき（最初の1回目だけ）

//コンポーネントの開始タグと閉じタグに囲まれた物はchildrenになる
//providerコンポーネントのchildrenになった物はすべてvalueを使える


//useEffectの基本形　useEfect=(()=>{},[]);