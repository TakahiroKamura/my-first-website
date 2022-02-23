import type { NextPage } from 'next';
import { BaseSyntheticEvent, useState } from 'react';
import { Exception } from 'sass';

const Login: NextPage = () => {
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ loginResult, setLoginResult ] = useState<string>('');

    const handleEmail = (e: BaseSyntheticEvent) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e: BaseSyntheticEvent) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: BaseSyntheticEvent) => {
        const url: string = 'https://v07wjof543.execute-api.ap-northeast-1.amazonaws.com/dev/info';
        const key: object = {};
        const result: any = await fetch(url, key)
            .then((res: Response) => res.json())
            .catch((err: Exception) => {
                console.log(err);
                return err;
            });
        if (result) {
            
        } else {
            
        }
    };

    return (
        <div>
			<div className='main-body'>
				<h2>LOGIN</h2>
                <p>この先は会員限定コンテンツです</p>
				<p>以下の情報を入力してください</p>
                <form>
                    <label>会員ID(メールアドレス)</label><br/>
                    <input type="email" onChange={handleEmail} required></input><br/>
                    <label>パスワード</label><br/>
                    <input type="password" onChange={handlePassword} required></input><br/>
                    {loginResult}<br/>
                    <button type="button" onClick={handleLogin}>ログイン</button>
                </form>
			</div>
        </div>
    );
};

export default Login;