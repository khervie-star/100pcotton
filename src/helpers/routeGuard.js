/* eslint-disable react-hooks/exhaustive-deps */

import * as React from 'react';
import { useRouter } from 'next/router';
import { connect } from "react-redux"
import { BehaviorSubject } from 'rxjs';
import _ from "lodash"
import jwt_decode from "jwt-decode"
import toast from 'react-hot-toast';
import AuthTokenService from '../services/authToken.service';



import { userService } from '../services';
import { userActions } from "../redux/actions"
import { store } from '../redux/store';


export { RouteGuard };

function RouteGuardCheck({ children, loggedIn }) {
  const router = useRouter();
  const { logout } = userActions
  const [authorized, setAuthorized] = React.useState(true);

  const user = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

  React.useEffect(() => {
    const tokenCheck = () => {
      if (typeof window !== "undefined") {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user && user.token) {
          const decoded = jwt_decode(AuthTokenService.getLocalRefreshToken())
          if (Date.now() >= decoded.exp * 1000) {
            // logout();
            toast("Session expired, please login again");
            store.dispatch(logout())
            // router.push({
            //   pathname: '/account/login',
            // });
            setAuthorized(false)
          } else {
            setAuthorized(true)
          }
        }
      }
      setAuthorized(true)
      return null
    }

    // on initial load - run auth check
    tokenCheck();

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);

    router.events.on('routeChangeStart', hideContent);


    // on route change complete - run auth check
    router.events.on('routeChangeComplete', tokenCheck)


    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', tokenCheck);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return authorized && children;
}

function mapState(state) {
  const { loggedIn } = state.login;
  return { loggedIn };
}

const actionCreators = {
  // logout: userActions.logout,
};

const RouteGuard = connect(mapState, actionCreators)(RouteGuardCheck);
