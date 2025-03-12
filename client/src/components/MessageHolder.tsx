import React from 'react';
import { Message } from '../common/types';
import { useEffect, useState } from "react";
import { decodeJWT } from "../utils/decodeJWT";



const MessageHolder = ({ message }: { message: Message }) => {
  const { senderId, recipientId, message: text, timestamp } = message;
    const [loggedInUserID, setLoggedInUserId] = useState<number>(0);
  
    useEffect(() => {
      const id = decodeJWT()?.userId;
      setLoggedInUserId(id || 0);
    }, []);

  return (
    <>
     {senderId === loggedInUserID && (
       <div className="flex justify-end mb-4 cursor-pointer">
         <div className="flex flex-col bg-indigo-500 text-white rounded-lg p-2 gap-1">
           <p className="text-left text-lg">{message.message}</p>
           <p className="flex text-xs justify-end"> {timestamp ? new Date(timestamp).toLocaleTimeString() : 'Unknown time'}</p>
         </div>
         <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
           <img
             src={"https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"}
             alt="Sender's Avatar"
             className="w-8 h-8 rounded-full"
           />
         </div>
         </div>
        )}
     {senderId !== loggedInUserID && (
       <div className="flex justify-start mb-4 cursor-pointer">
         <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
           <img
             src={"https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"}
             alt="Sender's Avatar"
             className="w-8 h-8 rounded-full"
           />
         </div>
         <div className="flex flex-col bg-indigo-500 text-white rounded-lg p-2 gap-1">
           <p className="text-left text-lg">{message.message}</p>
           <p className="flex text-xs justify-end">{timestamp ? new Date(timestamp).toLocaleTimeString() : 'Unknown time'}</p>
         </div>
         </div>
        )}
     
     </>
     )
    };

export default MessageHolder;