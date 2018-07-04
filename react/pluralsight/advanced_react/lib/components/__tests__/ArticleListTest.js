import React from 'react';
import ArticleList from '../ArticleList';
import renderer from 'react-test-renderer';

describe('ArticleList', () => {

  const testProps = {
    articles: {
      a: { id: 'a' },
      b: { id: 'b' }
    },
    articleActions : {
      lookupAuthor: jest.fn(() => ({}))
    }
  };

  it('renders correctly', () => {
    const element = renderer.create(
      <ArticleList
        {...testProps}
      />
    ).toJSON();

    expect(element).toMatchSnapshot();
  });

  it('has the right children number', () => {
    const element = renderer.create(
      <ArticleList
        {...testProps}
      />
    ).toJSON();

    expect(element.children.length).toBe(2);
  });
});