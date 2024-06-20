import { prismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { registerUseCase } from "@/use-cases/register";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
})


export const registerController = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, name, password } = registerSchema.parse(request.body)

  try {
    const user = await registerUseCase(prismaUsersRepository, { email, name, password })

    return reply.status(200).send(user)

  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    return reply.status(500).send({ message: "Internal server error" }) // fix me


  }
}
