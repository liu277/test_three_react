import React, { useEffect, useState } from "react";
import { getShopList, addShop, editShop } from "@/api";

interface Shop {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

export default function ShopList() {
  const [list, setList] = useState<Shop[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [newShop, setNewShop] = useState<Partial<Shop>>({
    name: "",
    category: "",
    price: 0,
    image: ""
  });
  const [formData, setFormData] = useState({
    name: "",
    page: 1,
    page_size: 10,
    total: 0
})

  const fetchShops = async () => {
    const data = await getShopList(formData);
    setList(data.list);
    setFormData({
      ...formData,
      total: data.total,
    })
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddShop = async () => {
    await addShop(newShop);
    fetchShops();
    setNewShop({ name: "", category: "", price: 0, image: "" });
  };

  const handleEditShop = async (id: number, updatedShop: Partial<Shop>) => {
    await editShop(id, updatedShop);
    fetchShops();
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const filteredList = list.filter((shop) =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mb-5 mt-5 p-5">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newShop.name}
          onChange={(e) => setNewShop({ ...newShop, name: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={newShop.category}
          onChange={(e) => setNewShop({ ...newShop, category: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newShop.price}
          onChange={(e) => setNewShop({ ...newShop, price: parseFloat(e.target.value) })}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newShop.image}
          onChange={(e) => setNewShop({ ...newShop, image: e.target.value })}
          className="form-control mb-2"
        />
        <button onClick={handleAddShop} className="btn btn-primary">Add Shop</button>
      </div>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((shop) => (
            <tr key={shop.id}>
              <td>{shop.id}</td>
              <td>
                <img src={shop.image} className="rounded-circle w-25 h-25" alt="" />
              </td>
              <td>{shop.name}</td>
              <td>{shop.category}</td>
              <td>{shop.price}</td>
              <td>
                <button onClick={() => handleEditShop(shop.id, shop)} className="btn btn-warning">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!list.length && (<p className="text-center">No shops found</p>)}
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => handlePageChange(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
