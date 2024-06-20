import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;

}

export const registerUseCase = async (usersRepository: any, { email, name, password }: RegisterUseCaseRequest) => {
  const passwordHash = await hash(password, 6)

  const verifyIfEmailAlreadyExists = await usersRepository.findByEmail(email)

  if (verifyIfEmailAlreadyExists) throw new UserAlreadyExistsError()

  const user = await usersRepository.create({ email, name, passwordHash })

  return user
}

