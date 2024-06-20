import { test, expect, describe, it, beforeEach } from "vitest";
import { registerUseCase } from "./register";
import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository.reset!();
  });

  it("should hash user password upon registration", async () => {
    const { user } = await registerUseCase(inMemoryUsersRepository, {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.passwordHash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not allow registration with an email that is already in use", async () => {
    const email = "johndoe@example.com";

    await registerUseCase(inMemoryUsersRepository, {
      name: "John Doe",
      email,
      password: "123456",
    });

    expect(
      registerUseCase(inMemoryUsersRepository, {
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should return the user data upon successful registration", async () => {
    const { user } = await registerUseCase(inMemoryUsersRepository, {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
