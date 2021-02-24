import Head from "next/head";
import Clock from "../components/Clock";
import styles from "../styles/Home.module.scss";
import { NextPage, NextPageContext } from "next";
import Cookie from "js-cookie";
import parseCookies from "../utils/parseCookies";
import { useEffect, useState } from "react";

interface PageProps {
  cookies: {
    username?: string;
  };
}

const Home: NextPage<PageProps> = ({ cookies }) => {
  const [username, setUsername] = useState<string>(cookies.username || "username");
  useEffect(() => {
    if (!cookies.username) {
      const answer = prompt("suko kim jestes naj name pls");
      Cookie.set("username", answer);
      setUsername(answer);
    }
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Clock force12hour={false} showSeconds={true} />
        Siema: <b>{username}</b>
      </main>
    </div>
  );
};

Home.getInitialProps = ({ req }: NextPageContext) => {
  const allCookies = parseCookies(req);
  return { cookies: allCookies };
};

export default Home;
