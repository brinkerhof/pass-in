import { test, expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCaseRequest, registerUseCase } from "./register";
import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

function sut(request: RegisterUseCaseRequest) {
  return registerUseCase(inMemoryUsersRepository, request);
}

describe("Register Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository.reset();
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      role: "MEMBER",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.passwordHash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not allow registration with an email that is already in use", async () => {
    const email = "johndoe@example.com";

    await sut({
      name: "John Doe",
      email,
      password: "123456",
      role: "MEMBER",
    });

    await expect(
      sut({
        name: "John Doe",
        email,
        password: "123456",
        role: "MEMBER",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should return the user data upon successful registration", async () => {
    const { user } = await sut({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      role: "MEMBER",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
