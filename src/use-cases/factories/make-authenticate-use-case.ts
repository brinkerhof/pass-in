import { prismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import {
  authenticateUseCase,
  authenticateUseCaseRequest,
} from "../authenticate";

export function makeAuthenticateUseCase(request: authenticateUseCaseRequest) {
  return authenticateUseCase(prismaUsersRepository, request);
}
