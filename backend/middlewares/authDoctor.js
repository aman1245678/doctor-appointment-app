import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    // Combined header check - case insensitive and both formats
    const dtoken =
      req.headers.dtoken ||
      req.headers.DToken ||
      req.headers["dtoken"] ||
      req.headers["DToken"];

    if (!dtoken) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required - Please login again",
      });
    }

    // Verify token
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    // Attach doctor info to request using both common patterns
    req.doctor = { id: token_decode.id }; // Standard practice
    req.body.docId = token_decode.id; // Backward compatibility

    next();
  } catch (error) {
    console.error("Doctor Auth Error:", error);

    // Enhanced error messages
    let message = "Authentication failed";
    if (error.name === "TokenExpiredError") {
      message = "Session expired - Please login again";
    } else if (error.name === "JsonWebTokenError") {
      message = "Invalid token - Please login again";
    }

    res.status(401).json({
      success: false,
      message,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export default authDoctor;
