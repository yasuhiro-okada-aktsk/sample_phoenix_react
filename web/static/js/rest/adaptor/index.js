import 'whatwg-fetch';
import GraphQLAdaptor from '../adrenaline/adaptor/graphql/GraphQLAdaptor';
import parseSchema from '../adrenaline/adaptor/graphql/parseSchema';

import createCacheStore from './createCacheStore'
import { finalCreateStore } from './../store/configureStore';
import rootReducer from '../reducers';

export default class SampleAdaptor extends GraphQLAdaptor {
  constructor(schema, endpoint='/graphql') {
    super(schema, endpoint);
  }

  createCacheStore(){
    return createCacheStore(parseSchema(this.schema), finalCreateStore, rootReducer);
  }
}
