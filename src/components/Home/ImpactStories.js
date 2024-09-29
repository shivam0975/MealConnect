import React from 'react';
import './ImpactStories.css';
import Ngo from './ngo.jpg'
import Family from './family.jpg'
import Distr from './distributing.jpg'
  

const ImpactStories = (props) => {

  return (
    <div className="impact-stories-section" >
      <h2>Our Impact Stories</h2>
      <div className="stories-container">
        <div className="story" data-aos="fade-up">
          <img src={Family} alt="Family receiving food donation" />
          <h3>Feeding Families in Need</h3>
          <p>
            After losing her job during the pandemic, Maria struggled to provide meals for her children. Thanks to the generosity of local restaurants
            and volunteers, Maria's family received nutritious meals every day. "It was a blessing," Maria said. "I don't know what we would have done
            without the help."
          </p>
        </div>

        <div className="story" data-aos="fade-up">
          <img src={Distr} alt="Volunteers delivering food" />
          <h3>Volunteers Making a Difference</h3>
          <p>
            John, a college student, signed up as a volunteer to give back to his community. "I never realized how many people in my own neighborhood
            were in need," he said. "Delivering food to families not only gave me a sense of purpose but also opened my eyes to the power of community support."
          </p>
        </div>

        <div className="story last" data-aos="fade-up">
          <img src={Ngo} alt="NGO distributing food" />
          <h3>Partnership with NGOs: Expanding Our Reach</h3>
          <p>
            By partnering with local NGOs, our mission to prevent food waste and reduce hunger has expanded significantly. One NGO director shared,
            "With your help, we've been able to distribute meals to hundreds of individuals who otherwise wouldn't know where their next meal would come from."
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImpactStories;
