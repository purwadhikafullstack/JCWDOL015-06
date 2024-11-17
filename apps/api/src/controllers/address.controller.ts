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
      res.status(400).send({
        status: 'error fething address helper data',
        msg: error.message,
      });
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
      res.status(400).send({
        status: 'error fetching provinces data',
        msg: error.message,
      });
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
      res.status(400).send({
        status: 'error fetching cities data',
        msg: error.message,
      });
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
      res.status(400).send({
        status: 'error fetching cities data',
        msg: error.message,
      });
    }
  }

  async getUserAddress(req: Request, res: Response) {
    try {
      const province = req.params.province;
      console.log('\n\nCONTROLLER ADDRESS\n\n');
      console.log(province);

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

      // const cities = rajaonkir.results
      //   .filter(({ province_id }) => province_id === province) // Filter out only cities matching the province_id
      //   .map(({ city_id, city_name, province_id, province, postal_code }) => ({
      //     city_id,
      //     city_name,
      //     province_id,
      //     province,
      //     postal_code,
      //   })); // Map to the desired structure

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
      res.status(400).send({
        status: 'error fetching cities data',
        msg: error.message,
      });
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
      res.status(400).send({
        status: 'error account update',
        msg: error.message,
      });
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

      if (!findAddress || findAddress.length === 0) throw 'Error Find Address';

      // await prisma.address.update({
      //   where: {
      //     id: findAddress.id,
      //   },
      //   data: {
      //     isMain: 0,
      //   },
      // });

      // await prisma.address.update({
      //   where: {
      //     id: id,
      //   },
      //   data: {
      //     isMain: 1,
      //   },
      // });

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
    } catch (error: any) {
      res.status(400).send({
        status: 'error account update',
        msg: error.message,
      });
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
      res.status(400).send({
        status: 'error account update',
        msg: error.message,
      });
    }
  }
}
