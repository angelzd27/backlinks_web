import React, { useEffect, useState } from 'react';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { BD_ACTION_GET, BD_ACTION_POST } from '../../services/request';
import { getJWT } from '../../services/jwt';
import { decodedJWT } from '../../services/jwt';
import Loader from '../../components/Loader';
import Swal from 'sweetalert2';

const Searcher = () => {
  const [keyword, setKeyword] = useState("");
  const [makeComments, setMakeComments] = useState(false);
  const [makeContacts, setMakeContacts] = useState(false);
  const [load, setLoad] = useState(false)
  const jwt = decodedJWT()
  const user = jwt.user_id

  const [formConfig, setFormConfig] = useState({
    id: "",
    pages_number: "",
    contact_number: "",
    author: "",
    config_email: "",
    url: "",
    comment: "",
    subject: "",
    message: "",
    related_emails: ""
  })

  const getConfig = async () => {
    const data = await BD_ACTION_GET(`get_config/${user.id_profile}`, null, getJWT())

    const updatedForm = {
      ...formConfig,
      id: data.msg[0].id,
      pages_number: data.msg[0].pages_number,
      contact_number: data.msg[0].contact_number,
      author: data.msg[0].author,
      config_email: data.msg[0].config_email,
      url: data.msg[0].url,
      comment: data.msg[0].comment,
      subject: data.msg[0].subject,
      message: data.msg[0].message,
      related_emails: data.msg[0].related_emails
    }
    setFormConfig(updatedForm)
  }

  useEffect(() => {
    getConfig()
  }, [])

  const handleKeyDown = async (e) => {
    
    if (e.key === 'Enter') {
      setLoad(true)
      if (makeComments) {
        const body = {
          keyword,
          number_of_pages: formConfig.pages_number,
          author: formConfig.author,
          email: formConfig.config_email,
          url: formConfig.url,
          comment: formConfig.comment,
        }
        const data = await BD_ACTION_POST("create_comment", body, getJWT())
        console.log(data);
        setLoad(false)
        Swal.fire(
          "Commented!",
          'Contacts have been commented on the pages!',
          'success'
      )
      } else if (makeContacts) {
        const body = {
          keyword,
          number_of_pages: formConfig.contact_number,
        }
        const data = await BD_ACTION_POST("search_contact", body, getJWT())
        console.log(data);
        setLoad(false)
        Swal.fire(
          "Completed!",
          'The new contacts have been added to the database!',
          'success'
      )
      } else {
        alert("Please select an option to search");
        setLoad(false)
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
    <>
    <Loader load={load} /> 
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
    </>
  );
}

export default Searcher;
