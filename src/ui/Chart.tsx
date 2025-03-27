import {
    useRef,
    useEffect,
    useMemo,
    forwardRef,
    useImperativeHandle,
    useLayoutEffect,
    useCallback,
    Ref,
    FC,
    HTMLAttributes,
	useState,
  } from 'react';
import { useECharts, UseEChartsOptions } from '@kbox-labs/react-echarts';

export type EChartProps = UseEChartsOptions &
	Omit<
		HTMLAttributes<HTMLDivElement>,
		keyof UseEChartsOptions | EChartsEventProp
	>

import { use, init, EChartsType } from 'echarts/core';
import {
    SankeyChart,
    PieChart,
    BarChart,
    FunnelChart,
    GaugeChart,
    GraphChart,
    LineChart,
    ScatterChart,
    RadarChart,
    BoxplotChart,
    TreeChart,
    TreemapChart,
    HeatmapChart,
    SunburstChart,
} from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import {
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    LegendComponent,
    DataZoomComponent,
    ToolboxComponent,
    GraphicComponent,
    AriaComponent,
    MarkAreaComponent,
    MarkLineComponent,
} from 'echarts/components';
import { LabelLayout } from 'echarts/features';
import { EChartsEventProp, EchartsHandler, EchartsProps, EchartsStylesProps } from './Types';
import { Card } from 'primereact/card';
      
      const Styles: FC<EchartsStylesProps> = ({ height, width, children }) => {
        return (
          <Card
            style={{
              height: height,
              width: width,
            }}
          >
            {children}
          </Card>
        );
      };
      
      use([
        CanvasRenderer,
        BarChart,
        BoxplotChart,
        FunnelChart,
        GaugeChart,
        GraphChart,
        HeatmapChart,
        LineChart,
        PieChart,
        RadarChart,
        SankeyChart,
        ScatterChart,
        SunburstChart,
        TreeChart,
        TreemapChart,
        AriaComponent,
        DataZoomComponent,
        GraphicComponent,
        GridComponent,
        MarkAreaComponent,
        MarkLineComponent,
        LegendComponent,
        ToolboxComponent,
        TooltipComponent,
        VisualMapComponent,
        LabelLayout,
      ]);
  
export const ByodChart = forwardRef((
    {
      width,
      height,
      echartOptions,
      eventHandlers,
      zrEventHandlers,
      selectedValues = {},
      refs,
    }: EchartsProps,
    ref: Ref<EchartsHandler>,
  ) =>{
        const divRef = useRef<HTMLDivElement | null >(null);
        if (refs) {
          // eslint-disable-next-line no-param-reassign
          refs.divRef = divRef;
        }
        const chartRef = useRef<EChartsType | null >(null);
        const currentSelection = useMemo(
          () => Object.keys(selectedValues) || [],
          [selectedValues],
        );
        const previousSelection = useRef<string[]>([]);
      
        useImperativeHandle(ref, () => ({
          getEchartInstance: () => chartRef.current,
        }));
      
        useEffect(() => {
          if (!divRef.current) return;
          if (!chartRef.current) {
            chartRef.current = init(divRef.current);
          }
      
          Object.entries(eventHandlers || {}).forEach(([name, handler]) => {
            chartRef.current?.off(name);
            chartRef.current?.on(name, handler);
          });
      
          Object.entries(zrEventHandlers || {}).forEach(([name, handler]) => {
            chartRef.current?.getZr().off(name);
            chartRef.current?.getZr().on(name, handler);
          });
      
          chartRef.current.setOption(echartOptions, true);
        }, [echartOptions, eventHandlers, zrEventHandlers]);
      
        // highlighting
        useEffect(() => {
          if (!chartRef.current) return;
          chartRef.current.dispatchAction({
            type: 'downplay',
            dataIndex: previousSelection.current.filter(
              value => !currentSelection.includes(value),
            ),
          });
          if (currentSelection.length) {
            chartRef.current.dispatchAction({
              type: 'highlight',
              dataIndex: currentSelection,
            });
          }
          previousSelection.current = currentSelection;
        }, [currentSelection]);
      
        const handleSizeChange = useCallback(
          ({ width, height }: { width: number; height: number }) => {
            if (chartRef.current) {
              chartRef.current.resize({ width, height });
            }
          },
          [],
        );
      
        // did mount
        useEffect(() => {
          handleSizeChange({ width, height });
          return () => chartRef.current?.dispose();
        }, []);
      
        useLayoutEffect(() => {
          handleSizeChange({ width, height });
        }, [width, height, handleSizeChange]);     
      
return(
        <Styles height={width} width={width} ref={ divRef }/>
    )
})

export interface ExtraEChartProps extends EChartProps {
  getImage?: (e: any)=>any;
}
/**
 * EChart component that wraps ECharts functionality in a React component
 *
 * @example
 * ```tsx
 * <EChart
 *   style={{ height: '400px' }}
 *   xAxis={{ type: 'category', data: ['A', 'B', 'C'] }}
 *   yAxis={{ type: 'value' }}
 *   series={[{ type: 'bar', data: [1, 2, 3] }]}
 * />
 * ```
 */
