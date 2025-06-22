import { authClient } from "../lib/auth";

export function User() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  return { session: session ? session : null, isPending, error, refetch };
}
