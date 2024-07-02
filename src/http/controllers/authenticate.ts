import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateSchema.parse(request.body);

  try {
    const { user } = await makeAuthenticateUseCase({ email, password });

    const token = await reply.jwtSign(
      { role: user.role },
      { sign: { sub: user.id } }
    );

    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: "Invalid credentials" });
    }
    throw error;
  }
}
