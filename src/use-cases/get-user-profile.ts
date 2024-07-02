import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export async function getUserProfileUseCase(
  usersRepository: UsersRepository,
  { userId }: GetUserProfileUseCaseRequest
): Promise<GetUserProfileUseCaseResponse> {
  const user = await usersRepository.findById(userId);

  if (!user) throw new ResourceNotFoundError();

  return { user };
}
