import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response.js";
import {
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
  usernameValidation,
} from "../validation/user.js";
import { validate } from "../validation/validation.js";

const register = async (req) => {
  const user = validate(registerUserValidation, req);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser > 0) {
    throw new ResponseError(400, "Username already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (req) => {
  const loginRequest = validate(loginUserValidation, req);

  const user = await prismaClient.user.findFirst({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      name: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Username or password is invalid!");
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password is invalid!");
  }

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
  const refreshToken = jwt.sign(
    {
      user: {
        name: user.name,
        username: user.username,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  await prismaClient.user.update({
    data: {
      refresh_token: refreshToken,
    },
    where: {
      username: user.username,
    },
  });

  return { accessToken, refreshToken };
};

const update = async (req) => {
  const user = validate(updateUserValidation, req.user);

  const targetUser = await prismaClient.user.findFirst({
    where: {
      username: user.username,
    },
  });

  if (!targetUser) {
    throw new ResponseError(404, "User is not found");
  }

  const data = {};

  if (req.body.name) {
    data.name = req.body.name;
  }
  if (req.body.password) {
    data.password = await bcrypt.hash(req.body.password, 10);
  }

  return prismaClient.user.update({
    where: {
      username: user.username,
    },
    data,
    select: {
      username: true,
      name: true,
    },
  });
};

const logout = async (username) => {
  username = validate(usernameValidation, username);

  const user = await prismaClient.user.findFirst({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found!");
  }

  return prismaClient.user.update({
    where: {
      username: username,
    },
    data: {
      refresh_token: null,
    },
    select: {
      username: true,
    },
  });
};

// export a single value as an object
export default { register, login, update, logout };
