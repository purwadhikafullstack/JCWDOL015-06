// export async function rajaongkirShippingCost(
//   origin: number,
//   destination: number,
// ) {
//   try {
//     const res = await fetch('https://api.rajaongkir.com/starter/cost', {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//         key: 'd9928fd6b7d8d80a8d24be2156994f15',
//       },
//       body: JSON.stringify({
//         origin,
//         destination,
//         weight: 1000,
//         courier: 'jne',
//       }),
//     });

//     const cost = await fetch('https://api.rajaongkir.com/starter/cost', {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json',
//           key: 'd9928fd6b7d8d80a8d24be2156994f15',
//         },
//         body: JSON.stringify({
//           origin,
//           destination,
//           weight: 1000,
//           courier: 'jne',
//         }),
//       });

//     const json: any = res.json();
//     return json;
//   } catch (error) {
//     return {
//       rajaongkir: {
//         status: '400',
//       },
//     };
//   }
// }

export async function rajaongkirShippingCost(
  origin: number,
  destination: number,
) {
  const cost = await fetch('https://api.rajaongkir.com/starter/cost', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      key: 'd9928fd6b7d8d80a8d24be2156994f15',
    },
    body: JSON.stringify({
      origin,
      destination,
      weight: 1000,
      courier: 'jne',
    }),
  });

  const res = await cost.json();

  if (
    res.rajaongkir.status.description == 'OK' ||
    res.rajaongkir.status.description != undefined
  ) {
    return res.rajaongkir;
  } else {
    return res.rajaongkir.status;
  }
}
