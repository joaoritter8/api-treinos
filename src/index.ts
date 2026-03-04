import "dotenv/config";

import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
const app = Fastify({
  logger: true,
});

app.withTypeProvider<ZodTypeProvider>().route({
  method: "GET",
  url: "/",
  schema: {
    response: {
      200: z.object({
        message: z.string(),
      }),
    },
  },
  handler: () => {
    return { message: "Hello World" };
  },
});

app.listen({ port: Number(process.env.PORT) });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

try {
  await app.listen({ port: Number(process.env.PORT) });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
