export const getProductList = async () => {
  console.log('GETPRODUCT ACTION');

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}product`, {
    method: 'GET'
  });

  const result = await res.json();

  return { result };
};

