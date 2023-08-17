"use client"
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../components/button/Button';

const Page = () => {
    const [generatedId, setGeneratedId] = useState('');
    const [isIdGenerated, setIsIdGenerated] = useState(false);

    const handleButtonClick = () => {
        const uniqueId = uuidv4();
        setGeneratedId(uniqueId);
        setIsIdGenerated(true);
    };

    return (
        <div className="px-4 md:px-8 lg:px-16 pt-28 pb-14 bg-blue-200">
            <div className="flex flex-col">
                {/* 1st div */}
                <div className="bg-blue-100 h-60 rounded-lg p-4 mb-4 flex items-center">
                    <div className="flex-grow ml-20">
                        <div className="text-3xl font-bold font-sans">
                            Refer Friends
                            <br />
                            Earn Coins
                        </div>
                        <div className="text-lg mt-2">
                            Earn 5 Coins for every client you introduce. Join the program and win exciting prizes.
                        </div>
                        {isIdGenerated ? (
                            null // Button will be hidden when ID is generated
                        ) : (
                            <Button className="py-2 max-w-sm mt-5 px-6 rounded-full bg-black text-white text-lg font-medium mb-3 hover:opacity-75" onClick={handleButtonClick}>
                                Generate Link
                            </Button>
                        )}
                    </div>
                    <div className="flex-shrink-0 pl-5">
                        <Image src="/refer.png" alt="" width={300} height={300} />
                    </div>
                </div>

                {/* 2nd div */}
                <div className={`bg-blue-100 h-20 rounded-lg p-4 mb-4`} >
                    <div className={`${isIdGenerated ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 1s' }}>

                    {isIdGenerated ? (
                        <div className="flex items-center">
                            <p className="text-lg font-semibold ml-20">Generated ID:</p>
                            <div className="bg-white rounded-lg ml-2 p-2">
                                <p className="text-sm">{generatedId}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-lg font-semibold ml-20 mt-2">Please generate your referral ID</p>
                        )}
                        </div>
                </div>

                <div className="flex">
                    {/* 3rd div */}
                    <div className="bg-blue-100 h-40 w-[30%] rounded-lg p-4 mr-4 transition-transform">
                        
                    </div>

                    {/* 4th div */}
                    <div className="bg-blue-100 h-40 w-[70%] rounded-lg p-4 transition-transform"></div>
                </div>
            </div>
        </div>
    )
}

export default Page;

