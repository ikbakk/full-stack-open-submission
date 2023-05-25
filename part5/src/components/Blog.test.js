import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, renderEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const mockLikeHandler = jest.fn();
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'https://www.test.com/',
    likes: 0,
    user: {
      username: 'usertest',
      name: 'nametest'
    }
  };

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} likeUpdate={mockLikeHandler} />
    );
  });

  test('renders title and author but not url or likes by default', () => {
    expect(component.container.querySelector('.title')).toHaveTextContent(
      blog.title
    );
    expect(component.container.querySelector('.author')).toHaveTextContent(
      blog.author
    );
    expect(component.queryByText(blog.url)).not.toBeInTheDocument();
    expect(component.queryByText('like')).not.toBeInTheDocument();
  });

  test('at start the children are not displayed', () => {
    const details = component.container.querySelector('.blog-details');

    expect(details).toEqual(null);
  });

  test('renders blog details when button is clicked', () => {
    const button = component.container.querySelector('.visibility-button');
    fireEvent.click(button);

    const blogDetails = component.container.querySelector('.blog-details');
    expect(blogDetails).toBeInTheDocument();
  });

  test('like button clicked twice, event handler also called twice', () => {
    const button = component.container.querySelector('.visibility-button');
    fireEvent.click(button);

    const likeButton = component.container.querySelector('.like-btn');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockLikeHandler.mock.calls).toHaveLength(2);
  });
});
