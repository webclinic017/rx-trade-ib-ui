import React from 'react';

import {IChartApi} from 'lightweight-charts';


export type ChartSetState<T> = (updateFunc: (prevLegend: T) => T) => void;

export type ChartStatefulObjects<L> = {
  legend: L,
};

export type ChartSetStateObjects<L> = ChartStatefulObjects<ChartSetState<L>>;

export type ChartInitCalcObject<T, D> = (data: T) => D;

export type ChartCalcObjects<T, L> = ChartStatefulObjects<ChartInitCalcObject<T, L>>;

export type ChartRenderObject<T, D> = (chartData: T, object: D) => React.ReactNode;

export type ChartRenderObjects<T, L> = ChartStatefulObjects<ChartRenderObject<T, L>>;

export type ChartObjectRef<T> = {
  chartContainer: HTMLDivElement,
  initData: T,
};

export type InitChartPayload<T, L> = {
  chartDataRef: React.MutableRefObject<T>,
  setObject: ChartSetStateObjects<L>,
  chartContainer: HTMLDivElement,
};

export type UseChartPayload<T, R, L> = {
  initChart: ChartInitEventHandler<T, R, L>,
  onDataUpdated: () => void,
};

export type UseChartReturn<T, R, L> = {
  makeChart: (payload: InitChartPayload<T, L>) => void,
  chartRef: React.MutableRefObject<IChartApi | undefined>,
  chartObjectRef: React.MutableRefObject<ChartObjectRef<R> | undefined>,
};

export type OnChartChangedEventCommon<T, L> = {
  chartDataRef: React.MutableRefObject<T>,
  setObject: ChartSetStateObjects<L>,
};

export type OnChartInitEvent<T, L> = InitChartPayload<T, L> & OnChartChangedEventCommon<T, L> & {
  chartRef: React.MutableRefObject<IChartApi | undefined>,
};

export type ChartInitEventHandler<T, R, L> = (e: OnChartInitEvent<T, L>) => R;

export type OnChartDataUpdatedEvent<T, R, L> = OnChartChangedEventCommon<T, L> & {
  initData: R,
};

export type ChartDataUpdatedEventHandler<T, R, L> = (e: OnChartDataUpdatedEvent<T, R, L>) => void;
