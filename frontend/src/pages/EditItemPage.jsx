import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "../components/ItemForm.jsx";
import { getItemById, updateItem } from "../api/itemApi.js";

function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await getItemById(id);

        // Ensure all fields exist (important for controlled form)
        setItem({
          name: data.name || "",
          category: data.category || "",
          price: data.price || "",
          supplierName: data.supplierName || "",  
          description: data.description || "",
          imageUrl: data.imageUrl || "",
        });
      } catch (error) {
        console.error("Failed to fetch item", error);
        alert("Failed to load item");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      if (!formData.supplierName) {
        alert("Supplier Name is required");
        return;
      }

      await updateItem(id, formData);
      navigate("/");
    } catch (error) {
      console.error("Failed to update item", error);
      alert(error.response?.data?.message || "Failed to update item");
    }
  };

  if (loading) return <p>Loading item details...</p>;

  return (
    <div className="container">
      <h2>Edit Item</h2>

      <ItemForm
        initialValues={item}
        submitText="Update Item"
        onSubmit={handleUpdate}
      />
    </div>
  );
}

export default EditItemPage;
