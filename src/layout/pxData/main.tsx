import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useSocketInit} from '../../hooks/socket/init';
import {useExecutionSelector} from '../../state/execution/selector';
import {useOpenOrderSelector} from '../../state/openOrder/selector';
import {usePositionSelector} from '../../state/position/selector';
import {usePxDataSelector} from '../../state/pxData/selector';
import {PxData} from '../../types/pxData';
import {getPxDataTitle} from '../../utils/pxData';
import {PxDataAlwaysShow} from './alwaysShow';
import {PxDataCollapsible} from './collapsible';
import {ErrorPopup} from './error/main';
import {PxDataIndividualProps} from './individual';
import styles from './main.module.scss';


export const PxDataMain = () => {
  const pxData = usePxDataSelector();
  const position = usePositionSelector();
  const openOrderState = useOpenOrderSelector();
  const execution = useExecutionSelector();

  useSocketInit();

  const {openOrders} = openOrderState;

  const getIndividualProps = (data: PxData): PxDataIndividualProps => ({
    pxData: data,
    title: getPxDataTitle(data, !data.isMajor),
    payload: {
      position: position[data.contract.identifier],
      openOrder: openOrders[data.contract.identifier],
      execution: execution[data.contract.identifier],
    },
  });

  const sortedPxData = Object.values(pxData)
    .sort((a, b) => (
      a.contract.identifier - b.contract.identifier ||
      a.periodSec - b.periodSec
    ));

  const majorPxData = sortedPxData.filter(({isMajor}) => isMajor);
  const minorPxData = sortedPxData.filter(({isMajor}) => !isMajor);

  return (
    <>
      <ErrorPopup/>
      <Row className="g-3">
        {majorPxData.map((data) => (
          <Col key={data.uniqueIdentifier} xs={6}>
            <PxDataAlwaysShow {...getIndividualProps(data)}/>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <div className={styles['sub-px-data-bar']}>
            {minorPxData.map((data) => (
              <PxDataCollapsible key={data.uniqueIdentifier} {...getIndividualProps(data)}/>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};
