const { UserModel } = require('../model/UserModel');
const jwt = require('jsonwebtoken');

// Maximum age for JWT token (3 days)
const maxAge = 3 * 24 * 60 * 60;

// Create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.json({ 
        message: "User already exists", 
        success: false 
      });
    }

    // Create new user
    const user = new UserModel({
      email,
      username,
    });

    // Register user with passport-local-mongoose
    UserModel.register(user, password, (err) => {
      if (err) {
        return res.json({
          message: "Error registering user",
          success: false,
        });
      }
      
      // Create token
      const token = createToken(user._id);
      
      // Set cookie
      res.cookie("jwt", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      
      res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: user._id,
      });
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: "Error creating user",
      success: false,
    });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({
        message: "Incorrect username or password",
        success: false,
      });
    }

    // Authenticate user
    user.authenticate(password, (err, result) => {
      if (err || !result) {
        return res.json({
          message: "Incorrect username or password",
          success: false,
        });
      }
      
      // Create token
      const token = createToken(user._id);
      
      // Set cookie
      res.cookie("jwt", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      
      res.status(200).json({
        message: "Login successful",
        success: true,
        user: user._id,
      });
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: "Error during login",
      success: false,
    });
  }
};

// Verify user authentication
exports.verifyUser = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.json({ status: false });
      } else {
        const user = await UserModel.findById(decodedToken.id);
        if (user) {
          return res.json({ status: true, user: user.username });
        } else {
          return res.json({ status: false });
        }
      }
    });
  } else {
    return res.json({ status: false });
  }
};

// Logout controller
exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "Logged out successfully" });
};