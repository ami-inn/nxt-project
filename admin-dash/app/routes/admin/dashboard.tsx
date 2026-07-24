import React from "react";
import Header from "../../../components/Header";
import StatsCard from "../../../components/StatsCard";
import TripCard from "../../../components/TripCard";

const allTrips = [
  {
    id: 1,
    name: "Tropical Rewind",
    imageUrls: ["/assets/images/sample1.jpg"],
    itinerary: [{ location: "Thailand" }],
    tags: ["Adventure", "Culture"],
    interests: ["Adventure", "Culture"],
    travelStyle: "Solo",
    estimatedPrice: "$1,000",
  },
  {
    id: 2,
    name: "French Reverie",
    imageUrls: ["/assets/images/sample2.jpg"],
    itinerary: [{ location: "Paris" }],
    tags: ["Relaxation", "Culinary"],
    interests: ["Relaxation", "Culinary"],
    travelStyle: "Family",
    estimatedPrice: "$2,000",
  },
  {
    id: 3,
    name: "Zen Break",
    imageUrls: ["/assets/images/sample3.jpg"],
    itinerary: [{ location: "Japan" }],
    tags: ["Shopping", "Luxury"],
    interests: ["Shopping", "Luxury"],
    travelStyle: "Couple",
    estimatedPrice: "$3,000",
  },
  {
    id: 4,
    name: "Adventure in Westeros",
    imageUrls: ["/assets/images/sample4.jpg"],
    itinerary: [{ location: "Croatia" }],
    tags: ["Historical", "Culture"],
    interests: ["Historical", "Culture"],
    travelStyle: "Friends",
    estimatedPrice: "$4,000",
  },
];

const user = { name: "John Doe" }; // Replace with actual user data from loader or context

const dashboardStats = {
  totalUsers: 1200,
  userJoined: { currentMonth: 50, previousMonth: 40 },
  totalTrips: 300,
  tripsCreated: { currentMonth: 20, previousMonth: 15 },
};

const Dashboard = () => {
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
            currentMonthCount={dashboardStats.tripsCreated.currentMonth}
            lastMonthCount={dashboardStats.tripsCreated.previousMonth}
            headerTitle="New Trips"
            total={dashboardStats.totalTrips}
          />
          <StatsCard
            currentMonthCount={dashboardStats.userJoined.currentMonth}
            lastMonthCount={dashboardStats.userJoined.previousMonth}
            headerTitle="New Users"
            total={dashboardStats.totalUsers}
          />
        </div>
      </section>

             <section className="container">
                <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>

                <div className='trip-grid'>
                    {allTrips.map((trip) => (
                        <TripCard
                            key={trip.id}
                            id={trip.id.toString()}
                            name={trip.name!}
                            imageUrl={trip.imageUrls[0]}
                            location={trip.itinerary?.[0]?.location ?? ''}
                          tags={[...trip.interests, trip.travelStyle]}
                            price={trip.estimatedPrice!}
                        />
                    ))}
                </div>
            </section>
    </main>
  );
};

export default Dashboard;
