/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import gitButton from "../components/gitButton";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */


const HomepageHeading = ({ mobile }) => (
    <Container text>
      <Header
          as='h1'
          content='Celebrity Quiz'
          inverted
          style={{
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '3em',
          }}
      />
      <Header
          as='h2'
          content='How good are you at recognizing famous quotes?'
          inverted
          style={{
            fontSize: mobile ? '1.5em' : '1.7em',
            fontWeight: 'normal',
            marginTop: mobile ? '0.5em' : '1.5em',
          }}
      />
      <div>
        <div className="ui right labeled button" role="button" tabIndex="0">
          <button
              onClick={() => window.location.href="https://github.com/S1ngl3-x/Celebrity-App"}
              className="ui grey button"><i aria-hidden="true" className="github icon"></i>GitHub</button>
          <a href="https://github.com/S1ngl3-x/Celebrity-App" className="ui grey left pointing basic label">1 <i
              className="star outline icon"></i></a></div>
      </div>
    </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
        <Media greaterThan='mobile'>
          <Visibility
              once={false}
              onBottomPassed={this.showFixedMenu}
              onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
                inverted
                textAlign='center'
                style={{ minHeight: 700, padding: '1em 0em' }}
                vertical
            >
              <HomepageHeading />
            </Segment>
          </Visibility>

          {children}
        </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
        <Media as={Sidebar.Pushable} at='mobile'>
          <Sidebar.Pushable>

            <Sidebar.Pusher dimmed={sidebarOpened}>
              <Segment
                  inverted
                  textAlign='center'
                  style={{ minHeight: 350, padding: '1em 0em' }}
                  vertical
              >
                <Container>
                </Container>
                <HomepageHeading mobile />
              </Segment>

              {children}
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
    /* Heads up!
     * For large applications it may not be best option to put all page into these containers at
     * they will be rendered twice for SSR.
     */
    <MediaContextProvider>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
    <ResponsiveContainer>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Show Off Your INTELLECT
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Prove to yourself and to all others that you are way more than just a filthy casual. Also, prove it your mom!
              </p>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Brewed For Cultural Experts
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Are you up to the challenge?!
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='large' src='/images/mind.jpg' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Taylor Swift API
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                <Image avatar src='/images/love_avatar.jpeg' />
                Are you ready to fall for true and most epic love poems? But remember: "Everything that falls, gets broken."</p>
              <p style={{ fontSize: '1.33em' }}><a href="https://taylor.rest" target="_blank">API</a> for generating <b>Taylor Swift</b> quotes.</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Donald The Duck API
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                <Image avatar src='/images/trump_avatar.webp' />
                Can you recognize jokes from a comedian who happens to be the president?
              </p>
              <p style={{ fontSize: '1.33em' }}><a href="https://whatdoestrumpthink.com/api-docs/index.html#introduction" target="_blank">API</a> for generating <b>Donald Trump</b> quotes.</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
            How It Works
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            You sign up for a game account.
            Once you are logged in, there's an endless amount of fun and thrilling quizzes waiting four you.
            In each quiz you are presented with a quote and your job is to match the quote with a person it belongs to.
              You can review your previous results.
          </p>
        </Container>
      </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
            <Container text>
                <Header as='h3' style={{ fontSize: '2em' }}>
                    Progress Documentation
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                    Below are project status assessments.
                </p>
            </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
            <Container text>
                <Header as='h3' style={{ fontSize: '2em' }}>
                    19.10.2020
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                    Project initialized on GitHub.
                    Basic POST and GET functionality added.
                </p>
            </Container>
        </Segment>

      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <p>Web page presenting VIA semester's project made by Adam Lipowski.</p>
        </Container>
      </Segment>
    </ResponsiveContainer>
)

export default HomepageLayout