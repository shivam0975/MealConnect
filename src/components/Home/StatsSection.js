import './StatsSection.css';
import vect from './vect3.png';
import vect1 from './vect.png';
import vect2 from './vect1.png';
import vect3 from './vect2.png';


const StatsSection = (props) => {

  return (
    <div className="stats-section">
      <h2 data-aos="fade">Our Impact</h2>
      <p className="impact-description" data-aos="fade">
        At Our Organization, we are committed to reducing food waste and feeding communities in need. Through collaboration, dedication, and the support of volunteers, we have achieved remarkable milestones. Here are some key highlights of our impact.
      </p>
      <div className="stats-container" data-aos="fade-up">
        <div className="stat-item">
          <img src={vect} alt='' />
          <h3 className='first'>1,000,000+</h3>
          <p>Meals Distributed</p>
          <span>
            We have provided over one million meals to underserved communities, ensuring that surplus food is delivered to those who need it most.
          </span>
        </div>
        <div className="stat-item">
          <img src={vect1} alt='' />
          <h3>500+</h3>
          <p>Volunteers Engaged</p>
          <span>
            Our community of volunteers continues to grow, contributing thousands of hours to making sure no food goes to waste.
          </span>
        </div>
        <div className="stat-item">
          <img src={vect2} alt='' />
          <h3>300+</h3>
          <p>Partner NGOs</p>
          <span>
            We collaborate with over 300 NGOs, expanding our reach to provide critical food support to people around the world.
          </span>
        </div>
        <div className="stat-item">
          <img src={vect3} alt='' />
          <h3>80%</h3>
          <p>Food Recovery Rate</p>
          <span>
            Our efforts have resulted in an 80% recovery rate of surplus food from local businesses, helping to significantly reduce food waste.
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
