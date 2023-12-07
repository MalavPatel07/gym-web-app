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
function Home({isLoggedIn, userDetails, allUserDetails, userCount}) {
  return (
    <div>
      <HeroSection />
      {isLoggedIn && <PersonalizedContent userDetails={userDetails}/>}
      <ContentSection />
      <ChoiceSection />
      <TestimonialSection allUserDetails={allUserDetails}/>
      <PressSection/>
      {!isLoggedIn && <PricingSection />}
      {isLoggedIn && <TotalMembersSectionB userCount = {userCount}/>}
      {!isLoggedIn && <TotalMembersSection userCount = {userCount}/>}
    </div>
  );
}

export default Home;
