import Head from "next/head";
import FormDetails from "../components/Form";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <Head>
        <title>4-Hope</title>
        <meta name="description" content="4-Hope website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero
        heading="4hope"
        message="Build the next world-class resume using our Resume builder."
      />
    </div>
  );
}
