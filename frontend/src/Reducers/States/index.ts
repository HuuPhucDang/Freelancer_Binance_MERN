import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import WidgetReducer from './Widget.reducer';
import BlogReducer from './Blogs.reducer';
import AuthReducer from './Auth.reducer';

const createRootReducer = (history: History) =>
  combineReducers({
    ROUTER: connectRouter(history),
    WIDGET: WidgetReducer,
    BLOGS: BlogReducer,
    AUTH: AuthReducer,
  });
export default createRootReducer;
