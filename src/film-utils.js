import {DEFAULT_GENRE, MAX_GENRES_COUNT} from './const';

const getFilmsByGenre = (films, genre) => {
  if (genre === DEFAULT_GENRE) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};

const getGenreList = (films) => {
  const genres = films.map((film) => film.genre).sort();

  return [DEFAULT_GENRE, ...new Set(genres)].slice(0, MAX_GENRES_COUNT);
};

const adaptFilmToClient = (film) => {
  const adaptedFilm = Object.assign(
      {},
      film,
      {
        posterImage: film.poster_image,
        previewImage: film.preview_image,
        backgroundImage: film.background_image,
        backgroundColor: film.background_color,
        scoresCount: film.scores_count,
        runTime: film.run_time,
        isFavorite: film.is_favorite,
        videoLink: film.video_link,
        previewVideoLink: film.preview_video_link
      }
  );

  delete adaptedFilm.poster_image;
  delete adaptedFilm.preview_image;
  delete adaptedFilm.background_image;
  delete adaptedFilm.background_color;
  delete adaptedFilm.scores_count;
  delete adaptedFilm.run_time;
  delete adaptedFilm.is_favorite;
  delete adaptedFilm.video_link;
  delete adaptedFilm.preview_video_link;

  return adaptedFilm;
};

export {getFilmsByGenre, getGenreList, adaptFilmToClient};
