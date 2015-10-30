import {handleAction} from "redux-actions"
import 'isomorphic-fetch';

export const api = store => next => action => {
  next(action);

  if (action.meta.api) {
    const {url, params, method, success, failure} = action.meta.api;

    fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(response =>
        response.json().then(json => ({json, response}))
      )
      .then(({ json, response }) => {
        if (!response.ok) {
          next(failure());
          return Promise.reject(json);
        }

        next(success(json))
      });
  }
};
