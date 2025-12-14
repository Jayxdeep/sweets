import { useEffect, useState } from "react";
import api from "../api/api";
import { logout } from "../utils/auth";
import "./Dashboard.css";

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
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [cartCounts, setCartCounts] = useState<Record<string, number>>({});

  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("role") === "ADMIN");
  }, []);

  const fetchSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleAdd = async (id: string) => {
    setCartCounts((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
    await api.post(`/sweets/${id}/purchase`);
    fetchSweets();
  };

  const handleRemove = (id: string) => {
    setCartCounts((p) => {
      const next = { ...p };
      next[id] > 1 ? (next[id] -= 1) : delete next[id];
      return next;
    });
  };

  const handleRestock = async (id: string) => {
    await api.post(`/sweets/${id}/restock`, { quantity: 5 });
    fetchSweets();
  };

  const handleAddSweet = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/sweets", {
      ...newSweet,
      price: Number(newSweet.price),
      quantity: Number(newSweet.quantity),
    });
    setNewSweet({ name: "", category: "", price: "", quantity: "" });
    fetchSweets();
  };


  const categories = ["ALL", ...new Set(sweets.map((s) => s.category))];

  if (loading) return <p className="loading">Loading sweets...</p>;

  const available = sweets.filter((s) => s.quantity > 0);
  const outOfStock = sweets.filter((s) => s.quantity === 0);

  return (
    <div className="app-layout">
      {/* SIDEBAR (Option B) */}
      <aside className="sidebar">
        <h2 className="logo">🍬 Sweet Shop</h2>

        <nav>
          <button className="side-link active">All Sweets</button>
          <button className="side-link">Indian</button>
          <button className="side-link">Offers</button>
        </nav>

        {isAdmin && (
          <>
            <hr />
            <h4 className="sidebar-title">Admin</h4>
            <button className="side-link admin">Inventory</button>
          </>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* HERO (Option C) */}
        <div className="hero">
          <div>
            <h1>Fresh Indian Sweets</h1>
            <p>Handcrafted daily · Quality ingredients · Authentic taste</p>
          </div>
          <button onClick={logout} className="btn-secondary">
            Logout
          </button>
        </div>

        {/* ADMIN PANEL */}
        {isAdmin && (
          <div className="admin-card">
            <h3>🛠 Inventory Management</h3>
            <form onSubmit={handleAddSweet} className="admin-panel">
              <input
                className="input-field"
                placeholder="Sweet Name"
                value={newSweet.name}
                onChange={(e) =>
                  setNewSweet({ ...newSweet, name: e.target.value })
                }
              />
              <input
                className="input-field"
                placeholder="Category"
                value={newSweet.category}
                onChange={(e) =>
                  setNewSweet({ ...newSweet, category: e.target.value })
                }
              />
              <input
                className="input-field"
                type="number"
                placeholder="₹ Price"
                value={newSweet.price}
                onChange={(e) =>
                  setNewSweet({ ...newSweet, price: e.target.value })
                }
              />
              <input
                className="input-field"
                type="number"
                placeholder="Qty"
                value={newSweet.quantity}
                onChange={(e) =>
                  setNewSweet({ ...newSweet, quantity: e.target.value })
                }
              />
              <button className="btn-primary">Add Sweet</button>
            </form>
          </div>
        )}

        {/* FILTERS */}
        <div className="filters-card">
          <input
            className="input-field search-input"
            placeholder="Search sweets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* AVAILABLE */}
        <h2 className="section-title">Available Sweets</h2>
        <div className="sweets-grid">
          {available.map((sweet) => (
            <SweetCard
              key={sweet._id}
              sweet={sweet}
              isAdmin={isAdmin}
              cartCounts={cartCounts}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onRestock={handleRestock}
            />
          ))}
        </div>

        {/* OUT OF STOCK */}
        {outOfStock.length > 0 && (
          <>
            <h2 className="section-title muted">Out of Stock</h2>
            <div className="sweets-grid faded">
              {outOfStock.map((sweet) => (
                <SweetCard
                  key={sweet._id}
                  sweet={sweet}
                  isAdmin={isAdmin}
                  cartCounts={cartCounts}
                  onAdd={handleAdd}
                  onRemove={handleRemove}
                  onRestock={handleRestock}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

/* Extracted Card (clean separation, still same logic) */
const SweetCard = ({
  sweet,
  isAdmin,
  cartCounts,
  onAdd,
  onRemove,
  onRestock,
}: any) => (
  <div className="sweet-card">
    <div className="card-top">
      <div>
        <h3>{sweet.name}</h3>
        <span className="category">{sweet.category}</span>
      </div>
    </div>

    <div className="card-bottom">
      <div>
        <div className="price">₹{sweet.price}</div>
        <span className={`stock ${sweet.quantity > 0 ? "in" : "out"}`}>
          {sweet.quantity > 0 ? `${sweet.quantity} left` : "Out of Stock"}
        </span>
      </div>

      {sweet.quantity > 0 &&
        (!cartCounts[sweet._id] ? (
          <button className="add-btn" onClick={() => onAdd(sweet._id)}>
            ADD
          </button>
        ) : (
          <div className="counter-control">
            <button onClick={() => onRemove(sweet._id)}>−</button>
            <span>{cartCounts[sweet._id]}</span>
            <button onClick={() => onAdd(sweet._id)}>+</button>
          </div>
        ))}

      {isAdmin && (
        <button className="btn-restock" onClick={() => onRestock(sweet._id)}>
          Restock
        </button>
      )}
    </div>
  </div>
);

export default Dashboard;
