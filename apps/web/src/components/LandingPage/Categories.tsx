import { Skeleton } from '@nextui-org/react';

interface ICategoriesProps {
  categories: any[] | null;
}

const Categories: React.FC<ICategoriesProps> = ({ categories }) => {
  function displaySkeleton() {
    let indents = [];
    for (let i = 0; i < 4; i++) {
      indents.push(
        <Skeleton className="rounded-lg h-full min-w-24 max-w-24 border-4 bg-default-300" key={i} />
      );
    }
    return indents;
  }

  return (
    <div className="w-full border-2 border-red-600 flex overflow-x-auto justify-center items-center h-28 p-3 gap-7 bg-white">
      {categories
        ? categories.map((c: any) => (
            <div key={c.id} className="h-full min-w-24 border-4">
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
