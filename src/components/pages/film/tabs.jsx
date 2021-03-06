import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import {FilmShape, ReviewsShape} from '../../../shapes';
import {Rating, RatingLevel, TabTypes} from '../../../const';
import {getFilm, getReviews, getActiveTab} from '../../../store/selectors';
import {ActionCreator} from '../../../store/action';

const TabDetails = [
  {
    type: TabTypes.OVERVIEW,
    title: `Overview`
  },
  {
    type: TabTypes.DETAILS,
    title: `Details`
  },
  {
    type: TabTypes.REVIEWS,
    title: `Reviews`
  },
];

const getStarring = (film) => {
  const res = [];
  film.starring.forEach((name) => {
    res.push(`${name},`);
    res.push(<br key={name} />);
  });
  return res;
};

const getDuration = (film) => {
  const totalMinutes = film.runTime;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

const getMovieRatingLevel = (film) => {
  const rating = film.rating;

  if (rating < Rating.BAD) {
    return RatingLevel.BAD;
  } else if (rating < Rating.NORMAL) {
    return RatingLevel.NORMAL;
  } else if (rating < Rating.GOOD) {
    return RatingLevel.GOOD;
  } else if (rating < Rating.AWESOME) {
    return RatingLevel.VERY_GOOD;
  } else {
    return RatingLevel.AWESOME;
  }
};

const Tabs = (props) => {
  const {film, reviews, activeTab, setActiveTab} = props;

  const filmDurarion = getDuration(film);

  let tabContent = null;

  const handleTabClick = (evt) => {
    evt.preventDefault();
    setActiveTab(evt.currentTarget.dataset.id);
  };

  switch (activeTab) {
    case TabTypes.OVERVIEW:
      tabContent = (
        <React.Fragment>
          <div className="movie-rating">
            <div className="movie-rating__score">{film.rating}</div>
            <p className="movie-rating__meta">
              <span className="movie-rating__level">{getMovieRatingLevel(film)}</span>
              <span className="movie-rating__count">{film.scoresCount} ratings</span>
            </p>
          </div>
          <div className="movie-card__text">
            <p>{film.description}</p>
            <p className="movie-card__director"><strong>Director: {film.director}</strong></p>
            <p className="movie-card__starring"><strong>Starring: {film.starring.join(`, `)} and other</strong></p>
          </div>
        </React.Fragment>
      );
      break;
    case TabTypes.DETAILS:
      tabContent = (
        <div className="movie-card__text movie-card__row">
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Director</strong>
              <span className="movie-card__details-value">{film.director}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Starring</strong>
              <span className="movie-card__details-value">
                {getStarring(film)}
              </span>
            </p>
          </div>
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Run Time</strong>
              <span className="movie-card__details-value">{filmDurarion}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Genre</strong>
              <span className="movie-card__details-value">{film.genre}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{film.released}</span>
            </p>
          </div>
        </div>
      );
      break;
    case TabTypes.REVIEWS:
      tabContent = (
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            {
              reviews.map((review) => (
                <div key={review.id} className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">{review.comment}</p>
                    <footer className="review__details">
                      <cite className="review__author">{review.user.name}</cite>
                      <time className="review__date" dateTime={review.date}>{`${dayjs(review.date).format(`MMMM D, YYYY`)}`}</time>
                    </footer>
                  </blockquote>
                  <div className="review__rating">{review.rating}</div>
                </div>
              ))
            }
          </div>
        </div>
      );
  }

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {
            TabDetails.map((tab) =>
              (
                <li key={tab.type} data-id={tab.type} onClick={handleTabClick} className={`movie-nav__item ${tab.type === activeTab ? `movie-nav__item--active` : ``}`}>
                  <a href="#" className="movie-nav__link">{tab.title}</a>
                </li>
              ))
          }
        </ul>
      </nav>
      {tabContent}
    </div>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  film: FilmShape,
  reviews: ReviewsShape,
  setActiveTab: PropTypes.func,
};

const mapStateToProps = (state) => ({
  film: getFilm(state),
  reviews: getReviews(state),
  activeTab: getActiveTab(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActiveTab(tabId) {
    dispatch(ActionCreator.setActiveTab(tabId));
  },
});

export {Tabs};
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
