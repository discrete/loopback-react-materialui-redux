
export const AUTH_LOGIN_REQUEST = 'reactsoft/auth/login_request';
export const AUTH_LOGIN_REQUEST_PENDING = 'reactsoft/auth/login_request_PENDING';
export const AUTH_LOGIN_REQUEST_REJECTED = 'reactsoft/auth/login_request_REJECTED';
export const AUTH_LOGIN_REQUEST_FULFILLED = 'reactsoft/auth/login_request_FULFILLED';

export const AUTH_INITIAL_STATE = {
  auth: {
    fetching: false,
    error: null,
    twofactor: false,
    passwordExpired: false,
    payload: {},
  },
  reset: {
    fetching: false,
    error: null,
    payload: {},
  },
  ua: '',
};

export const authReducer = (state = AUTH_INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTH_LOGIN_REQUEST: {
      console.log('AUTH_LOGIN_REQUEST');
      return state;
    }
    case AUTH_LOGIN_REQUEST_PENDING: {
      const nextState = JSON.parse(JSON.stringify(state));
      console.log('AUTH_LOGIN_REQUEST_PENDING');
      return { ...nextState, auth: {fetching: true} };
    }
    case AUTH_LOGIN_REQUEST_REJECTED: {
      console.log('AUTH_LOGIN_REQUEST_REJECTED');
      return { ...state, auth: {fetching: false, error: action.payload.message} };
    }
    case AUTH_LOGIN_REQUEST_FULFILLED: {
      console.log('AUTH_LOGIN_REQUEST_FULFILLED');
      return { ...state, auth: {fetching: false, payload: action.payload} };
    }
    default: {
      return state;
    }
  }
}

export default authReducer;

export const requestLocalAuth = (authParams, onResolve, onReject) => dispatch => {
  dispatch({
    type: AUTH_LOGIN_REQUEST,
    payload: new Promise(function(resolve, reject){
      fetch('/api/v1/Users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(authParams),
        credentials: 'include',
        timeout: 3000,
        responseType: 'json',
      })
      .then((response) => {
        if (response.ok) {
          return Promise.resolve(response);
        } else {
          let error = new Error(response.statusText);
          error.response = response;
          return Promise.reject(error);
          // throw error;
        }
      })
      .then((response) => response.json())
      .then((data)=>{
        resolve(data);
        if (onResolve) {
          onResolve(data);
        }
      })
      .catch(error => {
        console.log(error);
        reject(error);
        if (onReject) {
          onReject(error);
        }
      })
    })
  }).catch(error =>{
    console.log(error.message);
    dispatch({type: 'DUMMY'});
  });
};


