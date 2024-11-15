const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Soumettre",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="py-3 px-4 rounded w-full border border-orange-400 focus:border-none focus:ring focus:ring-orange-500 transition-all"
          placeholder="Nom de la nouvelle catégorie"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded 
          hover:bg-orange-700 focus:outline-none focus:ring-2 
          focus:ring-orange-500 focus:ring-opacity-50 transition-all"
          >
            {buttonText}
          </button>
          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded
                 hover:bg-red-700 focus:outline-none focus:ring-2
                  focus:ring-red-500 focus:ring-opcity-50"
            >
              Supprimer
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
