import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { Role } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.nativeEnum(Role).default(Role.MEMBER),
});

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, name, password, role } = registerSchema.parse(request.body);

  try {
    const user = await makeRegisterUseCase({ email, name, password, role });

    return reply.status(200).send(user);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    return reply.status(500).send({ message: "Internal server error" }); // fix me
  }
}
