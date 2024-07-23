import React, { useEffect, useState } from 'react'
import { BD_ACTION_DELETE, BD_ACTION_GET } from '../../services/request';
import { DataTable } from '../../components/Tables';
import { getJWT } from '../../services/jwt';
import Swal from 'sweetalert2';

const Users = () => {
  const [users, setUsers] = useState([])
  const [originalUsers, setOriginalUsers] = useState([])
  const [rerender, setRerender] = useState(false);
  const thead = ["id", "name", "last_name", "email"]
  const [searchText, setSearchText] = useState("")

  const getUsers = async () => {
    const data = await BD_ACTION_GET("get_users", null, getJWT())
    console.log(data)
    setUsers(data.msg)
    setOriginalUsers(data.msg)
  }

  const updateTable = () => {
    setRerender(prev => !prev);
  }

  const filterUsers = () => {
    const filteredUsers = originalUsers.filter((user) => {
      const searchableFields = [
        "id",
        "name",
        "last_name",
        "email",
      ];
      return searchableFields.some((field) =>
        typeof user[field] === "string" &&
        user[field].toLowerCase().includes(searchText.toLowerCase())
      )
    })

    setUsers(filteredUsers)
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
        const data = await BD_ACTION_DELETE('delete_user', id, getJWT())
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
            text: `User ${id} has been deleted.`,
            icon: "success"
          })
          getUsers()
        }
      }
    })
  }

  useEffect(() => {
    getUsers()
  }, [rerender])

  return (
    <>
      <section className="mx-5 my-10">
        <div className="flex flex-row justify-center items-center lg:gap-5 md:gap-3 sm:gap-2 gap-1 mb-5">
          <input type="text" className="bg-white rounded-3xl px-4 py-2.5 mt-1 w-full text-base shadow-md border border-gray-400 focus:outline-none focus:border-bug-500 duration-200" placeholder="Search" onChange={(e) => {
            setSearchText(e.target.value)
            if (e.target.value === "") {
              setUsers(originalUsers);
            } else {
              filterUsers();
            }
          }} />
          {/* <CreateModal text="New User" updateTable={updateTable} /> */}
        </div>
        <div className="w-full overflow-x-scroll mt-10">
          <DataTable thead={thead} tbody={users} _delete={_delete} updateTable={updateTable} text="Update User" />
        </div>
      </section>
    </>
  )
}

export default Users