export interface IAccountAddress {
  id: number;
  provinceId: number;
  cityId: number;
  desc: String;
}

export interface IAddressCreate {
  provinceId: String;
  cityId: String;
  desc: String;
}
