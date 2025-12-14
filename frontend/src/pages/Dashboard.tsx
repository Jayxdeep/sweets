import { useEffect, useState } from "react";
import api from "../api/api";
import { logout } from "../utils/auth";

type Sweet = {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

const Dashboard = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      setError("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handlePurchase = async (id: string) => {
    try {
      await api.post(`/sweets/${id}/purchase`);
      fetchSweets(); // refresh after purchase
    } catch (err: any) {
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  if (loading) return <p>Loading sweets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Sweet Shop Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <ul>
        {sweets.map((sweet) => (
          <li key={sweet._id} style={{ marginBottom: "12px" }}>
            <strong>{sweet.name}</strong> ({sweet.category}) <br />
            Price: ₹{sweet.price} <br />
            Quantity: {sweet.quantity} <br />
            <button
              onClick={() => handlePurchase(sweet._id)}
              disabled={sweet.quantity === 0}
            >
              {sweet.quantity === 0 ? "Out of stock" : "Purchase"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
