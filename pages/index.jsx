import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

const Home = () => {

  const roomId = Math.ceil(Math.random()*999999)

  return(
    <Layout>
        <h1>Can you guess what was the AI’s intention?</h1>

        <p>
        Images generated by machine learning. What did it put into them?
        </p>
        <Link href={`/room/${roomId}`}>
          <a>Play now</a>
        </Link>

        <style jsx>{`
          li {
            margin-bottom: 0.5rem;
          }
        `}</style>
      </Layout>
  )
};

export default Home;
