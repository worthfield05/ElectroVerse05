import Loading from "@/components/common/Loading";
import PageTitle from "@/components/common/PageTitle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProfile } from "@/hooks/useAuth";
import { format } from "date-fns";
import React from "react";

const Profile = () => {
  const { data, isLoading } = useProfile();
  if (isLoading) return <Loading />;
  const user = data?.user || null;
  const createdAt = user?.createdAt
    ? format(new Date(user.createdAt), "PPP")
    : "-";

  return (
    <>
      <PageTitle title={"My Profile"} />
      <Card className="max-w-sm w-full mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
        <CardHeader className={"flex flex-col items-center gap-2 p-6"}>
          <Avatar className={"w-24 h-24"}>
            <AvatarImage src={user?.avatar?.url || "/logo.png"} />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
          <CardTitle className={"text-xl text-center"}>
            {user?.name || "Anonymous"}
          </CardTitle>
          <CardDescription className={"text-sm text-center text-gray-500"}>
            {user?.email || "No email provided"}
          </CardDescription>
        </CardHeader>
        <CardContent className={"px-6 py-4 border-t border-gray-100"}>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Joined</span>
            <span className="text-gray-800 font-medium text-sm">
              {createdAt}
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;
