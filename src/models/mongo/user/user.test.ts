import { describe, it, expect } from "bun:test";

import User from "@/models/mongo/user";

import factories from "@tests/factories";

describe("User Model", function () {
  it("should be defined and be a model", function () {
    expect(User).toBeDefined();
    expect(User.modelName).toBe("User");
  });

  it("should create a new User", async function () {
    const params = factories.User.build();

    const user = await User.create(params);

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user._id).toBeDefined();

    expect(user.name).toBe(params.name);
    expect(user.email).toBe(params.email.toLowerCase());
    expect(user.profilePictureUrl).toBe(params.profilePictureUrl);
    expect(user.createdAt).toBeInstanceOf(Date);

    expect(user.password).not.toBe(params.password);
  });

  it("should email be required", async function () {
    const params = factories.User.build();

    expect(User.create({ ...params, email: undefined })).rejects.toThrow();
  });

  it("should accept a valid email", async function () {
    const validEmail = "valid.email@example.com";
    const params = factories.User.build({ email: validEmail });

    const user = await User.create(params).catch((error) => error);

    expect(user).toBeDefined();
    expect(user.email).toBe(validEmail.toLowerCase());
  });

  it("should trim spaces in the email field", async function () {
    const params = factories.User.build({
      email: "  testemail@example.com  ",
    });
    const user = await User.create(params);
    expect(user.email).toBe("testemail@example.com");
  });

  it("should validate email format", async function () {
    const params = factories.User.build({ email: "invalid-email" });

    expect(await User.create(params)).rejects.toThrow();
  });

  it("should reject an invalid email with missing username", async function () {
    const invalidEmailParams = factories.User.build({ email: "@example.com" });

    expect(await User.create(invalidEmailParams)).rejects.toThrow();
  });

  it("should reject an invalid email with missing domain", async function () {
    const invalidEmailParams = factories.User.build({
      email: "invalid-email@",
    });

    expect(await User.create(invalidEmailParams)).rejects.toThrow(
      "Por favor, insira um email válido"
    );
  });

  it("should reject an invalid email with special characters", async function () {
    const invalidEmailParams = factories.User.build({
      email: "invalid!email@example.com",
    });

    expect(await User.create(invalidEmailParams)).rejects.toThrow();
  });

  it("should accept a strong password", async function () {
    const validPasswordParams = factories.User.build({
      password: "StrongP@ssw0rd",
    });
    const userWithValidPassword = await User.create(validPasswordParams);

    const isMatch = await userWithValidPassword.compareHash(
      validPasswordParams.password
    );
    expect(isMatch).toBe(true);
  });

  it("should require a strong password", async function () {
    const params = factories.User.build({ password: "weak" });

    expect(await User.create(params)).rejects.toThrowError();
  });

  it("should reject a password without an uppercase letter", async function () {
    const invalidPasswordParams = factories.User.build({
      password: "weakpassword1",
    });

    expect(await User.create(invalidPasswordParams)).rejects.toThrowError();
  });

  it("should reject a password without a lowercase letter", async function () {
    const invalidPasswordParams = factories.User.build({
      password: "WEAKPASSWORD1",
    });

    expect(await User.create(invalidPasswordParams)).rejects.toThrowError();
  });

  it("should reject a password without a number", async function () {
    const invalidPasswordParams = factories.User.build({
      password: "WeakPassword",
    });

    expect(await User.create(invalidPasswordParams)).rejects.toThrowError();
  });

  it("should name be required", async function () {
    const params = factories.User.build();

    expect(User.create({ ...params, name: undefined })).rejects.toThrowError();
  });

  it("should trim spaces in the name field", async function () {
    const params = factories.User.build({ name: "  John  " });
    const user = await User.create(params);
    expect(user.name).toBe("John");
  });

  it("should hash the password before saving", async function () {
    const params = factories.User.build();

    const user = await User.create(params);

    expect(user.password).not.toBe(params.password);
    const isMatch = await user.compareHash(params.password);
    expect(isMatch).toBe(true);
  });

  it("should handle duplicate key errors correctly (email)", async function () {
    const email = "same@email.com";
    const params = factories.User.build({ email });

    await User.create(params);

    const error = await User.create(params).catch((e) => e);
    expect(error.message).toInclude("duplicate key error");
  });

  // it("should generate a valid authentication token", async function () {
  //   const params = factories.User.build();

  //   const expectedOutput = "validToken";

  //   const stubJwt = sinon.stub(jwt, "sign").callsFake(function () {
  //     return expectedOutput;
  //   });

  //   const user = await User.create(params);

  //   const token = await user.generateAuthToken();

  //   sinon.assert.calledOnce(stubJwt);

  //   expect(token).toBeDefined();
  //   expect(token).toEqual(expectedOutput);
  // });

  // it("should generate a salt and hash the password correctly", async function () {
  //   const params = factories.User.build();
  //   const user = await User.create(params);

  //   expect(user.password).not.toBe(params.password);

  //   const stubCompare = sinon.stub(bcrypt, "compare").resolves(true);

  //   const isMatch = await user.compareHash(params.password);
  //   sinon.assert.calledOnce(stubCompare);

  //   expect(isMatch).toBe(true);
  // });
});
