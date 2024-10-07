import React, { useState } from 'react';
import axios from 'axios';  
import { AiOutlineSearch, AiOutlineCloseCircle } from 'react-icons/ai';
import { BsHouseDoor } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import Modal from './Modal'; 
const WaterLevelChecker = () => {
  const [district, setDistrict] = useState('');
  const [block, setBlock] = useState('');
  const [village, setVillage] = useState('');
  const [waterLevel, setWaterLevel] = useState(null); 
  const [showModal, setShowModal] = useState(false);  

  
  const handleCheckIn = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/water-level', {
        params: { district, blockName: block, villageName: village }
      });
      setWaterLevel(response.data.WATER_LEVEL);  
    } catch (err) {
      console.error("Error in fetching water level", err);
      setWaterLevel(null); 
    }
    
    setShowModal(true); 
  };

  return (
    <div className="grid gap-10 bg-gray-100 rounded-[10px] p-[3rem] mt-10">
      <div className="flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-lg">
        <div className="flex gap-2 items-center">
          <AiOutlineSearch className="text-[25px] text-gray-500" />
          <input
            type="text"
            className="bg-transparent text-blue-500 focus:outline-none w-[100%]"
            placeholder="Enter the district..."
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
          <AiOutlineCloseCircle className="text-[30px] text-[#a5a6a6] hover:text-textColor" />
        </div>
        <div className="flex gap-2 items-center">
          <BsHouseDoor className="text-[25px] text-gray-500" />
          <input
            type="text"
            className="bg-transparent text-blue-500 focus:outline-none w-[100%]"
            placeholder="Find the Block..."
            value={block}
            onChange={(e) => setBlock(e.target.value)}
          />
          <AiOutlineCloseCircle className="text-[30px] text-[#a5a6a6] hover:text-textColor" />
        </div>
        <div className="flex gap-2 items-center">
          <CiLocationOn className="text-[25px] text-gray-500" />
          <input
            type="text"
            className="bg-transparent text-blue-500 focus:outline-none w-[100%]"
            placeholder="Find the Village..."
            value={village}
            onChange={(e) => setVillage(e.target.value)}
          />
          <AiOutlineCloseCircle className="text-[30px] text-[#a5a6a6] hover:text-textColor" />
        </div>
        <button
          className="bg-blue-500 text-white h-full p-5 px-10 rounded-[10px] hover:bg-blue-600"
          onClick={handleCheckIn} 
        >
          Check-in
        </button>
      </div>

      {/* Modal to display form data */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        district={district}
        block={block}
        village={village}
        waterLevel={waterLevel} 
      />
    </div>
  );
};

export default WaterLevelChecker;
