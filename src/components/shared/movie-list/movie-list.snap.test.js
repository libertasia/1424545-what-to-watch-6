import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render} from '@testing-library/react';
import MovieList from './movie-list';
import {mockFilms} from '../../../test-mocks';

it(`MovieList renders correctly`, () => {
  const history = createMemoryHistory();
  const {container} = render(
      <Router history={history}>
        <MovieList
          visibleFilms={mockFilms}
        />
      </Router>
  );
  expect(container).toMatchSnapshot();
});
