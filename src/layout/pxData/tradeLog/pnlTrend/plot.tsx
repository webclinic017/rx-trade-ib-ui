import React from 'react';

import {CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {epochSecToFormattedString} from '../../../../utils/chart';
import styles from '../../extrema/cdf/main.module.scss';
import {RealizedExecutionGroup} from '../type';
import {PnLTrendTooltip} from './tooltip';


type Props = {
  realizedExecutions: RealizedExecutionGroup[],
};

export const PnLTrendPlot = ({realizedExecutions}: Props) => {
  const decimals = 2;

  const realizedSumArray = realizedExecutions.map(({realizedPnLSum}) => realizedPnLSum);
  const maxRealizedSum = Math.max(...realizedSumArray);
  const minRealizedSum = Math.min(...realizedSumArray);

  return (
    <ResponsiveContainer height={300} className={styles['plot']}>
      <LineChart data={realizedExecutions}>
        <CartesianGrid strokeDasharray="3 3" strokeWidth={0.5}/>
        <XAxis
          tickCount={11}
          stroke="#D9D9D9"
          dataKey={({epochSec}: RealizedExecutionGroup) => epochSecToFormattedString(epochSec)}
        />
        <YAxis
          dataKey={({realizedPnLSum}: RealizedExecutionGroup) => realizedPnLSum}
          tickCount={7}
          tickFormatter={(val) => `$${val.toFixed(2)}`}
          stroke="#D9D9D9"
        />
        <Tooltip content={(
          <PnLTrendTooltip
            decimals={decimals}
            maxRealizedSum={maxRealizedSum}
            minRealizedSum={minRealizedSum}
          />
        )}/>
        <ReferenceLine y={0} stroke="#ffffff" opacity={0.8}/>
        <Line
          type="monotone"
          dataKey={({realizedPnLSum}: RealizedExecutionGroup) => realizedPnLSum}
          stroke="#15FEFB"
          dot={false}
          animationDuration={500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
