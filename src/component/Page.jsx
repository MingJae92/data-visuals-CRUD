import React, { useEffect, useState } from "react";
import axios from "axios";

function Page() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dataUrl = "https://fakestoreapi.com/products";

  useEffect(() => {
    const getTableData = async () => {
      try {
        const response = await axios.get(dataUrl);

        if (response.status === 200) {
          console.log("Data is fetched");
          console.log("API Response:", response.data);
          setTableData(response.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    getTableData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Data Visualization</h1>
      <ul>
        {tableData.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>Category: {item.category}</p>
            <p>Description: {item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Rating: {item.rating?.rate} (Count: {item.rating?.count})</p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Page;
