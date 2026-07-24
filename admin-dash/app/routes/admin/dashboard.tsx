import React from "react";
import Header from "../../../components/Header";
import StatsCard from "../../../components/StatsCard";

const Dashboard = () => {
  const user = { name: "John Doe" }; // Replace with actual user data from loader or context

  const dashboardStats = {
    totalUsers: 1200,
    userJoined: { currentMonth: 50, previousMonth: 40 },
    totalTrips: 300,
    tripsCreated: { currentMonth: 20, previousMonth: 15 },
  };

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"} 👋`}
        description="Track activity, trends and popular destinations in real time"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            currentMonthCount={dashboardStats.userJoined.currentMonth}
            lastMonthCount={dashboardStats.userJoined.previousMonth}
            headerTitle="New Users"
            total={dashboardStats.totalUsers}
          />
            <StatsCard
            currentMonthCount={dashboardStats.userJoined.currentMonth}
            lastMonthCount={dashboardStats.userJoined.previousMonth}
            headerTitle="New Users"
            total={dashboardStats.totalUsers}
          />
            <StatsCard
            currentMonthCount={dashboardStats.userJoined.currentMonth}
            lastMonthCount={dashboardStats.userJoined.previousMonth}
            headerTitle="New Users"
            total={dashboardStats.totalUsers}
          />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
