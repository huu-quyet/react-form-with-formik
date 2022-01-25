import { provinceData } from '../data/config';
import { IFrom } from '../form/FormDeclaration';

export interface IRow {
  stt?: number;
  id: string;
  name: string;
  object: string;
  birth: string;
  gender: string;
  province: string;
}

// Update data user
export const upDataUser = (data: IFrom) => {
  localStorage.setItem('users', JSON.stringify(data));
};

// Get data user
export const getDataUser = () => {
  const dataUsers = localStorage.getItem('users');

  if (!dataUsers) return [];
  const formatDataUser = JSON.parse(dataUsers);
  return formatDataUser;
};

// Handle delete
export const deleteDataUser = (id: string) => {
  const dataUser = getDataUser();
  const newData: any = dataUser.filter((data: any) => data.id !== id);

  if (!newData) return [];
  upDataUser(newData);
  return newData;
};

// Handle searching
export const searchHandle = (input: string) => {
  const dataUser = getDataUser();
  let newData: IRow[] = [];
  dataUser.forEach((data: IRow) => {
    const values = Object.values(data);
    const stringData = JSON.stringify(values).toLowerCase();
    if (stringData.indexOf(input.trim().toLowerCase()) > -1) {
      newData.push(data);
    }
  });
  return newData;
};

// Format District
export const formatDistrict = (province: string) => {
  const provinces = provinceData.filter((prov) => {
    return prov.name === province;
  });
  const districts = provinces[0].cities;
  const arrDistrict: any = Object.values(districts);
  return arrDistrict;
};

// Submit Form

let newData: IFrom[];

export const handleSubmitForm = (values: IFrom) => {
  const fetchData = getDataUser();
  const existing = fetchData.find((data: any) => {
    return data.id === values.id;
  });

  if (existing) {
    existing.address = values.address;
    existing.birth = values.birth;
    existing.checked = values.checked;
    existing.district = values.district;
    existing.email = values.email;
    existing.gender = values.gender;
    existing.id = values.id;
    existing.name = values.name;
    existing.nation = values.nation;
    existing.object = values.object;
    existing.phone = values.phone;
    existing.province = values.province;
    existing.radio = values.radio;
    existing.travel = values.travel;

    newData = [...fetchData];
  }

  if (!existing) {
    newData = [...fetchData, values];
  }
  return newData;
};
