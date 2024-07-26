import React, { useEffect, useState } from 'react'
import { BD_ACTION_DELETE, BD_ACTION_GET, BD_ACTION_POST } from '../../services/request';
import { DataTable } from '../../components/Tables';
import { decodedJWT, getJWT } from '../../services/jwt';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [originalContacts, setOriginalContacts] = useState([]);
  const [rerender, setRerender] = useState(false);
  const thead = ["id", "url", "emails", "phones", "company_name", "created_at"];
  const [searchText, setSearchText] = useState("");
  const [emails, setEmails] = useState([])
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

  const getContacts = async () => {
    const data = await BD_ACTION_GET("get_contacts", null, getJWT());
    setContacts(data.msg);
    setOriginalContacts(data.msg);
  }

  const updateTable = () => {
    setRerender(prev => !prev);
  }

  const filterWebsites = () => {
    const filteredWebsites = originalContacts.filter((website) => {
      const searchableFields = [
        "id",
        "url",
        "status",
      ];
      return searchableFields.some((field) =>
        typeof website[field] === "string" &&
        website[field].toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setContacts(filteredWebsites);
  }

  const _delete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1F9C19",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await BD_ACTION_DELETE("delete_contact", id, getJWT());
        console.log(data);
        if (data.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Server error try again!",
          });
        } else {
          Swal.fire({
            title: "Deleted!",
            text: `Contact with the id ${id} deleted`,
            icon: "success"
          });
          getContacts();
        }
      }
    });
  }

  const _deleteAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1F9C19",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await BD_ACTION_DELETE('delete_contacts', null, getJWT());
        console.log(data);
        if (data.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Server error try again!",
          });
        } else {
          Swal.fire({
            title: "Deleted!",
            text: `All contacts deleted`,
            icon: "success"
          });
          getContacts();
        }
      }
    });
  }

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(contacts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");
    XLSX.writeFile(wb, "contacts.xlsx");
  }

  const sendEmails = async () => {
    const body = {
      subject: formConfig.subject,
      message: formConfig.message,
      credentials: emails
    }
    console.log(body);
    const data = await BD_ACTION_POST('send_email', body)
    console.log(data);
  }

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
    setEmails(JSON.parse(data.msg[0].related_emails))
  }

  useEffect(() => {
    getContacts();
    getConfig();
  }, [rerender]);

  return (
    <>
      <section className="mx-5 my-10">
        <div className="flex flex-row justify-center items-center lg:gap-5 md:gap-3 sm:gap-2 gap-1 mb-5">
          <input type="text" className="bg-white rounded-3xl px-4 py-2.5 mt-1 w-full text-base shadow-md border border-gray-400 focus:outline-none focus:border-bug-500 duration-200" placeholder="Search" onChange={(e) => {
            setSearchText(e.target.value);
            if (e.target.value === "") {
              setContacts(originalContacts);
            } else {
              filterWebsites();
            }
          }} />
          <button className='px-10 py-3 text-lg rounded-3xl font-bold text-white w-52 bg-blue-600' onClick={exportToExcel}>Export data</button>
        </div>
        <div className="w-[1600px] mt-10">
          <DataTable thead={thead} tbody={contacts} _delete={_delete} updateTable={updateTable} text="Update Website" />
        </div>

        <div className='flex gap-5'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white px-10 py-2 font-bold rounded-3xl' onClick={sendEmails}>Send emails to contacts</button>
          <button className='bg-red-500 hover:bg-red-700 text-white px-10 py-2 font-bold rounded-3xl' onClick={_deleteAll}>Delete contacts</button>
        </div>
      </section>
    </>
  );
}

export default Contacts;
