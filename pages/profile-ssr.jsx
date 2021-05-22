import React from "react";
import Layout from "../components/Layout";
import withSession from "../lib/session";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";

const SsrProfile = ({ user }) => {
  const router = useRouter();
  const { mutateUser } = useUser();
  async function handleDelete(e) {
    let button = e.currentTarget;
    let content = button.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
      button.innerText = "Delete account";
    } else {
      content.style.display = "block";
      button.innerText = "I am not sure";
    }
  }


  return (
    <Layout>
      <h1>Your profile</h1>

      {user?.isLoggedIn && (
        <>
        <h2>{user.login}</h2>
          <pre>{JSON.stringify(user, undefined, 2)}</pre>
          <button type="button" onClick ={handleDelete}>Delete Account</button>
            <div id="content">
              <p> Are you sure?</p>
              <button type="button" onClick={async (e) => {
                e.preventDefault();
                mutateUser(
                  await fetchJson("/api/deleteUser", { method: "POST" }),
                  false,
                );
                router.push("/deleted");
              }}>Yes, I want to delete my account!</button>
            </div>
        </>
      )}
      <style jsx>{`
        #content{
          padding: 0 18px;
          display: none;
          overflow: hidden;
          background-color: #f1f1f1;
        }
      `}</style>
    </Layout>
  );
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user: req.session.get("user") },
  };
});

export default SsrProfile;


SsrProfile.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    login: PropTypes.string,
    email: PropTypes.string
  }),
};
