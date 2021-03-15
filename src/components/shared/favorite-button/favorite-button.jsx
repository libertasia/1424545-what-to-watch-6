import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {FilmShape} from '../../../shapes';
import {changeFavoriteStatus} from '../../../store/api-actions';

const FavoriteStatus = {
  FAVOURITE: 1,
  NOT_FAVORITE: 0
};

const FavoriteButton = (props) => {
  const {film, onClick} = props;

  const handleClick = () => {
    const newStatus = film.isFavorite ? FavoriteStatus.NOT_FAVORITE : FavoriteStatus.FAVOURITE;
    onClick(film.id, newStatus);
  };

  const getButtonImage = (isFavorite) => {
    if (isFavorite) {
      return (
        <svg viewBox="0 0 18 14" width={18} height={14}>
          <use xlinkHref="#in-list"></use>
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 19 20" width={19} height={20}>
          <use xlinkHref="#add" />
        </svg>
      );
    }
  };

  return (
    <button onClick={handleClick} className="btn btn--list movie-card__button" type="button">
      {getButtonImage(film.isFavorite)}
      <span>My list</span>
    </button>
  );
};

FavoriteButton.propTypes = {
  film: FilmShape,
  onClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onClick(filmId, newStatus) {
    dispatch(changeFavoriteStatus(filmId, newStatus));
  },
});

export {FavoriteButton};
export default connect(null, mapDispatchToProps)(FavoriteButton);
