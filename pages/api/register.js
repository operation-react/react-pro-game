import fetchJson from "../../lib/fetchJson";
import withSession from "../../lib/session";
import {client} from "./sqlHelper/client"
const { Pool, Client } = require('pg')


export default withSession(async (req, res) => {
  const { username , email ,password } = await req.body;
  const char = "'";
  let queryInsert = 'INSERT INTO accounts(username,email,password,created_on,last_login) VALUES( '+char+username+char+' , ' + char +email+ char+' , ' + char+password+char+' , (SELECT NOW()), (SELECT NOW()))';
  let querySelect = 'SELECT username, email from accounts where email like ' + char +  email + char +' or username  like ' + char + username+ char ;
  try {
    await client.connect();
    const result = await client.query({
      rowMode: 'array',
      text: querySelect,
    });
    if(result.rowCount!==0){
      throw {response:{status:418},data:{message:"Invalid username or email"}};
    }
    await client.query({
      rowMode: 'array',
      text: queryInsert,
    });
    client.end();
    let email = result.rows[0][1];
    let login = result.rows[0][0];
    let user = { isLoggedIn: true, login, email };
    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
