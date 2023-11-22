import Blog from './blogs';

export interface User {
  username: string;
  name: string;
  passwordHash?: string;
  blogs?: Blog[];
}
