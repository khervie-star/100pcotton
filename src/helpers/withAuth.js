import Router from "next/router";
import React from "react";

const withAuth = (Component) => {
  const Auth = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    let user;
    if (typeof window !== "undefined") {
      user = JSON.parse(window.localStorage.getItem("token"));
    }
    console.log(user);
    const loggedIn = !!user;
    console.log(loggedIn);

    // If user is not logged in, return login component
    if (!loggedIn) {
      Router.replace(
        `/dashboard/account/login?redirect=${
          Router.pathname ? Router.pathname : ""
        }`
      );
      return (
        // <Login />
        null
      );
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

// export default withAuth;
function mapState(state) {
  const { loggedIn } = state.login;
  return { loggedIn };
}

// const connectedWithAuth = connect(mapState)(withAuth);

export default withAuth;

// import React from 'react';
// import Router from 'next/router';

// const login = '/account/login?redirected=true'; // Define your login route address.

// /**
//  * Check user authentication and authorization
//  * It depends on you and your auth service provider.
//  * @returns {{auth: null}}
//  */
// const checkUserAuthentication = () => {
//   let auth;
//   if (typeof window !== 'undefined') {
//     auth = JSON.parse(window.localStorage.getItem('user'));
//   }
//   return auth; // change null to { isAdmin: true } for test it.

// };

// export default WrappedComponent => {
//   const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

//   hocComponent.getInitialProps = async (context) => {
//     const userAuth = await checkUserAuthentication();

//     // Are you an authorized user or not?
//     if (!userAuth) {
//       // Handle server-side and client-side rendering.
//       if (context.res) {
//         context.res?.writeHead(302, {
//           Location: "/",
//         });
//         context.res?.end();
//       } else {
//         Router.replace(login);
//       }
//     } else if (WrappedComponent.getInitialProps) {
//       const wrappedProps = await WrappedComponent.getInitialProps({ ...context, auth: userAuth });
//       return { ...wrappedProps, userAuth };
//     }

//     return { userAuth };
//   };

//   return hocComponent;
// };
