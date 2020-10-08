/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
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
          content='The best quiz ever!!!'
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
      <Button primary size='huge'>
        Register NOW
        <Icon name='right arrow' />
      </Button>
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
              <Menu
                  fixed={fixed ? 'top' : null}
                  inverted={!fixed}
                  pointing={!fixed}
                  secondary={!fixed}
                  size='large'
              >
                <Container>
                  <Menu.Item as='a' active>
                    Home
                  </Menu.Item>
                  <Menu.Item as='a'>Work</Menu.Item>
                  <Menu.Item as='a'>Company</Menu.Item>
                  <Menu.Item as='a'>Careers</Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted={!fixed}>
                      Log in
                    </Button>
                    <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Container>
              </Menu>
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
            <Sidebar
                as={Menu}
                animation='overlay'
                inverted
                onHide={this.handleSidebarHide}
                vertical
                visible={sidebarOpened}
            >
              <Menu.Item as='a' active>
                Home
              </Menu.Item>
              <Menu.Item as='a'>Work</Menu.Item>
              <Menu.Item as='a'>Company</Menu.Item>
              <Menu.Item as='a'>Careers</Menu.Item>
              <Menu.Item as='a'>Log in</Menu.Item>
              <Menu.Item as='a'>Sign Up</Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={sidebarOpened}>
              <Segment
                  inverted
                  textAlign='center'
                  style={{ minHeight: 350, padding: '1em 0em' }}
                  vertical
              >
                <Container>
                  <Menu inverted pointing secondary size='large'>
                    <Menu.Item onClick={this.handleToggle}>
                      <Icon name='sidebar' />
                    </Menu.Item>
                    <Menu.Item position='right'>
                      <Button as='a' inverted>
                        Log in
                      </Button>
                      <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                        Sign Up
                      </Button>
                    </Menu.Item>
                  </Menu>
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
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button size='huge'>I Am Ready!</Button>
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
          </p>

          <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <a href='#'>Examples</a>
          </Divider>

          <Header as='h3' style={{ fontSize: '2em' }}>
            No. 1
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            “It would be really disappointing — not really — but it would depend on what’s inside the magazine. I don’t think Ivanka would do that, although she does have a very nice figure. I’ve said if Ivanka weren’t my daughter, perhaps I’d be dating her.”
          </p>
          <Button as='a' size='large'>
            I'm Still Quite Interested
          </Button>
        </Container>
      </Segment>

      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='About' />
                <List link inverted>
                  <List.Item as='a'>Sitemap</List.Item>
                  <List.Item as='a'>Contact Us</List.Item>
                  <List.Item as='a'>Religious Ceremonies</List.Item>
                  <List.Item as='a'>Gazebo Plans</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='Services' />
                <List link inverted>
                  <List.Item as='a'>Banana Pre-Order</List.Item>
                  <List.Item as='a'>DNA FAQ</List.Item>
                  <List.Item as='a'>How To Access</List.Item>
                  <List.Item as='a'>Favorite X-Men</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as='h4' inverted>
                  Footer Header
                </Header>
                <p>
                  Extra space for a call to action inside the footer that could help re-engage users.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </ResponsiveContainer>
)

export default HomepageLayout


// import { Modal, Button, Icon } from 'semantic-ui-react'
//
// import SmallImage from './SmallImage.png'
// import LargeImage from './LargeImage.png'
//
// export default function Home() {
//   return (
//     <div className="centered">
//       <Icon size="massive" name="world" />
//       <div className="separator" />
//       <Modal trigger={<Button>Show Modal</Button>}>
//         <Modal.Header>
//           <em>publicPath</em> should be set to <em>/_next/static/</em>
//         </Modal.Header>
//         <Modal.Content>
//           <Modal.Description>
//             <div className="wrapper">
//               <div className="row">
//                 <p>
//                   Larger content should be still available as a fallback to{' '}
//                   <em>fileLoader</em> but it should not pollute{' '}
//                   <em>/.next/static/css</em> folder. You should see two images
//                   below. One, smaller, loaded as data url, and one, bigger,
//                   loaded via url.
//                 </p>
//               </div>
//               <div className="row">
//                 <img src={SmallImage} />
//                 <p>
//                   A small image should be loaded as data url:{' '}
//                   <em>{SmallImage.substr(0, 100)}...</em>
//                 </p>
//               </div>
//
//               <div className="row">
//                 <img src={LargeImage} />
//                 <p>
//                   A large image should be loaded as a url: <em>{LargeImage}</em>
//                 </p>
//               </div>
//               <p className="border">
//                 You should also still be able to load regular css. This text
//                 should have border.
//               </p>
//             </div>
//           </Modal.Description>
//         </Modal.Content>
//       </Modal>
//     </div>
//   )
// }
