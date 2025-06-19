import React from 'react';
import PropertyForm from '../components/PropertyForm';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Lone Star Appeals</h1>
            <p>Report your property information to assist in fighting your property taxes.</p>
            <PropertyForm />
        </div>
    );
};

export default Home;