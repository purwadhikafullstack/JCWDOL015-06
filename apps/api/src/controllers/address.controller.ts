import { rajaonkir } from '@/helpers/rajaonkir';
import { Request, Response } from 'express';
import prisma from '@/prisma';
export class AddressController {
  async getAddressHelpers(req: Request, res: Response) {
    try {
      const { results } = rajaonkir;

      res.status(200).send({
        status: 'ok',
        results,
      });
    } catch (error: any) {
      if (error.message) {
        res.status(400).send({
          status: 'error address helper',
          msg: error.message,
        });
      } else {
        res.status(400).send({
          status: 'error address helper',
          msg: error,
        });
      }
    }
  }

  async getProvinces(req: Request, res: Response) {
    try {
      // const provinces = rajaonkir.results.map(({ province_id, province }) => ({
      //   province_id,
      //   province,
      // }));

      // Create a Set to store unique provinces
      const uniqueProvinces = new Map<
        string,
        { province_id: string; province: string }
      >();

      // Iterate through the rajaonkir.results array
      rajaonkir.results.forEach(({ province_id, province }) => {
        if (!uniqueProvinces.has(province_id)) {
          uniqueProvinces.set(province_id, { province_id, province });
        }
      });

      // Convert the Map values back to an array
      const provinces = Array.from(uniqueProvinces.values());

      res.status(200).send({
        status: 'ok',
        msg: 'Provinces Fetched Successfully',
        provinces,
      });
    } catch (error: any) {
      if (error.message) {
        res.status(400).send({
          status: 'error provinces',
          msg: error.message,
        });
      } else {
        res.status(400).send({
          status: 'error provinces',
          msg: error,
        });
      }
    }
  }

  async getCities(req: Request, res: Response) {
    try {
      const cities = rajaonkir.results.map(
        ({ city_id, city_name, province_id }) => ({
          city_id,
          city_name,
          province_id,
        }),
      );

      res.status(200).send({
        status: 'ok',
        msg: 'Cities Fetched Successfully',
        cities,
      });
    } catch (error: any) {
      if (error.message) {
        res.status(400).send({
          status: 'error cities',
          msg: error.message,
        });
      } else {
        res.status(400).send({
          status: 'error cities',
          msg: error,
        });
      }
    }
  }

  async getCitiesByProvince(req: Request, res: Response) {
    try {
      const province = req.params.province;
      console.log('\n\nCONTROLLER ADDRESS\n\n');
      console.log(province);

      const cities = rajaonkir.results
        .filter(({ province_id }) => province_id === province) // Filter out only cities matching the province_id
        .map(({ city_id, city_name, province_id, postal_code }) => ({
          city_id,
          city_name,
          province_id,
          postal_code,
        })); // Map to the desired structure

      res.status(200).send({
        status: 'ok',
        msg: 'Cities Fetched Successfully',
        cities,
      });
    } catch (error: any) {
      if (error.message) {
        res.status(400).send({
          status: 'error cities by province',
          msg: error.message,
        });
      } else {
        res.status(400).send({
          status: 'error cities by province',
          msg: error,
        });
      }
    }
  }

  async getUserAddress(req: Request, res: Response) {
    try {
      const province = req.params.province;

      let existingUser = await prisma.address.findMany({
        where: {
          type: 'USER',
          typeId: req.user.id,
        },
        select: {
          id: true,
          desc: true,
          cityId: true,
          provinceId: true,
          isMain: true,
        },
      });

      if (!existingUser) throw 'Account Not Found';

      // Logic Here
      // Add `city_name` and `province` to each `existingUser` entry
      existingUser = existingUser.map((user) => {
        const cityData = rajaonkir.results.find(
          (city) => city.city_id === user.cityId.toString(),
        );
        return {
          ...user,
          city_name: cityData?.city_name || null,
          province: cityData?.province || null,
        };
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Address Fetched Successfully!',
        account: existingUser,
      });
    } catch (error: any) {
      if (error.message) {
        res.status(400).send({
          status: 'error user address',
          msg: error.message,
        });
      } else {
        res.status(400).send({
          status: 'error user address',
          msg: error,
        });
      }
    }
  }

  async getAdminAddress(req: Request, res: Response) {
    try {
      const province = req.params.province;

      const fetchStoreId = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        select: {
          storeId: true,
        },
      });

      if (!fetchStoreId) throw 'Account Not Found';

      const typeIdd = `${fetchStoreId.storeId}`;

      let existingUser = await prisma.address.findMany({
        where: {
          type: 'STORE',
          typeId: parseInt(typeIdd),
        },
        select: {
          id: true,
          desc: true,
          cityId: true,
          provinceId: true,
          isMain: true,
        },
      });

      if (!existingUser) throw 'Account Not Found';

