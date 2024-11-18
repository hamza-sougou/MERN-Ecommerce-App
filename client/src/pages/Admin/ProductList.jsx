import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";

import AdminMenu from "./AdminMenu.jsx";

import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Échec de la création du produit. Veuillez réessayer.");
      } else {
        toast.success(`${data.name} a été créé.`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Échec de la création du produit. Veuillez réessayer.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="w-full px-[1rem] md:px-[10rem]">
      <div className="flex flex-col w-full md:flex-row">
        <AdminMenu />
        <div className="flex flex-col w-full">
          <div className="h-12">Créer un Produit</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3 p-3">
            <label className="border px-4 block w-full text-center rounded cursor-pointer font-bold py-11 border-orange-400 focus:border-none focus:ring focus:ring-orange-500 transition-all">
              {image ? image.name : "Téléverser un image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : ""}
              />
            </label>
          </div>
          <div className="p-3 flex flex-col w-full">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 w-full ">
                <label htmlFor="name">Nom</label>
                <br />
                <input
                  type="text"
                  name="name"
                  className="p-4 mb-3 w-full border rounded border-orange-400 focus:border-none focus:ring focus:ring-orange-500 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex-1 w-full ">
                <label htmlFor="price">Prix</label>
                <br />
                <input
                  type="number"
                  name="price"
                  className=" p-4 mb-3 w-full border rounded border-orange-400 focus:border-none focus:ring focus:ring-orange-500 transition-all"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full gap-4">
              <div className="flex-1 w-full">
                <label htmlFor="quantity">Quantité</label>
                <br />
                <input
                  type="number"
                  name="quantity"
                  className="p-4 mb-3 border rounded w-full border-orange-400 focus:border-none focus:ring focus:ring-orange-500 transition-all"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="flex-1 w-full">
                <label htmlFor="brand">Marque</label>
                <br />
                <input
                  type="text"
                  name="brand"
                  className=" p-4 mb-3 border rounded w-full border-orange-400 focus:border-none focus:ring focus:ring-orange-500 transition-all"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full">
              <div className="flex-1">
                <label htmlFor="desc">Description</label>
                <textarea
                  type="text"
                  name="desc"
                  className="p-2 mb-3 border rounded w-full border-orange-400 focus:border-none focus:ring focus:ring-orange-500 transition-all"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full gap-4">
              <div className="flex-1 w-full">
                <label htmlFor="stock">Quantité en Stock</label>
                <br />
                <input
                  type="text"
                  name="stock"
                  className="p-4 mb-3 w-full border rounded border-orange-400 focus:border-none focus:ring focus:ring-orange-500 transition-all"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="flex-1 w-full">
                <label htmlFor="">Catégorie</label>
                <br />
                <select
                  placeholder="Choisir une catégorie"
                  className="p-4 mb-3 w-full border rounded border-orange-400 focus:border-none focus:ring focus:ring-orange-500 transition-all"
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choisir une catégorie
                  </option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded text-lg font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-all"
            >
              Soumettre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
