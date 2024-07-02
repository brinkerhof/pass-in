import { prismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCaseRequest, registerUseCase } from "../register";

export function makeRegisterUseCase(request: RegisterUseCaseRequest) {
  return registerUseCase(prismaUsersRepository, request);
}
