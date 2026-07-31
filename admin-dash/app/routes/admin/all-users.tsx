import Header from "../../../components/Header";
import { ColumnsDirective, ColumnDirective, GridComponent } from "@syncfusion/ej2-react-grids";
import { cn, formatDate } from "../../../lib/utils";

import type { Route } from "./+types/all-users";
import { getAllUsers } from "~/appwrite/auth";

const normalizeUsers = (users: Record<string, unknown>[] = []) =>
  users.map((user) => ({
    ...user,
    id: (user.$id as string) || (user.accountId as string) || "",
    name: (user.name as string) || "Unknown",
    email: (user.email as string) || "",
    imageUrl: (user.imageUrl as string) || "/assets/images/david.webp",
    joinedAt: (user.joinedAt as string) || "",
    status: (user.status as string) || "user",
  }));

export const loader = async () => {
  const { users, total } = await getAllUsers(10, 0);
  return { users: normalizeUsers(users as Record<string, unknown>[]), total };
};

//normalizeUsers is a function that takes in an array of users and returns an array of users with the following properties: id, name, email, imageUrl, joinedAt, status. If any of these properties are missing, it will default to a value. For example, if the name is missing, it will default to "Unknown".
// its using because the data returned from the getAllUsers function may not have all the properties we need, so we want to make sure that we have a consistent shape for our user data before we pass it to the component.

const AllUsers = ({ loaderData }: Route.ComponentProps) => {
  const { users } = loaderData;

  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter, sort, and access detailed user profiles"
      />

      <GridComponent dataSource={users} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
            template={(props: Record<string, unknown>) => (
              <div className="flex items-center gap-1.5 px-4">
                <img
                  src={(props.imageUrl as string) || "/assets/images/david.webp"}
                  alt="user"
                  className="rounded-full size-8 aspect-square"
                  referrerPolicy="no-referrer"
                />
                <span>{(props.name as string) || "Unknown"}</span>
              </div>
            )}
          />
          <ColumnDirective
            field="email"
            headerText="Email Address"
            width="200"
            textAlign="Left"
          />
          <ColumnDirective
            field="joinedAt"
            headerText="Date Joined"
            width="140"
            textAlign="Left"
            template={({ joinedAt }: { joinedAt?: string }) => formatDate(joinedAt || "")}
          />
          <ColumnDirective
            field="status"
            headerText="Type"
            width="100"
            textAlign="Left"
            template={({ status }: { status?: string }) => (
              <article
                className={cn(
                  "status-column",
                  status === "user" ? "bg-success-50" : "bg-light-300"
                )}
              >
                <div
                  className={cn(
                    "size-1.5 rounded-full",
                    status === "user" ? "bg-success-500" : "bg-gray-500"
                  )}
                />
                <h3
                  className={cn(
                    "font-inter text-xs font-medium",
                    status === "user" ? "text-success-700" : "text-gray-500"
                  )}
                >
                  {status || "user"}
                </h3>
              </article>
            )}
          />
        </ColumnsDirective>
      </GridComponent>
    </main>
  );
};

export default AllUsers;