import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import {FilmShape} from '../../../shapes';
import LoadingScreen from '../../loading-screen/loading-screen';
import PlayButton from './play-button';
import ProgressTogglerTimer from './progress-toggle-timer';
import {fetchFilmById} from '../../../store/api-actions';
import {getFilm, getFilmLoadedStatus} from '../../../store/selectors';
import {getTimeInUserFormat} from '../../../film-utils';
import {NUMBER_OF_SECONDS_IN_HOUR} from '../../../const';

const GAP = 130;

const PLAYER_TOGGLER_WIDTH = 17;

const PERCENTAGE_MULTIPLIER = 100;

const Player = (props) => {
  const {film, isFilmLoaded, onLoad} = props;

  const id = parseInt(useParams().id, 10);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [inProgress, setProgress] = useState(0);
  const [time, setTimer] = useState(getTimeInUserFormat(0, false));
  const [hasHours, setHasHours] = useState(false);

  const videoRef = useRef();

  const hrefToFilmPage = `/films/${film.id}`;

  useEffect(() => {
    onLoad(id);
  }, [id]);

  useEffect(() => {
    if (!isFilmLoaded) {
      return;
    }
    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [isPlaying, isFilmLoaded]);

  if (!isFilmLoaded) {
    return (
      <LoadingScreen />
    );
  }

  const handlePlayBtnClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFullScreenBtnClick = () => {
    if (!isFullScreen) {
      videoRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      videoRef.current.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const handleEndVideo = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(!isPlaying);
  };

  const handleCanPlay = () => {
    const isFilmHasHours = (videoRef.current.duration / NUMBER_OF_SECONDS_IN_HOUR) >= 1;
    setHasHours(isFilmHasHours);
    setTimer(getTimeInUserFormat(videoRef.current.currentTime, hasHours));
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    const progress = (Math.floor(videoRef.current.currentTime) / Math.floor(videoRef.current.duration)) * PERCENTAGE_MULTIPLIER;

    setTimer(getTimeInUserFormat(videoRef.current.currentTime, hasHours));
    setProgress(Math.floor(progress));
  };

  const handleProgressClick = (evt) => {
    const posX = evt.clientX - PLAYER_TOGGLER_WIDTH;
    const timePos = (posX * PERCENTAGE_MULTIPLIER) / (window.screen.availWidth - GAP);

    setProgress(Math.floor(timePos));
    videoRef.current.currentTime = (timePos * Math.round(videoRef.current.duration)) / PERCENTAGE_MULTIPLIER;
    setTimer(getTimeInUserFormat(videoRef.current.currentTime, hasHours));
  };

  return (
    <div className="player">
      <video
        muted={false}
        src={film.videoLink}
        ref={videoRef}
        className="player__video"
        poster={film.backgroundImage}
        onClick={handlePlayBtnClick}
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEndVideo}
      >
      </video>
      <Link to={hrefToFilmPage}>
        <button type="button" className="player__exit">Exit</button>
      </Link>
      <div className="player__controls">
        <ProgressTogglerTimer
          progress={inProgress}
          timer={time}
          onProgressClickHandler={handleProgressClick}
        />
        <div className="player__controls-row">
          <PlayButton
            isPlaying={isPlaying}
            onButtonClick={handlePlayBtnClick}
          />
          <div className="player__name">{film.name}</div>
          <button
            type="button"
            className="player__full-screen"
            onClick={handleFullScreenBtnClick}
            data-testid="full-screen_btn"
          >
            <svg viewBox="0 0 27 27" width={27} height={27}>
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  film: FilmShape,
  isFilmLoaded: PropTypes.bool.isRequired,
  onLoad: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: getFilm(state),
  isFilmLoaded: getFilmLoadedStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoad(id) {
    dispatch(fetchFilmById(id));
  },
});

export {Player};
export default connect(mapStateToProps, mapDispatchToProps)(Player);
