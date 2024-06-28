import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      async headers() {
        return {
            //Authorization: "Bearer " + localStorage.getItem("token")
            Authorization: "Bearer 123"
        }
      }
    }),
  ],
});

async function main() {
    let response = await trpc.createTodo.mutate({
        title: "todo 1",
        description: "description of todo 1",
    });

    console.log(response)
}

main()

