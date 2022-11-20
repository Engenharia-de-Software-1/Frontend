export interface IIdea {
  id: string;
  title: string;
  description: string;
  userId: string;
  situation: string;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}