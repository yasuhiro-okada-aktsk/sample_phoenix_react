import {handleAction} from "redux-actions"
import 'isomorphic-fetch';

import { createErrorMeta } from "../actions"

export const api = store => next => action => {
  next(action);

  if (action.meta && action.meta.api) {
    const {url, params, method} = action.meta.api;

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
          next(Object.assign(action, {
            meta: Object.assign(action.meta,
              createErrorMeta(response.toString())
            )
          }));
          return Promise.reject(json);
        }

        next(Object.assign(action, {
          payload: json
        }))
      });
  }
};
