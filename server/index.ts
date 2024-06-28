import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const appRouter = router({
    signUp: publicProcedure
        .input(
            z.object({
                email: z.string(),
                password: z.string(),
            })
        )
        .mutation(async (opts) => {
            let email = opts.input.email
            let password = opts.input.password

            // do db stuff here
            // sign jwt token

            return {
                email, password
            };
        }),

    createTodo: publicProcedure
        .input(
            z.object({
                title: z.string(),
                description: z.string()
            })
        )    
        .mutation(async (opts) => {
            const username = opts.ctx.username
            console.log(username)
            let title = opts.input.title
            let description = opts.input.description
            let done = false
            // do db stuff here

            return {
                title, description, done
            };
        })
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];
    console.log(authHeader)
    // jwt.verify
    return {
        username: "dummy"
    }
  }
});

// Even in express it is preferred to use context to pass username

server.listen(3000);