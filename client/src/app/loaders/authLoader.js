import { queryClient } from "@/lib/queryClient";
import auth from "@/apis/auth";
import { redirect } from "react-router";
export const authLoader = async () => {
  try {
    const user = await queryClient.fetchQuery({
      queryKey: ["me"],
      queryFn: auth.profile,
    });
    if (user) redirect("/");
    return null;
  } catch {
    return null;
  }
};
export const protectedLoader = async () => {
  const cachedData = await queryClient.getQueryData(["me"]);
  if (cachedData) {
    redirect("/");
  }
  return null;
};
