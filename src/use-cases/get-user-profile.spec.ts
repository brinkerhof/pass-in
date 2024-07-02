import { expect, describe, it, beforeEach } from "vitest";
import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { registerUseCase } from "./register";
import { Role } from "@prisma/client";
import {
  GetUserProfileUseCaseRequest,
  getUserProfileUseCase,
} from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

function sut(request: GetUserProfileUseCaseRequest) {
  return getUserProfileUseCase(inMemoryUsersRepository, request);
}

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository.reset();
  });

  it("should return the user profile", async () => {
    const { user: createdUser } = await registerUseCase(
      inMemoryUsersRepository,
      {
        name: "JohnDoe",
        email: "email@teste.com",
        password: "123456",
        role: Role.MEMBER,
      }
    );

    const { user } = await sut({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("JohnDoe");
  });

  it("should not return the user profile if the user does not exist", async () => {
    expect(() =>
      sut({
        userId: "non-existing-user-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
