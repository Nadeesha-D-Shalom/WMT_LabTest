import { useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm.jsx";
import { createItem } from "../api/itemApi.js";

function AddItemPage() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {

      if (!formData.supplierName) {
        alert("Supplier Name is required");
        return;
      }

      await createItem(formData);


      navigate("/");
    } catch (error) {
      console.error("Failed to create item", error);
      alert(error.response?.data?.message || "Failed to create item");
    }
  };

  return (
    <div className="container">
      <h2>Add New Item</h2>

      <ItemForm
        submitText="Add Item"
        onSubmit={handleCreate}
        initialValues={{
          name: "",
          category: "",
          price: "",
          supplierName: "",   // Added supplierName to initialValues
          description: "",
          imageUrl: "",
        }}
      />
    </div>
  );
}

export default AddItemPage;