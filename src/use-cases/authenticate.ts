import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

export interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export async function authenticateUseCase(
  usersRepository: UsersRepository,
  { email, password }: AuthenticateUseCaseRequest
): Promise<AuthenticateUseCaseResponse> {
  const user = await usersRepository.findByEmail(email);

  if (!user) throw new InvalidCredentialsError();

  const doesPasswordMatch = await compare(password, user.passwordHash);

  if (!doesPasswordMatch) throw new InvalidCredentialsError();

  return { user };
}
