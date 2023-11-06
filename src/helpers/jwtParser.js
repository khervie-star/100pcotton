import React from 'react';
import { BehaviorSubject } from 'rxjs';

function parseJwt() {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('token')
    console.log(user)
    if (user) {
      const jwt = user  ?.token;
      var base64Url = jwt?.split('.')[1];
      var base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64)?.split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    }
  }
};

export const JwtParser = { parseJwt };
