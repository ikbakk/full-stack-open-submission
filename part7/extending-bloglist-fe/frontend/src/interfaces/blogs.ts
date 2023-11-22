export default interface Blog {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  // user: any
}

export interface BlogInput {
  title: string;
  author: string;
  likes?: number;
  url: string;
}
