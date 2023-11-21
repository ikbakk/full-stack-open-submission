import { Blog } from '@/interfaces/models';
import _ from 'lodash';

export const totalLikes = (blogs: Blog[]) => {
  const reducer = (a: number, b: number) => a + b;

  const blogLikes = blogs.map((blog) => blog.likes);

  return blogLikes.reduce(reducer, 0);
};

export const favoriteBlog = (blogs: Blog[]) => {
  const blogLikes = blogs.map((blog) => blog.likes);
  const largestIndex = blogLikes.indexOf(Math.max(...blogLikes));
  const largestInfo = blogs[largestIndex];

  return {
    title: largestInfo.title,
    author: largestInfo.author,
    likes: largestInfo.likes,
  };
};

export const mostBlogs = (blogs: Blog[]) => {
  const blogsAuthor = blogs.map((blog) => blog.author);

  let mode = _.chain(blogsAuthor).countBy().entries().maxBy(_.last).thru(_.head).value();
  let count = 0;

  blogsAuthor.forEach((author) => {
    if (author === mode) {
      count++;
    }
  });

  return {
    author: mode,
    blogs: count,
  };
};

export const mostLikes = (blogs: Blog[]) => {
  const groupedBlogs = _.groupBy(blogs, 'author');
  const countedAuthors = _.map(groupedBlogs, (arr: Blog[]) => {
    return {
      author: arr[0].author,
      likes: _.sumBy(arr, 'likes'),
    };
  });

  const maxLikesAuthor = _.maxBy(countedAuthors, (arr: any) => arr.likes);
  const authorName = _.head(_.values(maxLikesAuthor));

  return {
    author: authorName,
    likes: maxLikesAuthor!.likes,
  };
};
