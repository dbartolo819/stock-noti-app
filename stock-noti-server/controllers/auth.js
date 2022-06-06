
const registerUser = (req, res) => {
  console.log(req.body)
  
}

const login = (req, res) => {
  console.log(req.body);
  res.status(200).send("successful");
};

module.exports = {
  login,
  registerUser
};
