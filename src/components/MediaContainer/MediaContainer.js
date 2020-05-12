import React from 'react';
import { string } from 'prop-types';

import Fade from 'react-reveal';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';

import './media-container.css';

const MediaContainer = ({ user }) => {
  return (
    <Fade>
      <div className="container">
        <div className="media-content">
          <TwitterShareButton
            title="Hey! check my github stats here"
            hashtags={['github', 'reporter', 'stats', 'react', 'js', 'dev']}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <span className="heading share-title">Share on Twitter</span>
        </div>
        <div className="media-content">
          <FacebookShareButton
            hashtag="#github #reporter #stats #react #js #dev"
            quote={`Hey! check my github stats here https://github-reporter.now.sh/${user}`}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <span className="heading share-title">Share on Facebook</span>
        </div>
      </div>
    </Fade>
  );
};

MediaContainer.propTypes = {
  user: string.isRequired,
};

export default MediaContainer;
