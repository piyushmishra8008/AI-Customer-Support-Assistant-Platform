const jwt = require("jsonwebtoken");

const generateToken = (id, businessId, role) => {
  return jwt.sign(
    {
      id,
      businessId,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateToken;