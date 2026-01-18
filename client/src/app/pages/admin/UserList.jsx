import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil, Trash } from "lucide-react";
import React from "react";
import Loading from "@/components/common/Loading";
import { useDeleteUser, useGetUserList } from "@/hooks/useAdmin";
import { useNavigate } from "react-router";

const UserList = () => {
  const { isLoading, data } = useGetUserList();
  const { mutate, isPending } = useDeleteUser();

  const users = data?.users;
  const navigate = useNavigate();
  console.log(users);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-125">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="text-xs text-muted-foreground">
                    {user._id}
                  </TableCell>

                  <TableCell>
                    <img
                      src={user.avatar?.url}
                      alt={user.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  </TableCell>

                  <TableCell className="font-medium">{user.name}</TableCell>

                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium`}>
                      {user.email}
                    </span>
                  </TableCell>

                  <TableCell>{user.role}</TableCell>

                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button
                      onClick={() => navigate(`/admin/user/${user._id}`)}
                      size="icon"
                      variant="outline"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      disabled={isPending}
                      onClick={() => mutate(user?._id)}
                      variant="destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default UserList;
