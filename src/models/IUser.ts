export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IUserClient {
  id: string;
  name: string;
  email: string;
  phone: string;

  client: {
    companyName: string;
    profession: string;
  };

  address: {
    state: string;
    city: string;
  }
}