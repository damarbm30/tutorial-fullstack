import supertest from "supertest";

import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/users", function () {
  afterEach(async () => {
    prismaClient.user.deleteMany({
      where: {
        username: "johndoe",
      },
    });
  });

  it("should register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "johndoe",
      password: "secretpassword",
      name: "John Doe",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("johndoe");
    expect(result.body.data.name).toBe("John Doe");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it("should reject if username is already registered", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "johndoe",
      password: "secretpassword",
      name: "John Doe",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("johndoe");
    expect(result.body.data.name).toBe("John Doe");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "johndoe",
      password: "secretpassword",
      name: "John Doe",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});
