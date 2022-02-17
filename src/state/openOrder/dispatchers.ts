import {createAction} from '@reduxjs/toolkit';

import {OpenOrder} from '../../types/openOrder';
import {OpenOrderDispatcherName} from './types';


export const openOrderDispatchers = {
  [OpenOrderDispatcherName.UPDATE]: createAction<OpenOrder>(OpenOrderDispatcherName.UPDATE),
  [OpenOrderDispatcherName.SET_POLL]: createAction<boolean>(OpenOrderDispatcherName.SET_POLL),
};
