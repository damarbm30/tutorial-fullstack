import allowedOrigins from "../config/allowedOrigins.js";

export const credentials = (req, res, next) => {
  if (allowedOrigins.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  }
  next();
};
