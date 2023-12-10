import React from 'react';
import HeroSection from './heroSection';
import PersonalizedContent from './personalizedSection';
import PressSection from './pressSection';
import ContentSection from './contentSection';
import ChoiceSection from './choiceSection';
import TotalMembersSection from './memberSection';
import TotalMembersSectionB from './memberSectionB';
import TestimonialSection from './testimonialSection';
import PricingSection from './pricingSection';
import './home.css'
function Home({isLoggedIn}) {
  return (
    <div>
      <HeroSection />
      {isLoggedIn && <PersonalizedContent/>}
      <ContentSection />
      <ChoiceSection />
      <TestimonialSection/>
      <PressSection/>
      {!isLoggedIn && <PricingSection />}
      {isLoggedIn && <TotalMembersSectionB />}
      {!isLoggedIn && <TotalMembersSection />}
    </div>
  );
}

export default Home;
