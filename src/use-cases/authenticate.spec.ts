import { expect, describe, it, beforeEach } from "vitest";
import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare, hash } from "bcryptjs";
import {
  authenticateUseCase,
  AuthenticateUseCaseRequest,
} from "./authenticate";
import { registerUseCase } from "./register";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

function sut(request: AuthenticateUseCaseRequest) {
  return authenticateUseCase(inMemoryUsersRepository, request);
}

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository.reset();
  });

  it("should authenticate a user with the correct credentials", async () => {
    const password = "123456";
    await registerUseCase(inMemoryUsersRepository, {
      email: "email@teste.com",
      name: "teste",
      password,
      role: "MEMBER",
    });

    const { user } = await sut({
      email: "email@teste.com",
      password,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not authenticate a user with the wrong password", async () => {
    await registerUseCase(inMemoryUsersRepository, {
      email: "email@teste.com",
      name: "teste",
      password: await hash("123456", 6),
      role: "MEMBER",
    });

    expect(() =>
      sut({
        email: "email@teste.com",
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not authenticate a user with the wrong email", async () => {
    expect(() =>
      sut({
        email: "wrong@email.com",
        password: "123123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
