import StateAPI from 'state-api';
import { data } from '../testData';

const api = new StateAPI(data);

describe('StateAPI', () => {
  it('exposes articles as an object', () => {
    //API data.
    const articles = api.getState().articles;
    //RAW data.
    const articleId = data.articles[0].id;
    const articleTitle = data.articles[0].title;

    expect(articles).toHaveProperty(articleId);
    expect(articles[articleId].title).toBe(articleTitle);
  });

  it('exposes authors as an object', () => {
    //API data.
    const authors = api.getState().authors;
    //RAW data.
    const authorId = data.authors[0].id;
    const authorFirstName = data.authors[0].firstName;

    expect(authors).toHaveProperty(authorId);
    expect(authors[authorId].firstName).toBe(authorFirstName);
  });
});