import Head from "next/head";
import Homepage from "./HomePart/Home";
import { Comic_Neue } from "next/font/google";

const comicFont = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cartoon",
});


export default function Home() {
  return (
    <>
      <Head>
        <title>Carl Wyne Gallardo | Portfolio</title>
        <meta name="description" content="Portfolio of Carl Wyne Gallardo — Web Developer and Graphic Designer." />
      </Head>
      <main className={comicFont.variable}>
        <Homepage />
      </main>
    </>
  );
}
