import jwt from "jsonwebtoken";
import "dotenv/config";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];

    if (!token) {
      res
        .status(401)
        .json({
          error: "Unauthorized",
        })
        .end();
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      if (decoded) req.user = decoded.user;
      next();
    });
  } else {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};
