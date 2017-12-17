import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withRouter } from 'react-router';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import compose from 'recompose/compose';
import { getTranslate, addTranslation } from 'react-localize-redux';

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import List from 'material-ui/List';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';

import './App.css';
import SignIn from './routes/signin'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  flex: {
    flex: 1,
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

const messages = {
  "App": {
    "title": [
      "제목",
      "Title",
      "JP-Title",
      "ZH-Title",
      "FR-Title",
      "ES-Title"
    ],
    "login": [
      "로그인",
      "Log in",
      "JP-Log in",
      "ZH-Log in",
      "FR-Log in",
      "ES-Log in"
    ],
    "logout": [
      "로그아웃",
      "Log out",
      "JP-Log out",
      "ZH-Log out",
      "FR-Log out",
      "ES-Log out"
    ],
    "menu1": [
      "메뉴 1",
      "Menu 1",
      "JP-Menu 1",
      "ZH-Menu 1",
      "FR-Menu 1",
      "ES-Menu 1"
    ],
    "menu2": [
      "메뉴 2",
      "Menu 2",
      "JP-Menu 2",
      "ZH-Menu 2",
      "FR-Menu 2",
      "ES-Menu 2"
    ],
    "singup": [
      "가입하기",
      "Sign Up",
      "JP-Sign Up",
      "ZH-Sign Up",
      "FR-Sign Up",
      "ES-Sign Up"
    ]
  }
};

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    mobileOpen: false,
  };

  componentDidMount = () => {
    this.props.dispatch(addTranslation(messages));
  }

  handleSignin = (event) => {
    console.log(this.props);
    this.props.history.push('signin');
  }

  handleSignOut = (event) => {
    console.log("signout");
    const { cookies, history } = this.props;
    window.authenticateCallback = function(token) {
      console.log(token);
      let accessToken = token;
      cookies.set('access_token', '', { path: '/' });
      history.replace('/');
      // location.reload();
      // $('#accessToken').val(accessToken);
    };
    window.open('/auth/logout');
  }

  handleTitleClick = (event) => {
    this.props.history.push('/');
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme, cookies, translate } = this.props;

    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <Divider />
        <List>{translate('App.menu1')}</List>
        <Divider />
        <List>{translate('App.menu2')}</List>
      </div>
    );

    return (
      <div className={classes.root}>
      <div className={classes.appFrame}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="contrast"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex} noWrap>
            <span onClick={this.handleTitleClick}>{translate('App.title')}{cookies.get('access_token')}</span>
            </Typography>
            {cookies.get('access_token') ? <Button color="contrast" onClick={this.handleSignOut}>{translate('App.logout')}</Button>: <Button color="contrast" onClick={this.handleSignin}>{translate('App.login')}</Button>}

          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            type="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            onRequestClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            type="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <Route exact path="/" render={()=>(
            <div>
              <h2>root</h2>
            </div>
          )} />
          <Route path="/signin" component={SignIn} />
        </main>
      </div>
    </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  cookies: instanceOf(Cookies).isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    translate: getTranslate(state.locale),
  };
};

// export default withCookies(withRouter(connect(mapStateToProps)(withStyles(styles)(App))));
export default compose(withCookies, withRouter, withStyles(styles), connect(mapStateToProps))(App);

// export default App;
