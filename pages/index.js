import Homepage from "./HomePart/Home";
import { Comic_Neue } from "next/font/google";

const comicFont = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cartoon",
});


export default function Home() {
  return (
    <main className={comicFont.variable}>
      <Homepage />
    </main>
  );
}
