import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineSearch, AiOutlineCloseCircle } from 'react-icons/ai'
import { BsHouseDoor } from "react-icons/bs";
import { CiLocationOn } from 'react-icons/ci'
const WaterLevelChecker = () => {
    const [district, setDistrict] = useState('');
    const [block, setBlock] = useState('');
    const [village, setVillage] = useState('');
    const [waterLevel, setWaterLevel] = useState(null);

    // Fetch water level from the backend
    const fetchWaterLevel = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/water-level`, {
                params: { district, blockName: block, villageName: village }
            });
            setWaterLevel(response.data.WATER_LEVEL);
          
        } catch (err) {
            console.error("Error in fetching water level", err);
        }
    };

    return (
        <div className='grid gp-10 bg-greyIsh rounded-[10px] p-[3rem] mt-10'>

            <div className='flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 drop-shadow-greyIsh-700'>
                <div className='flex gap-2 items-center'>
                    <AiOutlineSearch className='text-[25px] icon' />
                    <input type='text' className='bg-transparent text-blue-500 focus:outline-none w-[100%]' placeholder='Enter the district...' value={district}
                        onChange={(e) => setDistrict(e.target.value)}></input>
                    <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon' />
                </div>
                <div className='flex gap-2 items-center'>
                    <BsHouseDoor className='text-[25px] icon' />
                    <input type='text' className='bg-transparent text-blue-500 focus:outline-none w-[100%]' placeholder='Find the Block...' value={block}
                        onChange={(e) => setBlock(e.target.value)} ></input>
                    <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon' />
                </div>
                <div className='flex gap-2 items-center'>
                    <CiLocationOn className='text-[25px] icon' />
                    <input type='text' className='bg-transparent text-blue-500 focus:outline-none w-[100%]' placeholder='Find the Village...' value={village}
                        onChange={(e) => setVillage(e.target.value)}></input>
                    <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon' />
                </div>

                <button className='bg-blueColor h-full p-5 px-10 rounded-[10px] text-white cursor-pointer hover:bg-blue-300' onClick={fetchWaterLevel}>Fetch</button>
                {waterLevel && <h2>Water Level: {waterLevel} mbgl</h2>}

            </div>
        </div>

    );
};

export default WaterLevelChecker;
