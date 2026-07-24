import React from 'react'
import Header from '../../../components/Header'

const Dashboard = () => {
    const user = {name: 'John Doe'}; // Replace with actual user data from loader or context
  return (
    <main className='dashboard wrapper'>
        <Header
                title={`Welcome ${user?.name ?? 'Guest'} 👋`}
                description="Track activity, trends and popular destinations in real time"
            />
    </main>
  )
}

export default Dashboard
 