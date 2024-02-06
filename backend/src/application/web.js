import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { credentials } from "../middleware/credentials.js";
import { publicRouter } from "../route/public.js";
import { errorMiddleware } from "../middleware/error.js";
import { protectedRouter } from "../route/protected.js";
import corsOptions from "../config/corsOptions.js";

export const web = express();
web.use(credentials);
web.use(cors(corsOptions));
web.use(cookieParser());
web.use(express.json());
web.use(publicRouter);
web.use(protectedRouter);
web.use(errorMiddleware);
