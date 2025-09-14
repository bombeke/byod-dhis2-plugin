import {
    useEffect,
    FC,
    HTMLAttributes,
    useState,
    useCallback,
} from 'react';
import { useECharts, UseEChartsOptions } from '@kbox-labs/react-echarts';
import { EChartsEventProp } from './Types';

export type EChartProps = UseEChartsOptions &
    Omit<
        HTMLAttributes<HTMLDivElement>,
        keyof UseEChartsOptions | EChartsEventProp
    >

export interface ExtraEChartProps extends EChartProps {
    getImage?: (e: any) => any;
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
}) => {
    const [chartRendered, setChartRendered] = useState(false);
    const [ref, echartsInstance] = useECharts<HTMLDivElement>({
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
    });

    const captureImage = useCallback(() => {
        if (echartsInstance && chartRendered) {
            try {
                const imageData = echartsInstance.getDataURL({
                    pixelRatio: 3,
                    backgroundColor: '#fff'
                });
                
                getImage?.({
                    img: imageData,
                    chartInstance: echartsInstance,
                    width: echartsInstance.getWidth(),
                    height: echartsInstance.getHeight()
                });
                
                return imageData;
            } catch (error) {
                console.error('Error capturing chart image:', error);
                return null;
            }
        }
        return null;
    }, [echartsInstance, chartRendered, getImage]);

    useEffect(() => {
        if (echartsInstance) {
            const handleRendered = () => {
                setChartRendered(true);
            };

            echartsInstance.on('rendered', handleRendered);
            
            return () => {
                echartsInstance.off('rendered', handleRendered);
            };
        }
    }, [echartsInstance]);


    useEffect(() => {
        if (chartRendered && getImage) {
            const timer = setTimeout(() => {
                captureImage();
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [chartRendered, getImage, captureImage]);

    useEffect(() => {
        if (echartsInstance && options) {
            echartsInstance.setOption(options as any, {
                notMerge: notMerge,
                lazyUpdate: lazyUpdate,
                replaceMerge: replaceMerge,
                silent: silent,
            });
            setChartRendered(false);
        }
    }, [options, notMerge, lazyUpdate, replaceMerge, silent, echartsInstance]);

    useEffect(() => {
        const handleResize = () => {
            if (echartsInstance) {
                echartsInstance.resize();
                setChartRendered(false);
            }
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [echartsInstance]);

    return <div className="p-2 flex m-2" style={{ minHeight: '270px', minWidth: '150px', width: '95%', height: '95%' }} {...rest} ref={ref} />;
}

export const ByodSampleChart = ({ onFinished, getImage, options }: any) => {
    return (
        <div className='card w-full h-full flex p-2'>
            <EChart
                style={{
                    minHeight: '275px',
                    width: '97%',
                    height: '98%'
                }}
                className='flex p-4'
                options={options} 
                onFinished={onFinished}
                getImage={getImage}
            />
        </div>
    );
}