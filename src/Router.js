import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Importing all the components
import Homepage from './components/Home/Homepage';
import RestaurantDashboard from './components/RestaurantDashboard';
import AddDonation from './components/AddDonation';
import NGODashboard from './components/NGODashboard';
import VolunteerSignup from './components/VolunteerSignup';
import Blog from './components/Blog';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import ManageDonations from './components/ManageDonations';

const AppRouter = () => {

    const NotFound = () => {
        return (
          <div>
            <h1>404 - Page Not Found</h1>
            <Link to="/">Go back to Home</Link>
          </div>
        );
      };

  return (
    <Router>
      <Routes>
        {/* Define the routes for each component */}
        <Route path="/" element={<Homepage />} />
        <Route path="/restaurants" element={<RestaurantDashboard />} />
        <Route path="/add-donation" element={<AddDonation />} />
        <Route path="/ngos" element={<NGODashboard />} />
        <Route path="/volunteer" element={<VolunteerSignup />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel />} />

        <Route path="/manage-donations" element={<ManageDonations />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