export const EChart: FC<ExtraEChartProps> = ({
	// Initialization options
	devicePixelRatio,
	height,
	locale,
	pointerSize,
	renderer,
	theme,
	use,
	useCoarsePointer,
	useDirtyRect,
	width,

	// ECharts instance options
	group,

	// SetOption options
	lazyUpdate,
	notMerge,
	replaceMerge,
	silent,
	transition,
	darkMode,
	media,
	options,
	stateAnimation,

	// Chart options
	angleAxis,
	animation,
	animationDelay,
	animationDelayUpdate,
	animationDuration,
	animationDurationUpdate,
	animationEasing,
	animationEasingUpdate,
	animationThreshold,
	aria,
	axisPointer,
	backgroundColor,
	blendMode,
	brush,
	calendar,
	color,
	dataZoom,
	dataset,
	geo,
	graphic,
	grid,
	hoverLayerThreshold,
	legend,
	parallel,
	parallelAxis,
	polar,
	progressive,
	progressiveThreshold,
	radar,
	radiusAxis,
	series,
	singleAxis,
	textStyle,
	timeline,
	title,
	toolbox,
	tooltip,
	useUTC,
	visualMap,
	xAxis,
	yAxis,

	// Event handlers
	onAxisAreaSelected,
	onBrush,
	onBrushEnd,
	onBrushSelected,
	onClick,
	onContextMenu,
	onDataRangeSelected,
	onDataViewChanged,
	onDataZoom,
	onDoubleClick,
	onDownplay,
	onFinished,
	onGeoSelectChanged,
	onGeoSelected,
	onGeoUnselected,
	onGlobalCursorTaken,
	onGlobalOut,
	onHighlight,
	onLegendInverseSelect,
	onLegendScroll,
	onLegendSelectChanged,
	onLegendSelected,
	onLegendUnselected,
	onMagicTypeChanged,
	onMouseDown,
	onMouseMove,
	onMouseOut,
	onMouseOver,
	onRendered,
	onRestore,
	onSelectChanged,
	onTimelineChanged,
	onTimelinePlayChanged,
    getImage,
	...rest
},) => {
	// Use ECharts hook
	const [ref,echartsInstance] = useECharts<HTMLDivElement>({
		// Initialization options
		devicePixelRatio,
		height,
		locale,
		pointerSize,
		renderer,
		theme,
		use,
		useCoarsePointer,
		useDirtyRect,
		width,

		// ECharts instance options
		group,

		// SetOption options
		lazyUpdate,
		notMerge,
		replaceMerge,
		silent,
		transition,
		darkMode,
		media,
		options,
		stateAnimation,

		// Chart options
		angleAxis,
		animation,
		animationDelay,
		animationDelayUpdate,
		animationDuration,
		animationDurationUpdate,
		animationEasing,
		animationEasingUpdate,
		animationThreshold,
		aria,
		axisPointer,
		backgroundColor,
		blendMode,
		brush,
		calendar,
		color,
		dataZoom,
		dataset,
		geo,
		graphic,
		grid,
		hoverLayerThreshold,
		legend,
		parallel,
		parallelAxis,
		polar,
		progressive,
		progressiveThreshold,
		radar,
		radiusAxis,
		series,
		singleAxis,
		textStyle,
		timeline,
		title,
		toolbox,
		tooltip,
		useUTC,
		visualMap,
		xAxis,
		yAxis,

		// Event handlers
		onAxisAreaSelected,
		onBrush,
		onBrushEnd,
		onBrushSelected,
		onClick,
		onContextMenu,
		onDataRangeSelected,
		onDataViewChanged,
		onDataZoom,
		onDoubleClick,
		onDownplay,
		onFinished,
		onGeoSelectChanged,
		onGeoSelected,
		onGeoUnselected,
		onGlobalCursorTaken,
		onGlobalOut,
		onHighlight,
		onLegendInverseSelect,
		onLegendScroll,
		onLegendSelectChanged,
		onLegendSelected,
		onLegendUnselected,
		onMagicTypeChanged,
		onMouseDown,
		onMouseMove,
		onMouseOut,
		onMouseOver,
		onRendered,
		onRestore,
		onSelectChanged,
		onTimelineChanged,
		onTimelinePlayChanged,
	})
    useEffect(() => {
        if(echartsInstance ){
            getImage?.(echartsInstance.getDataURL()); 
			console.log("echartsInstance:",echartsInstance.getDom())   
        }
      }, [echartsInstance, ref, getImage]);
	return <div {...rest} ref={ref} />
}

export const ByodSampleChart = ({  onFinished, getImage,options }:any)=> {
    return (
        <div  className='card w-full'>
            <EChart
                style={{
					height: '200px',
					width: '100%'
                }}
			    xAxis={ options?.xAxis}
				yAxis={ options?.yAxis}
                onFinished={  onFinished }
                getImage={ getImage }
				series={ options?.series }
				tooltip={ options?.tooltip}
				label={ options?.label}
            />
        </div>
    )
  }