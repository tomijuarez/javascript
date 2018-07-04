import React from 'react';
import { data } from '../testData';
import DataAPI from '../DataAPI';
import ArticleList from './ArticleList';

class App extends React.Component {

  constructor() {
    super();

    this.api = new DataAPI(data);

    this.state = {
      articles: this.api.getArticles(),
      authors: this.api.getAuthors()
    };
  }

  articleActions = {
    lookupAuthor: (authorId) => this.state.authors[authorId]
  };

  render() {
    return (
      <ArticleList articles={this.state.articles} articleActions={this.articleActions} />
    );
  }
}

export default App;