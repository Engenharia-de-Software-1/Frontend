export interface IIdea {
  id: string;
  title: string;
  description: string;
  userId: string;
  situation: string;
  favorites: number;
  createdAt: Date;
  updatedAt: Date;
  views: number;
}