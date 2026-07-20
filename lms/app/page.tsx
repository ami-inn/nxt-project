import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CtaSection from '@/components/CtaSection'
import { recentSessions } from '@/constants'
import { currentUser } from '@clerk/nextjs/server'
import { getAllCompanions, getRecentSessions, getBookmarkedCompanions } from '@/lib/actions/companion.action'
import { getSubjectColor } from '@/lib/utils'

import React from 'react'

const page =  async() => {
  const user = await currentUser();
  const companions = await getAllCompanions({limit:3})
  const recentSessionCOmpanions = await getRecentSessions(10)
  const bookmarkedCompanions: Companion[] = user ? await getBookmarkedCompanions(user.id) : [];
  const bookmarkedIds = new Set(
    bookmarkedCompanions.map((companion) => companion.id)
  );

  return (
    <main>
      <h1 className='text-2xl underline '>
        popular companions
      </h1>

      <section className='home-section'>
        {companions.map((companion)=>(
          <CompanionCard
            key={companion.id}
            color={getSubjectColor(companion.subject)}
            {...companion}
            bookmarked={bookmarkedIds.has(companion.id)}
          />
        ))}
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
