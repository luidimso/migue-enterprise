'use client';

import Image from 'next/image'
import styles from './page.module.css'
import { useRef, useState } from 'react';

export default function Home() {
  const input = useRef<HTMLInputElement>(null);
  let [loading, setLoading] = useState(false);

  async function send() {
    if(!loading) {
      setLoading(true);

      const request = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name: input.current?.value,
          date: "17/12"
        }),
        headers: {
            "Content-type": "application/json"
        }
      });

      const data = await request.json();

      setLoading(false);
    }
  }

  return (
    <div className={styles.body}>
      <h5>Opa, beleza? Só para confirmar ai a presença na resenha do dia 17, confirma seu nome ai abaixo, e caso queira levar alguém, só botar o nome junto separado por virgula</h5>
      <br></br>
      <input type='text' ref={input}></input>
      <button onClick={send}>{loading ? "Enviando..." : "Enviar"}</button>
      <br />
      {loading ? <img className={styles.loading} src="https://cdn.dribbble.com/users/136529/screenshots/6110695/mario_luigi.gif"/> : null}
    </div>
  );
}