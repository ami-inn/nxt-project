import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CtaSection from '@/components/CtaSection'
import { recentSessions } from '@/constants'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.action'
import { getSubjectColor } from '@/lib/utils'

import React from 'react'

const page =  async() => {

  const companions = await getAllCompanions({limit:3})
  const recentSessionCOmpanions = await getRecentSessions(10)
  return (
    <main>
      <h1 className='text-2xl underline '>
        popular companions

      </h1>

      <section className='home-section'>
     
     {
      companions.map((companion)=>(
        <CompanionCard
        key={companion.id}
        color={getSubjectColor(companion.subject)}
        {...companion}
        />
      ))
     }

      </section>

      <section className='home-section'>
        <CompanionList
        title='recent sessions'
        companions={recentSessionCOmpanions}
        classNames='w-2/3 max-lg:w-full'
        />
        <CtaSection/>
      </section>
      
    </main>
  )
}

export default page
