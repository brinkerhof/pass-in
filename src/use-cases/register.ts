import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";
import { UsersRepository } from "@/repositories/users-repository";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export const registerUseCase = async (
  usersRepository: UsersRepository,
  { email, name, password }: RegisterUseCaseRequest
): Promise<RegisterUseCaseResponse> => {
  const passwordHash = await hash(password, 6);

  const verifyIfEmailAlreadyExists = await usersRepository.findByEmail(email);

  if (verifyIfEmailAlreadyExists) throw new UserAlreadyExistsError();

  const user = await usersRepository.create({ email, name, passwordHash });

  return { user };
};
