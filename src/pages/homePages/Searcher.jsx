import React, { useState } from 'react';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { BD_ACTION_POST } from '../../services/request';
import { getJWT } from '../../services/jwt';

const Searcher = () => {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState(null);
  const [makeComments, setMakeComments] = useState(false);
  const [makeContacts, setMakeContacts] = useState(false);

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      if (makeComments) {
        const body = {
          keyword,
          number_of_pages: 40,
          author: "Okip",
          email: "comunicacion@okip.com.mx",
          url: "https://okip.com.mx",
          comment: "Hola, me gustaría saber mas informacion.",
        }
        setData(await BD_ACTION_POST("create_comment", body, getJWT()))
        console.log(data);
      } else if (makeContacts) {
        const body = {
          keyword,
          number_of_pages: 10,
        }
        setData(await BD_ACTION_POST("search_contact", body, getJWT()))
        console.log(data);
      } else {
        alert("Please select an option to search");
      }
    }
  };

  const SwitchToggle = ({ text, variable, setVariable, setOtherVariable }) => {
    return (
      <label className="flex items-center relative w-max cursor-pointer select-none">
        <span className="text-lg mr-3">{text}</span>
        <input
          type="checkbox"
          className={`appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none ${variable ? 'bg-green-500' : 'bg-red-500'}`}
          checked={variable}
          onChange={() => {
            setVariable(!variable);
            if (!variable) {
              setOtherVariable(false);
            }
          }}
        />
        <span className="absolute font-medium text-xs uppercase right-1 text-white"> OFF </span>
        <span className="absolute font-medium text-xs uppercase right-8 text-white"> ON </span>
        <span
          className={`w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200 ${variable ? 'translate-x-7' : ''}`}
        />
      </label>
    );
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen -mt-16'>
      <h2 className='text-8xl font-extrabold'>Welcome</h2>
      <div className="relative text-xl mt-24">
        <input
          type="text"
          className="pl-16 pr-4 py-5 w-[1050px] border-solid border rounded-full"
          placeholder="Seach with a keyword"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
          <HiMiniMagnifyingGlass className='text-2xl text-black' />
        </div>
      </div>
      <div className='flex justify-start w-full px-80 mt-8 gap-10'>
        <SwitchToggle
          text='Generador de Backlinks'
          variable={makeComments}
          setVariable={setMakeComments}
          setOtherVariable={setMakeContacts}
        />
        <SwitchToggle
          text='Buscador de correos'
          variable={makeContacts}
          setVariable={setMakeContacts}
          setOtherVariable={setMakeComments}
        />
      </div>
    </div>
  );
}

export default Searcher;
