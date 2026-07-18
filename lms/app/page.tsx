import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CtaSection from '@/components/CtaSection'

import React from 'react'

const page = () => {
  return (
    <main>
      <h1 className='text-2xl underline'>
        popular companions

      </h1>

      <section className='home-section'>
        <CompanionCard
        id='12'
        name='neura the brainy explorer'
        topic="neural network of the brain"
        subject='science'
        duration={45}
        color='#ffda6e'
        bookmarked
        key={1}
        />
          <CompanionCard
        id='12'
        name='neura the brainy explorer'
        topic="neural network of the brain"
        subject='science'
        duration={45}
        color='#ffda6e'
        bookmarked
        key={1}
        />
          <CompanionCard
        id='12'
        name='neura the brainy explorer'
        topic="neural network of the brain"
        subject='science'
        duration={45}
        color='#ffda6e'
        bookmarked
        key={1}
        />
    

      </section>

      <section className='home-section'>
        <CompanionList/>
        <CtaSection/>
      </section>
      
    </main>
  )
}

export default page
