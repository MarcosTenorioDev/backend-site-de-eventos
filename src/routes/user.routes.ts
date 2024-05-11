import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { User, UserCreate, UserUpdate } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import { jwtValidator } from "../middlewares/auth.middlewares";

const userRepository = new UserRepositoryPrisma();
const userUseCase = new UserUseCase(userRepository);

export async function userRoutes(fastify: FastifyInstance) {
    registerUserRoute(fastify);
    updateUserRoute(fastify);
    deleteUserRoute(fastify);
    getUserRoute(fastify);
}

function registerUserRoute(fastify: FastifyInstance) {
    fastify.post<{ Body: UserCreate }>('/', async (req, reply) => {
        const { externalId, firstName, lastName, email } = req.body;
        try {
            const data = await userUseCase.create({ externalId, firstName, lastName, email });
            reply.code(201).send(data);
        } catch (error) {
            reply.code(400).send(error);
        }
    });
};

function updateUserRoute(fastify: FastifyInstance) {
    fastify.patch<{ Body: UserUpdate, Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        const { firstName, lastName, email, role, cpf, phone } = req.body;
        try {
            const data = await userUseCase.update({ id, firstName, lastName, email, role, cpf, phone });
            reply.code(200).send(data);
        } catch (error) {
            reply.code(400).send(error);
        }
    });
};

function deleteUserRoute(fastify: FastifyInstance) {
    fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        try {
            const data = await userUseCase.delete(id);
            return reply.send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    });
};

function getUserRoute(fastify: FastifyInstance) {
    fastify.addHook("preHandler", jwtValidator);
    fastify.get<{ Params: { userId: string } }>('/', async (req, reply) => {
        const externalId = req.params.userId;
        try {
            const data = await userUseCase.findUserByExternalOrId(externalId);
            console.log(data);
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}

