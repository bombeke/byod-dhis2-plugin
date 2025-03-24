import { EChartsCoreOption, EChartsType } from "echarts/core";
import { ReactNode, Ref, RefObject } from "react";

export type EChartsEventProp =
	| 'onAxisAreaSelected'
	| 'onBrush'
	| 'onBrushEnd'
	| 'onBrushSelected'
	| 'onClick'
	| 'onContextMenu'
	| 'onDataRangeSelected'
	| 'onDataViewChanged'
	| 'onDataZoom'
	| 'onDoubleClick'
	| 'onDownplay'
	| 'onFinished'
	| 'onGeoSelectChanged'
	| 'onGeoSelected'
	| 'onGeoUnselected'
	| 'onGlobalCursorTaken'
	| 'onGlobalOut'
	| 'onHighlight'
	| 'onLegendInverseSelect'
	| 'onLegendScroll'
	| 'onLegendSelectChanged'
	| 'onLegendSelected'
	| 'onLegendUnselected'
	| 'onMagicTypeChanged'
	| 'onMouseDown'
	| 'onMouseMove'
	| 'onMouseOut'
	| 'onMouseOver'
	| 'onRendered'
	| 'onRestore'
	| 'onSelectChanged'
	| 'onTimelineChanged'
	| 'onTimelinePlayChanged'

export type EchartsStylesProps = {
    height: number;
    width: number;
    children?: ReactNode;
    ref?: RefObject<HTMLDivElement | null>;
    className?: string;
};

export type Refs = {
    echartRef?: Ref<EchartsHandler | null>;
    divRef?: RefObject<HTMLDivElement | null>;
  };
  
  export interface EchartsProps {
    height: number;
    width: number;
    echartOptions: EChartsCoreOption;
    eventHandlers?: EventHandlers;
    zrEventHandlers?: EventHandlers;
    selectedValues?: Record<number, string>;
    forceClear?: boolean;
    refs?: Refs;
  }
  
  export interface EchartsHandler {
    getEchartInstance: () => EChartsType | null;
  }

export type EventHandlers = Record<string, { (props: any): void }>;