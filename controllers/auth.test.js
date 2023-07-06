const { loginUser } = require("./auth.controller");

const express = require("express");
const request = require("supertest");
const cors = require("cors");
const mongoose = require("mongoose");
const { PORT = 3000, DB_HOST } = process.env;

const testUser = {
  email: "test@mail.com",
  password: "12345678",
};

const app = express();
app.use(cors());
app.use(express.json());

app.post("/users/login", loginUser);

describe("test loginUser controller", () => {
  beforeAll(() => {
    mongoose
      .connect(DB_HOST)
      .then(() => {
        app.listen(PORT);
      })
      .catch(() => {
        process.exit(1);
      });
  });
  //   afterAll(() => {
  //     app.close();
  //   });
  test("loginUser returns 200 status", async () => {
    const response = await request(app).post("/users/login").send(testUser);
    expect(response.status).toBe(200);
  });
  test("loginUser returns token", async () => {
    const response = await request(app).post("/users/login").send(testUser);
    expect(response.body.token).toBeDefined();
  });
  test("loginUser returns object with 2 String-type fields - email and subscription", async () => {
    const response = await request(app).post("/users/login").send(testUser);

    expect(typeof response.body).toBe("object");
    const user = response.body.user;
    expect(Object.keys(user).length).toBe(2);
    expect(typeof user.email).toBeDefined();
    expect(typeof user.subscription).toBeDefined();
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
