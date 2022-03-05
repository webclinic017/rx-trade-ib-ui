import {OrderSide, SecurityIdentifier} from './common';


export type OpenOrderData = {
  groupId: number | null,
  orderId: number,
  identifier: SecurityIdentifier,
  side: OrderSide,
  quantity: number,
  px: number,
};

export type OpenOrder = Record<SecurityIdentifier, Record<number, OpenOrderData>>;
