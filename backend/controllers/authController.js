const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Business = require("../models/Business");

const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const {
      businessName,
      name,
      email,
      password,
    } = req.body;

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const business = await Business.create({
      name: businessName,
      email,
    });

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      businessId: business._id,
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    });

    const token = generateToken(
      user._id,
      business._id,
      user.role
    );

    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(
      user._id,
      user.businessId,
      user.role
    );

    res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getMe = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 const logout=async(req,res)=>{
  try {
    // Clear the cookie where the token is stored (replace 'token' with your cookie name)
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
 };
module.exports = {
  register,
  login,
  getMe,
  logout
};