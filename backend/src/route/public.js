import express from "express";

import userController from "../controller/user.js";
import refresh from "../controller/refresh-token.js";

export const publicRouter = new express.Router();

publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);
publicRouter.get("/api/refresh", refresh);

// publicRouter.use((_, res) => {
//   res.status(404).json({
//     message: "No route exists!",
//   });
// });
