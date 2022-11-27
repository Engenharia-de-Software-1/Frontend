export interface IPlan {
  id: string;
  plan: string;
  permissions: {
    [key: string]: boolean;
  };
}