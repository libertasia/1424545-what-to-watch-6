import {dataReducer} from './data-reducer';
import {ActionType} from '../action';
import {AuthorizationStatus} from '../../const';
import {mockFilms, mockFilm, mockReviews} from '../../test-mocks';

describe(`Data-Reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.INIT,
      isDataLoaded: false,
      isDataLoading: false,
      isPromoLoaded: false,
      isPromoLoading: false,
      isFilmLoaded: false,
      isReviewsLoaded: false,
      isFilmsListLoading: false,
      films: [],
      film: {
        backgroundColor: ``,
        backgroundImage: ``,
        description: ``,
        director: ``,
        genre: ``,
        id: -1,
        isFavorite: false,
        name: ``,
        posterImage: ``,
        previewImage: ``,
        previewVideoLink: ``,
        rating: 0,
        released: 0,
        runTime: 0,
        scoresCount: 0,
        starring: [``],
        videoLink: ``
      },
      reviews: [],
      favoriteFilms: [],
      promo: {
        backgroundImage: ``,
        genre: ``,
        name: ``,
        posterImage: ``,
        released: 0,
      },
    };
    expect(dataReducer(undefined, {}))
      .toEqual(initialState);
  });

  it(`Reducer should update films and isDataLoaded status by a given value`, () => {
    const state = {
      films: [],
      isDataLoaded: false,
    };
    const loadFilmsAction = {
      type: ActionType.LOAD_FILMS,
      payload: {films: mockFilms, isDataLoaded: true},
    };

    expect(dataReducer(state, loadFilmsAction))
      .toEqual({films: mockFilms, isDataLoaded: true});
  });
  it(`Reducer should change isFilmsListLoading status by a given value`, () => {
    const state = {
      isFilmsListLoading: false,
      otherFiled: `shouldNotChange`,
    };
    const setIsFilmsListLoadingAction = {
      type: ActionType.SET_IS_FILMS_LIST_LOADING,
      payload: true,
    };

    expect(dataReducer(state, setIsFilmsListLoadingAction))
      .toEqual({isFilmsListLoading: true, otherFiled: `shouldNotChange`});
  });
  it(`Reducer should update promo Film and isPromoLoaded status by a given value`, () => {
    const state = {
      promo: {},
      isPromoLoaded: false,
    };
    const loadPromoFilmAction = {
      type: ActionType.LOAD_PROMO_FILM,
      payload: {film: mockFilm, isPromoLoaded: true},
    };

    expect(dataReducer(state, loadPromoFilmAction))
      .toEqual({promo: mockFilm, isPromoLoaded: true});
  });
  it(`Reducer should change isPromoLoading status by a given value`, () => {
    const state = {
      isPromoLoading: false,
      otherFiled: `shouldNotChange`,
    };
    const setIsPromoLoadingAction = {
      type: ActionType.SET_IS_PROMO_LOADING,
      payload: true,
    };

    expect(dataReducer(state, setIsPromoLoadingAction))
      .toEqual({isPromoLoading: true, otherFiled: `shouldNotChange`});
  });
  it(`Reducer should update favoriteFilms by a given value`, () => {
    const state = {
      favoriteFilms: [],
    };
    const loadFavoriteFilmsListAction = {
      type: ActionType.LOAD_FAVORITE_FILMS_LIST,
      payload: mockFilms,
    };

    expect(dataReducer(state, loadFavoriteFilmsListAction))
      .toEqual({favoriteFilms: mockFilms});
  });
  it(`Reducer should update Film and isFilmLoaded status by a given value`, () => {
    const state = {
      film: {},
      isFilmLoaded: false,
    };
    const loadFilmAction = {
      type: ActionType.LOAD_FILM,
      payload: {film: mockFilm, isFilmLoaded: true},
    };

    expect(dataReducer(state, loadFilmAction))
      .toEqual({film: mockFilm, isFilmLoaded: true});
  });
  it(`Reducer should update reviews and isReviewsLoaded status by a given value`, () => {
    const state = {
      reviews: [],
      isReviewsLoaded: false,
    };
    const loadReviewsAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: {reviews: mockReviews, isReviewsLoaded: true},
    };

    expect(dataReducer(state, loadReviewsAction))
      .toEqual({reviews: mockReviews, isReviewsLoaded: true});
  });
  it(`Reducer should update authorizationStatus by a given value`, () => {
    const state = {authorizationStatus: AuthorizationStatus.INIT};
    const requiredAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    };

    expect(dataReducer(state, requiredAuthorizationAction))
      .toEqual({authorizationStatus: AuthorizationStatus.AUTH});
  });
  it(`Reducer should update film/promo film by a given value`, () => {
    const state = {
      film: {id: 6},
      promo: {id: 6},
    };
    const setFavoriteStatusAction = {
      type: ActionType.SET_FAVORITE_STATUS,
      payload: mockFilm,
    };

    expect(dataReducer(state, setFavoriteStatusAction))
      .toEqual({film: mockFilm, promo: mockFilm});
  });
});
