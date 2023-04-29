import Head from 'next/head';
import CitasNaruto from '../components/CitasNaruto';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Citas Naruto</title>
        <meta name="description" content="Proyecto para generar citas aleatorias de Naruto" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CitasNaruto />

          
      </main>
    
   
 
    </div>
    
  );
}
