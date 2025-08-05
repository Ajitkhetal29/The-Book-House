import jswt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(400).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jswt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return res.status(400).json({ success: false, message: "Access Denied" });
    }
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

const verifyAdmin = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(400).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jswt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (decoded.role !== "admin") {
      return res.status(400).json({ success: false, message: "Access Denied" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

const getUser = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(400).json({ success: false, message: "Unauthorized" });
  }
  try {
    const decode = jswt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export { verifyAdmin, verifyUser, getUser };
