import jwt from "jsonwebtoken";
import "dotenv/config";
import { ResponseError } from "../error/response.js";
import { prismaClient } from "../application/database.js";

const refresh = async (req) => {
  const cookies = req.cookies;
  if (!cookies.token) throw new ResponseError(401, "Unauthorized");
  const refreshToken = cookies.token;

  const user = await prismaClient.user.findFirst({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user) throw new ResponseError(404, "User is not found!");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.username !== decoded.user.username) throw new ResponseError(401, "Unauthorized");
  });

  const accessToken = jwt.sign(
    {
      user: {
        name: user.name,
        username: user.username,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );

  return { accessToken };
};

export default refresh;
