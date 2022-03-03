import { signIn, signOut, useSession } from 'next-auth/react';

import styles from '../styles/Home.module.scss'

export default function Home() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div className={styles.container}>
      <div className={styles.simple}>
        <form>
          <input type="text" placeholder='email' />
          <input type="password" placeholder="Password" />
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
