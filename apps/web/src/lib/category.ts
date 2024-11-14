
export const getCategoriesList = async () => {
    console.log('GETPCATEGORY ACTION');
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}category`, {
      method: 'GET'
    });
  
    const result = await res.json();
  
    return { result };
  };
  