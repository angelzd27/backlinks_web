import React, { useEffect, useState } from 'react'
import { BD_ACTION_DELETE, BD_ACTION_GET } from '../../services/request';
import { DataTable } from '../../components/Tables';
import { getJWT } from '../../services/jwt';
import Swal from 'sweetalert2';

const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const [originalContacts, setOriginalContacts] = useState([])
  const [rerender, setRerender] = useState(false);
  const thead = ["id", "url", "emails", "phones", "company_name", "created_at"]
  const [searchText, setSearchText] = useState("")

  const getWebsites = async () => {
    const data = await BD_ACTION_GET("get_contacts", null, getJWT())
    console.log(data)
    setContacts(data.msg)
    setOriginalContacts(data.msg)
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
      )
    })

    setContacts(filteredWebsites)
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
        const data = await BD_ACTION_DELETE('delete_website', id, getJWT())
        console.log(data)
        if (data.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Server error try again!",
          })
        } else {
          Swal.fire({
            title: "Deleted!",
            text: `Website ${id} has been deleted.`,
            icon: "success"
          })
          getUsers()
        }
      }
    })
  }

  useEffect(() => {
    getWebsites()
  }, [rerender])

  return (
    <>
      <section className="mx-5 my-10">
        <div className="flex flex-row justify-center items-center lg:gap-5 md:gap-3 sm:gap-2 gap-1 mb-5">
          <input type="text" className="bg-white rounded-3xl px-4 py-2.5 mt-1 w-full text-base shadow-md border border-gray-400 focus:outline-none focus:border-bug-500 duration-200" placeholder="Search" onChange={(e) => {
            setSearchText(e.target.value)
            if (e.target.value === "") {
              setContacts(originalContacts);
            } else {
              filterWebsites();
            }
          }} />
        </div>
        <div className="w-[1600px] mt-10">
          <DataTable thead={thead} tbody={contacts} _delete={_delete} updateTable={updateTable} text="Update Website" />
        </div>
      </section>
    </>
  )
}

export default Contacts