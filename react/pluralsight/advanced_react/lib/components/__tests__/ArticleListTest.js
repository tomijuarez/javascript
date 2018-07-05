import React from 'react';
import ArticleList from '../ArticleList';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Article from '../Article';

configure({ adapter: new Adapter() });

describe('ArticleList', () => {

  const testProps = {
    articles: {
      a: { id: 'a' },
      b: { id: 'b' }
    }
  };

  Article.propTypes = {};

  it('renders correctly', () => {
    const wrapper = shallow(
      <ArticleList
        {...testProps}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('has the right children number', () => {
    const wrapper = shallow(
      <ArticleList
        {...testProps}
      />
    );

    expect(wrapper.children().length).toBe(2);
  });
});