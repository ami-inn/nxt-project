import { PagerComponent } from '@syncfusion/ej2-react-grids'
import React from 'react'
import Header from '../../../components/Header'
import TripCard from '../../../components/TripCard'

const Trips = () => {
    const trips = [
        {
            id: '1',
            name: "Tropical Rewind",
            imageUrls: ["/assets/images/sample1.jpg"],
            itinerary: [{ location: "Thailand" }],
            tags: ["Adventure", "Culture"],
            interests: ["Adventure", "Culture"],
            travelStyle: "Solo",
            estimatedPrice: "$1,000",
        }
    ]
    const currentPage = 1;
    const handlePageChange = (page: number) => {
        console.log('Page changed to:', page);
    };

    const loaderData = {
        trips: trips,
        total: 1
    }
  return (
   <main className="all-users wrapper">
            <Header
                title="Trips"
                description="View and edit AI-generated travel plans"
                ctaText="Create a trip"
                ctaUrl="/trips/create"
            />

            <section>
                <h1 className="p-24-semibold text-dark-100 mb-4">
                    Manage Created Trips
                </h1>

                <div className="trip-grid mb-4">
                    {trips.map((trip) => (
                        <TripCard
                            key={trip.id}
                            id={trip.id}
                            name={trip.name}
                            imageUrl={trip.imageUrls[0]}
                            location={trip.itinerary?.[0]?.location ?? ""}
                            // tags={[trip.interests, trip.travelStyle]}
                            tags = {[...trip.interests, trip.travelStyle]}
                            price={trip.estimatedPrice}
                        />
                    ))}
                </div>

                <PagerComponent
                    totalRecordsCount={loaderData.total}
                    pageSize={8}
                    currentPage={currentPage}
                    click={(args) => handlePageChange(args.currentPage)}
                    cssClass="!mb-4"
                />
            </section>
        </main>
  )
}

export default Trips