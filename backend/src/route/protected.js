import express from "express";

import { authMiddleware } from "../middleware/auth.js";
import userController from "../controller/user.js";
import contactController from "../controller/contact.js";
import addressController from "../controller/address.js";

export const protectedRouter = new express.Router();

protectedRouter.use(authMiddleware);

// users
protectedRouter.patch("/api/users/current", userController.update);
protectedRouter.delete("/api/users/logout", userController.logout);

// contact
protectedRouter.post("/api/contacts", contactController.create);
protectedRouter.get("/api/contacts/all", contactController.list);
protectedRouter.get("/api/contacts/:contactId", contactController.get);
protectedRouter.patch("/api/contacts/:contactId", contactController.update);
protectedRouter.delete("/api/contacts/:contactId", contactController.remove);
protectedRouter.get("/api/contacts", contactController.search);

// address
protectedRouter.post("/api/contacts/:contactId/addresses", addressController.create);
protectedRouter.get("/api/contacts/:contactId/addresses/:addressId", addressController.get);
protectedRouter.put("/api/contacts/:contactId/addresses/:addressId", addressController.update);
protectedRouter.delete("/api/contacts/:contactId/addresses/:addressId", addressController.remove);
protectedRouter.get("/api/contacts/:contactId/addresses", addressController.list);

protectedRouter.use((_, res) => {
  res.status(404).json({
    message: "No route exists!",
  });
});
