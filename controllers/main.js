// check username, and password in login req.body
//if exists create new JWT
//send back to Frontend
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

// setup authetication so only the request with JWT can access the dashboard

const login = async (req, res) => {
  const { username, password } = req.body;
  //   console.log(username, password);

  // mongoose to validate empty username or password 'required'
  // Joi validation
  // manual validation
  if (!username || !password) {
    throw new BadRequestError(`Please provide email / username and password`);
  }
  // try to keep payload as small as possible, better for user experience (internet experience)
  // for your secret key use long unguessable characters of strings value
  const id = new Date().getTime();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  //   res.send("Fake Login / Register/ Sign up Route");
  // Authorization: `Bearer {{token}}`
  res.status(200).json({
    msg: "User created successfully",
    token,
  });
};
const dashboard = async (req, res) => {
  console.log("req.user", req.user);
  const { username } = req.user;
  const luckyNumber = Math.floor(Math.random() * 200);
  res.status(200).json({
    msg: `Hello ${username}`,
    secret: `Here is ur authorised data, here is your lucky number ${luckyNumber}`,
  });
};
module.exports = {
  login,
  dashboard,
};
