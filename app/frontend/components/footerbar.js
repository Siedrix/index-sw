import React, { Component } from 'react'
import { branch } from 'baobab-react/higher-order'

import tree from '~core/tree'

class FooterBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (

      <footer className="footer">
        <div className="container">
          <div className="columns">
            <div className="column is-3">
              <div className="content">
                <p>
                  Made in Startup Weekend by:
                </p>

                <div className="twitter-container">
                  <a href="https://twitter.com/soequelle" className="twitter-follow-button" data-show-count="true" data-lang="en" data-size="large">@soequelle</a>
                </div>
                <div className="twitter-container">
                  <a href="https://twitter.com/eltalbruno" className="twitter-follow-button" data-show-count="true" data-lang="en" data-size="large">@eltalbruno</a>
                </div>
                <div className="twitter-container">
                  <a href="https://twitter.com/claudiagizela" className="twitter-follow-button" data-show-count="true" data-lang="en" data-size="large">@claudiagizela</a>
                </div>
                <div className="twitter-container">
                  <a href="https://twitter.com/siedrix" className="twitter-follow-button" data-show-count="true" data-lang="en" data-size="large">@siedrix</a>
                </div>
                <div className="twitter-container">
                  <a href="https://twitter.com/dfect" className="twitter-follow-button" data-show-count="true" data-lang="en" data-size="large">@dfect</a>
                </div>

              </div>
            </div>
            <div className="column is-5">
              <div id="share" className="content">
                <div>
                  <strong>Support</strong> and share the love!
                </div>

                <div id="social">
                  <iframe className="github-btn" src="https://ghbtns.com/github-btn.html?user=siedrix&repo=index-sw&type=star&count=true&size=large" scrolling="0" width="160px" height="30px"></iframe>
                  <a href="https://twitter.com/share" className="twitter-share-button" data-text="Inddex: a new social learning tool!" data-url="http://inddex.co" data-count="horizontal" data-via="dfect" data-size="large">Tweet</a>
                </div>

              </div>
            </div>
            <div className="column is-4">
              <div id="sister">
                <img src="/public/slogan.png"/>
              </div>
            </div>
          </div>

        </div>
      </footer>
    )
  }
}

export default branch({}, FooterBar)
