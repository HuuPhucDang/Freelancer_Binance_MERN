import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import WidgetReducer from './Widget.reducer';
import BlogReducer from './Blogs.reducer';

const createRootReducer = (history: History) =>
  combineReducers({
    ROUTER: connectRouter(history),
    WIDGET: WidgetReducer,
    BLOGS: BlogReducer,
  });
export default createRootReducer;
