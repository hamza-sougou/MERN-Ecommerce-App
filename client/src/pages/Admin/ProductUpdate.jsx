import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";

const ProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);
  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
      setCategory(productData.category?._id || "");
      setQuantity(productData.quantity || "");
      setBrand(productData.brand || "");
      setImage(productData.image || "");
      setStock(productData.countInStock || "");
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Élément téléversé avec succès");
      setImage(res.image);
    } catch (error) {
      toast.error("Échec du téléversement");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Produit mis à jour avec succès");
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Échec de la mise à jour du produit. Veuillez réessayer.");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Êtes-vous sûr de vouloir supprimer ce produit ?"
      );

      if (!answer) return;

      const { data } = await deleteProduct(params._id);

      toast.success(`${data.name} a été supprimé`);
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Échec de la suppression. Veuillez réessayer.");
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Créer un Produit</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
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

            <div>
              <button
                onClick={handleSubmit}
                className="py-2 px-10 mt-5 rounded text-lg font-semibold bg-green-500 mr-6 text-white"
              >
                Mettre à jour
              </button>
              <button
                onClick={handleDelete}
                className="py-2 px-10 mt-5 rounded text-lg font-semibold bg-orange-500 text-white"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
