
import { env } from '../src/env';
import fastify from "fastify";
import { userRoutes } from './routes/user.routes';
import { eventRoutes } from "./routes/event.routes";
import { webhookClerk } from "./routes/clerkWebhook.routes";
import { purchaseOrderRoutes } from "./routes/purchaseOrder.routes";
import { attractionRoutes } from './routes/attraction.routes';
import cors from '@fastify/cors'
import { assetRoutes } from "./routes/asset.routes";
import { FastifyInstance } from "fastify/types/instance";
import { eventCategoryRoutes } from './routes/eventCategory.routes';
import { eventOrganizersRoutes } from './routes/eventOrganizers.routes';
import { waitingListRoutes } from './routes/waitingList.routes';
import { producerRoutes } from './routes/producer.routes';
import { addressRoutes } from './routes/address.routes';
import { ticketTypeRoutes } from './routes/ticketType.routes';
import { ticketRoutes } from './routes/ticket.routes';

const app: FastifyInstance = fastify({ logger: true });
const port = parseInt(env.PORT as string);

app.register(cors, {
    origin: [
        'http://localhost:5173',
        'https://site-de-eventos-frontend.vercel.app'
    ]
});

app.register(userRoutes, {
    prefix: '/users',
});

app.register(eventRoutes, {
    prefix: '/events'
})

app.register(webhookClerk, {
    prefix: '/clerk'
})
app.register(purchaseOrderRoutes, {
    prefix: '/purchaseorder'
})
app.register(assetRoutes, {
    prefix: '/assets'
})
app.register(attractionRoutes, {
    prefix: '/attractions'
})
app.register(eventCategoryRoutes, {
    prefix: '/eventcategories'
})
app.register(eventOrganizersRoutes, {
    prefix: '/eventorganizers'
})

app.register(waitingListRoutes, {
    prefix: '/waitinglists'
})
app.register(producerRoutes, {
    prefix: '/producers'
})
app.register(addressRoutes, {
    prefix: '/address'
})
app.register(ticketTypeRoutes, {
    prefix: '/tickettypes'
})
app.register(ticketRoutes, {
    prefix: '/tickets'
})
app.listen({ port: port || 3000, host: '0.0.0.0' }, function (err, address) {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    app.log.info(`server listening on ${address}`)
})
