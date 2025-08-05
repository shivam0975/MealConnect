import React from 'react';
import './AboutSection.css'; // Link to the CSS file for styling
import abt1 from './abt1.svg';
import abt2 from './abt2.png';
import abt3 from './abt3.svg';
import image from './image.avif';

const AboutSection = () => {
    return (
        <div className="about-section">
            {/* Main content including text and 'what-we-do' items */}
            <div className='main-content'>
                <div className='content'>
                    <h2>Who We Are & <br /> What We Do</h2>
                    <p>
                        We are a nonprofit organization dedicated to reducing food waste and
                        supporting communities in need. Our mission is to connect surplus food
                        from restaurants and grocery stores to local NGOs and shelters, ensuring
                        that no food goes to waste while helping those who are hungry.
                    </p>
                </div>

                <div className="what-we-do-container">
                    <div className="what-we-do-item">
                        <div className='div-image first'>
                            <img src={abt1} alt='Collect Food Donations' />
                        </div>
                        <h3>Collect Food Donations</h3>
                        <p>
                            We partner with restaurants and grocery stores to collect
                            surplus food, ensuring it reaches those in need.
                        </p>
                    </div>
                    <div className="what-we-do-item">
                        <div className='div-image second'>
                            <img src={abt2} alt='Distribute to NGOs' />
                        </div>
                        <h3>Distribute to NGOs</h3>
                        <p>
                            We work with local NGOs to distribute the collected food to
                            shelters and communities that require assistance.
                        </p>
                    </div>
                    <div className="what-we-do-item">
                        <div className='div-image third'>
                            <img src={abt3} alt='Raise Awareness' />
                        </div>
                        <h3>Raise Awareness</h3>
                        <p>
                            We educate the community about food waste, its impact, and how
                            everyone can help reduce it.
                        </p>
                    </div>
                </div>
            </div>

            {/* Image section */}
            <div className='image'>
                <img src={image} alt='About Us' />
            </div>
        </div>
    );
};

export default AboutSection;

