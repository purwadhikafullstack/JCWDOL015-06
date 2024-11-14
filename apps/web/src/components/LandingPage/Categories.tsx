'use client'

import { Skeleton } from '@nextui-org/react';
import { RiDrinks2Line } from 'react-icons/ri';
import { PiPopcorn, PiPillLight } from 'react-icons/pi';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { getCategoriesList } from '@/lib/category';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// interface ICategoriesProps {
//   categories: any[] | null;
// }

//const Categories: React.FC<ICategoriesProps> = ({ categories }) => {
const Categories: React.FC = () => {
  const [categories, setCategoriess] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchingCategories = async () => {
      console.log('HOME GETTING PRODUCTS');

      const { result } = await getCategoriesList();

      if (result.status == 'ok') {
        console.log(result);

        // toast.success('success categories');

        setCategoriess(result.categories);
      } else {
        toast.error(result.msg);
      }
    };

    fetchingCategories();
  }, []);

  const categoryIcons = [
    {
      name: 'Beverage',
      icon: <PiPopcorn color="green" />
    },
    {
      name: 'Snack',
      icon: <PiPopcorn color="green" />
    },
    {
      name: 'Medicine',
      icon: <PiPillLight color="green" />
    }
  ];

  function matchIcons(propsName: string) {
    console.log('\n\n\n');
    console.log('mathcIcons RUNS');

    console.log(propsName);

    // let res;
    // const finding = categoryIcons.find((f) => {
    //   if (f.name === name) {
    //     res = f.icon;
    //   } else {
    //     res = <IoAlertCircleOutline />;
    //   }
    // });

    // return res;

    let res;

    categoryIcons.forEach((c) => {
      if (c.name == propsName) {
        res = c.icon;
      } else {
        res = <IoAlertCircleOutline />;
      }
    });

    return res;
  }

  function displaySkeleton() {
    let indents = [];
    for (let i = 0; i < 8; i++) {
      indents.push(<Skeleton className="flex rounded-lg min-w-24 min-h-24 max-w-24" key={i} />);
    }
    return indents;
  }

  return (
    <div className="w-full h-fit flex flex-col  px-2 py-5 gap-7 bg-white">
      <h1 className="mx-auto text-center text-xl tracking-widest font-bold ">Find What You Need</h1>
      <div className="flex gap-5 mx-auto w-fit max-w-full pb-2 h-fit overflow-x-auto">
        {categories
          ? categories.map((c: any) => (
              <div key={c.name} className="flex flex-col justify-center items-center gap-2">
                <div
                  key={c.id}
                  className="min-h-24 min-w-24 max-w-24 flex justify-center items-center text-center rounded-xl border-4"
                >
                  <h1>{matchIcons(c.name)}</h1>
                </div>
                <h1>{c.name}</h1>
              </div>
            ))
          : // (
            //   <Skeleton className="flex rounded-lg w-full min-h-24" />
            // )
            displaySkeleton()}
      </div>
    </div>
  );
};

export default Categories;
