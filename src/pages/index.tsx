
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

import styles from '../styles/Home.module.scss'

export default function Home() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('desafio@ioasys.com.br');
  const [password, setPassword] = useState('12341234');

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      email,
      password,
    }

  }

  console.log(session);

  return (
    <div className={styles.container}>
      <div className={styles.simple}>
        <form onSubmit={handleSubmit}>
          <input name="email" type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='email' />
          <input name="password" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Entrar</button>
        </form>
      </div>

      <div className={styles.others}>
        <button type="button" className={styles.github} onClick={() => signIn('github')}>Github</button>
        <button type="button" className={styles.google} onClick={() => signIn('google')}>Google</button>
        <button type="button" className={styles.facebook} onClick={() => signIn('facebook')}>Facebook</button>

      </div>
      <button type="button" onClick={() => signOut()}>Sair</button>

    </div>
  )
}
