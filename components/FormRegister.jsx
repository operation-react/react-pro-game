import React from "react";
import PropTypes from "prop-types";

const FormRegister = ({ errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label>
      <span>Type your username and password</span>
      <input type="text" name="username" placeholder="UserName" required />
      <input type="email" name="email" placeholder="Email" required/>
      <input type="text" maxLength="30" minLegth="5" name="password" placeholder="Password" required />
    </label>

    <button type="submit">Login</button>

    {errorMessage && <p className="error">{errorMessage}</p>}

    <style jsx>{`
      form,
      label {
        display: flex;
        flex-flow: column;
      }
      label > span {
        font-weight: 600;
      }
      input {
        padding: 8px;
        margin: 0.3rem 0 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .error {
        color: brown;
        margin: 1rem 0 0;
      }
    `}</style>
  </form>
);

export default FormRegister;

FormRegister.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
};
