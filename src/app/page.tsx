'use client';

import gif from '../assets/sucesso.gif'
import styles from './page.module.css'
import { useRef, useState } from 'react';

var videos = [
  "https://youtu.be/s3BVvmXmd-g?si=OnEaarAT_z3yPyYt",
  "https://youtu.be/-RNG_tTXXcg?si=SBYvZGIhWCjaWra7",
  "https://youtu.be/vW9b60Ef7v4?si=Z_iXIHgen6OHdikL",
  "https://youtu.be/Qc7_zRjH808?si=DJF0QBFg2_eA2Suj",
  "https://youtu.be/YnopHCL1Jk8?si=Ya9nAGOzJO0Rzxgv",
  "https://youtu.be/PvNwPuQybVQ?si=hZWVWWLKx3iYIo5S",
  "https://youtu.be/WZIGwN-5Ioo?si=xC5OSn0vPUwlZNb7",
  "https://youtu.be/b0nNTklOKRA?si=gzHClDWxWsZRkZ52",
  "https://youtu.be/CAyWN9ba9J8?si=NkNfFaOrtdV0hR0j",
  "https://youtu.be/Vk8UEWHYfEg?si=aIOxRif6RUsvjNF_",
  "https://youtu.be/_mrr3UNALww?si=2BhwBNsnOdcOKc1I",
  "https://youtu.be/zS1cLOIxsQ8?si=38-0gbWLP9Q6b36E",
  "https://youtu.be/cLmCJKT5ssw?si=Racb0U__hd1-PVH3",
  "https://youtu.be/nVmXsBNfwHY?si=jD6d8FW1H2obxPnO",
  "https://youtu.be/bmPyMtv-GmQ?si=UOo8dkYyd2h7V2Be",
  "https://youtu.be/oST8lpQlirk?si=kVJfTZt1PQEmdUfU",
  "https://youtu.be/aW7bzd8uwyQ?si=0glW1qYIJJw1xoHr",
  "https://youtu.be/iFTIiDZzw_M?si=Ef7tbcVL1t6YdgbD"
];

export default function Home() {
  const input = useRef<HTMLInputElement>(null);
  let [loading, setLoading] = useState(false);
  let [counter, setCounter] = useState(5);
  let [sent, setSent] = useState(false);

  async function send() {
    if(!loading && input.current?.value) {
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
      setSent(true);

      redirectPage();
    }
  }

  function redirectPage() {
    setInterval(() => {
      setCounter(prevCount => {
        if(prevCount == 0) {
          window.location.replace(videos[Math.floor(Math.random() * videos.length)]);
          return prevCount;
        } else {
          return prevCount - 1;
        }
      });
    }, 1000);
  }

  return (
    <div className={styles.body}>
      <h5>Opa, beleza? Só para confirmar ai a presença na resenha do dia 17, confirma seu nome ai abaixo, e caso queira levar alguém, só botar o nome junto separado por virgula</h5>
      <br></br>
      <input type='text' ref={input}></input>
      <button onClick={send}>{loading ? "Enviando..." : "Enviar"}</button>
      <br /><br></br>
      {loading ? <img className={styles.loading} src="https://cdn.dribbble.com/users/136529/screenshots/6110695/mario_luigi.gif"/> : null}
      {sent ? <p>Opa, brigadão, te vejo lá, agora fica com esse sucesso em {counter}</p> : null}
      <br></br>
      {sent ? <img className={styles.loading} src={gif.src}></img> : null} 
    </div>
  );
}