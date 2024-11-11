interface ICategoriesProps {
  categories: any[] | null;
}

const Categories: React.FC<ICategoriesProps> = ({ categories }) => {
  function displaySkeleton() {
    let indents = [];
    for (let i = 0; i < 8; i++) {
      indents.push(
        <div className="skeleton h-full w-24 border-4" key={i}></div>
      );
    }
    return indents;
  }

  return (
    <div className="w-full border-2 border-red-600 flex flex-wrap justify-center items-center h-28 p-3 gap-7">
      {categories
        ? categories.map((c: any) => (
            <div key={c.id} className="h-full w-24 border-4">
              <h1>{c.categoryName}</h1>
            </div>
          ))
        : displaySkeleton()}
      {/* <div className="h-full w-24 border-4">
                Category
            </div> */}
    </div>
  );
};

export default Categories;
