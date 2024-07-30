import { useEffect, useState } from "react";
import { getUserList } from "@/api";

export default function UserList () {

  const [list, setList] = useState([])
  const userList = async () => {
    const data = await getUserList()
    console.log(data, "data");
    setList(data.list)
    
  }

  useEffect(() => {
    userList()
  }, [])
  return <div className="mb-5 mt-5 p-5">
    <table className="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">头像</th>
      <th scope="col">nickname</th>
      <th scope="col">birthday</th>
      {/* <th scope="col">Handle</th> */}
    </tr>
  </thead>
  <tbody>
    {
      list?.map((i: any)=> {
        return (
          <tr key={i.id}>
          <td>{i.id}</td>
          <td>
            <img src={i.avatar} className="rounded-circle w-25 h-25" alt="" />
          </td>
          <td>{i.nickname}</td>
          <td>{i.birthday}</td>
        </tr>
        )
      })
    }

  </tbody>
</table>
  </div>;
}