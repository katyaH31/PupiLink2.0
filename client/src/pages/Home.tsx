import React from 'react';
import ChatWindow from '../components/ChatWindow';
import Pupi_card_grid from '../components/Pupi_card_grid';
import Filter_bar from '../components/Filter_bar';

const Home: React.FC = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
        <div className="text-center">
          <Filter_bar/>
          <Pupi_card_grid />
        </div>
        <ChatWindow />
      </div>
    );
};

export default Home;








