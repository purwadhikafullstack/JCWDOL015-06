export type Cost = {
  value: number;
  etd: string;
  note: string;
};

export type Store = {
    id: number;
    address: {
      id: number;
      cityId: number;
      provinceId: number;
    } | null; // Allow null to handle cases where address is missing
    cost: {
      service: string;
      description: string;
      cost: Cost[];
    };
};
