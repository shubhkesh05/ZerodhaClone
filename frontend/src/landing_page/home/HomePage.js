import React from 'react';
import Award from './Award';
import Education from './Education';
import OpenAccount from '../OpenAccount';
import Pricing from './Pricing';
import Stats from './Stats';
import Hero from './Hero';

function HomePage() {
    return ( 
        <>
       
        <Hero/>
        <Award/>
        <Stats/>
       <Pricing/>
        <Education/>
        <OpenAccount/>
        
        
        </>
     );
}

export default HomePage;