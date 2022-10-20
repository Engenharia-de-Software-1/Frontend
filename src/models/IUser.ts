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

export interface IUserInvestor {
  id: string;
  name: string;
  email: string;
  phone: string;

  investor: {
    companyName: string;
    profession: string;
    cnpj: string;
    qtdMembers: number;
  };

  address: {
    state: string;
    city: string;
  }
}

export interface IUserStartup {
  id: string;
  name: string;
  email: string;
  phone: string;

  startup: {
    startupName: string;
    cnpj: string;
    employees: number;
  };

  address: {
    state: string;
    city: string;
  }
}