import 'whatwg-fetch';
import { createStore, combineReducers } from 'redux';
import { Adaptor, UPDATE_CACHE } from './adrenaline';
import GraphQLAdaptor from './adrenaline/adaptor/graphql/GraphQLAdaptor';
import { reduce, pairs, extend, map } from 'lodash';

import configureStore, {finalCreateStore} from './store/configureStore';

export default class SampleAdaptor extends GraphQLAdaptor {
  constructor(schema, endpoint='/graphql') {
    super(schema, endpoint);
  }

  createCacheStore(){
    return configureStore();
  }
}