      // Logic Here
      // Add `city_name` and `province` to each `existingUser` entry
      existingUser = existingUser.map((user) => {
        const cityData = rajaonkir.results.find(
          (city) => city.city_id === user.cityId.toString(),
        );
        return {
          ...user,
          city_name: cityData?.city_name || null,
          province: cityData?.province || null,
        };
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Address Fetched Successfully!',
        account: existingUser,
      });
    } catch (error: any) {
      if (error.message) {
        res.status(400).send({
          status: 'error user address',
          msg: error.message,
        });
      } else {
        res.status(400).send({
          status: 'error user address',
          msg: error,
        });
      }
    }
  }

  async createAddress(req: Request, res: Response) {
    try {
      const { provinceId, cityId, desc } = req.body;

      console.log('\n\n\nSERVER CREATE ADDRESS');
      console.log(req.body);

      await prisma.address.create({
        data: {
          type: 'USER',
          typeId: req.user.id,
          provinceId: provinceId,
          cityId: cityId,
          desc: desc,
          coor_lat: '123',
          coor_lng: '321',
        },
      });

      res.status(201).send({
        status: 'ok',
        msg: 'Address Created Successfully',
      });
    } catch (error: any) {
      if (error.message) {
        res.status(400).send({
          status: 'error update user address',
          msg: error.message,
        });
      } else {
        res.status(400).send({
          status: 'error update user address',
          msg: error,
        });
      }
    }
  }

  async createAddressAdmin(req: Request, res: Response) {
    try {
      const { provinceId, cityId, desc } = req.body;

      console.log('\n\n\nSERVER CREATE ADDRESS');
      console.log(req.body);

      const fetchStoreId = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        select: {
          storeId: true,
        },
      });

      if (!fetchStoreId) throw 'Account Not Found';

      const typeIdd = `${fetchStoreId.storeId}`;

      await prisma.address.create({
        data: {
          type: 'STORE',
          typeId: parseInt(typeIdd),
          provinceId: provinceId,
          cityId: cityId,
          desc: desc,
          coor_lat: '123',
          coor_lng: '321',
        },
      });

      res.status(201).send({
        status: 'ok',
        msg: 'Address Created Successfully',
      });
    } catch (error: any) {
      if (error.message) {
        res.status(400).send({
          status: 'error update user address',
          msg: error.message,
        });
      } else {
        res.status(400).send({
          status: 'error update user address',
          msg: error,
        });
      }
    }
  }

  async setMainAddress(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const findAddress: any = await prisma.address.findMany({
        where: {
          type: 'USER',
          typeId: req.user.id,
          isMain: 1,
        },
        select: {
          id: true,
        },
      });

      if (!findAddress || findAddress.length === 0) {
        const findOne: any = await prisma.address.findFirst({
          where: {
            type: 'USER',
            typeId: req.user.id,
            isMain: 0,
          },
          select: {
            id: true,
          },
        });

        await prisma.address.update({
          where: {
            id: findOne.id,
          },
          data: {
            isMain: 1, // Set the new main address
          },
        }),
          res.status(201).send({
            status: 'ok',
            msg: 'Main Address Changed!',
          });
      } else {
        const mainAddressId = findAddress[0].id;

        // Use transaction to ensure atomicity
        await prisma.$transaction([
          prisma.address.update({
            where: {
              id: mainAddressId,
            },
            data: {
              isMain: 0, // Unset the current main address
            },
          }),
          prisma.address.update({
            where: {
              id: id,
            },
            data: {
              isMain: 1, // Set the new main address
            },
          }),
        ]);

        res.status(201).send({
          status: 'ok',
          msg: 'Main Address Changed!',
        });
      }
    } catch (error: any) {
      if (error.message) {
        res.status(400).send({
          status: 'error main address',
          msg: error.message,
        });
      } else {
        res.status(400).send({
          status: 'error main address',
          msg: error,
        });
      }
    }
  }

  async setMainAddressAdmin(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const fetchStoreId = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        select: {
          storeId: true,
        },
      });

      if (!fetchStoreId) throw 'Account Not Found';

      const typeIdd = `${fetchStoreId.storeId}`;

      const findAddress: any = await prisma.address.findMany({
        where: {
          type: 'STORE',
          typeId: parseInt(typeIdd),
          isMain: 1,
        },
        select: {
          id: true,
        },
      });

      if (!findAddress || findAddress.length === 0) {
        const findOne: any = await prisma.address.findFirst({
          where: {
            type: 'STORE',
            typeId: parseInt(typeIdd),
            isMain: 0,
          },
          select: {
            id: true,
          },
        });

        await prisma.address.update({
          where: {
            id: findOne.id,
          },
          data: {
            isMain: 1, // Set the new main address
          },
        }),
          res.status(201).send({
            status: 'ok',
            msg: 'Main Address Changed!',
          });
      } else {
        const mainAddressId = findAddress[0].id;

        // Use transaction to ensure atomicity
        await prisma.$transaction([
          prisma.address.update({
            where: {
              id: mainAddressId,
            },
            data: {
              isMain: 0, // Unset the current main address
            },
          }),
          prisma.address.update({
            where: {
              id: id,
            },
            data: {
              isMain: 1, // Set the new main address
            },
          }),
        ]);

        res.status(201).send({
          status: 'ok',
          msg: 'Main Address Changed!',
        });
      }
    } catch (error: any) {
      if (error.message) {
        res.status(400).send({
          status: 'error main address',
          msg: error.message,
        });
      } else {
        res.status(400).send({
          status: 'error main address',
          msg: error,
        });
      }
    }
  }

  async deleteAddress(req: Request, res: Response) {
    try {
      const { id } = req.body;
      await prisma.address.delete({
        where: {
          id: id,
        },
      });
      res.status(201).send({
        status: 'ok',
        msg: 'Address Deleted!',
      });
    } catch (error: any) {
      if (error.message) {
        res.status(400).send({
          status: 'error delete address',
          msg: error.message,
        });
      } else {
        res.status(400).send({
          status: 'error delete address',
          msg: error,
        });
      }
    }
  }
}
