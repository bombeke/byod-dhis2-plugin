
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from "primereact/inputtextarea";
import {  ByodSampleChart } from "./Chart";
import { EChartsOption } from "echarts";
import { ProgressSpinner } from "primereact/progressspinner";
import omit from 'lodash/omit';
import { AIProps } from "./Type";

const labelRight = {
    position: 'right'
} as const;

export const option: EChartsOption = {
    title: {
        text: 'Bar Chart with Negative Value'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
        type: 'shadow'
        }
    },
    grid: {
        top: 80,
        bottom: 30
    },
    xAxis: {
        type: 'value',
        position: 'top',
        splitLine: {
        lineStyle: {
            type: 'dashed'
        }
        }
    },
    yAxis: {
        type: 'category',
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        data: [
        'ten',
        'nine',
        'eight',
        'seven',
        'six',
        'five',
        'four',
        'three',
        'two',
        'one'
        ]
    },
    series: [
        {
        name: 'Cost',
        type: 'bar',
        stack: 'Total',
        label: {
            show: true,
            formatter: '{b}'
        },
        data: [
            { value: -0.07, label: labelRight },
            { value: -0.09, label: labelRight },
            0.2,
            0.44,
            { value: -0.23, label: labelRight },
            0.08,
            { value: -0.17, label: labelRight },
            0.47,
            { value: -0.36, label: labelRight },
            0.18
        ]
        }
    ]
};


export const AiPromptChartArea =({ getData }: any)=> {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const [selected, setSelected] = useState(null);
  const [viz, setViz] = useState<AIProps | null>(null);
  const [value, setValue] = useState(null);
  const [chat, setChat] = useState(null);
  const [data, setData] = useState(null);
  const [interpret, setInterpret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, _setError] = useState<string | null>(null);
  const questions = [
      { name: 'Text', code: 'TEXT' },
      { name: 'Chart', code: 'CHART' },
      { name: 'Map', code: 'MAP' },
      { name: 'Table', code: 'TABLE' },
      { name: 'AI Image', code: 'AIIMAGE' }
  ];
  const getImage = useCallback((e: any)=>{
    setViz(e);
  },[]);
  const getOptions = useCallback((_e: any)=>{
    setChat(value);
    return;
  },[value])
  const onClick =()=>{
    getData({
        selected: selected,
        value: viz,
        data: data,
        interpret: interpret
    });
    setValue(null);
    setSelected(null);
  
  }
  useEffect(()=>{
    const fetchData = async () => {
        setLoading(true);
        if(chat){
            const response = await fetch(`${import.meta.env.VITE_AI_API}/gateways/ask`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ 
                    //prompt: chat 
                    job: chat,
                    data_source:'database'
                }), 
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json(); 
            console.log("Result:", result);
            if(Object.hasOwn(result,'response')){

                if(typeof result?.response === 'string'){
                    setData(JSON.parse(result?.response));
                }
                else if(typeof result?.response === 'object'){
                    setData(result?.response?.jsonString?.[0]);
                }
                else{
                    setData(result?.response);
                }
            }
            else{
                if(Object.hasOwn(result,'jsonString')){
                    setData(result?.jsonString?.[0]); 
                }
                else{
                    setInterpret(result?.description);
                    setData(result?.config);
                }
            }
            setLoading(false);
        }
        else {
          setLoading(false)
        }
      };
    fetchData();
  },[chat])
    return (
        <div className="card flex w-25rem flex-column md:max-h-[680px] lg:max-h-[728px] px-2 py-2 gap-2 mb-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-100), var(--primary-200))' }}>
            <div className="inline-flex flex-column gap-2">
                <label htmlFor="question" className="text-primary-50 font-semibold">
                    Generate AI
                </label>
                <Dropdown id="question" value={selected} onChange={(e) => setSelected(e.value)} options={questions} optionLabel="name" 
    placeholder="Select AI type" className="w-full md:w-14rem" />
            </div>                        
            <div className="flex flex-column gap-1">
                <label htmlFor="query" className="text-primary-50 font-semibold">
                    <span>
                        Ask Question
                    </span>
                </label>
                <span>
                        Example: Generate [fields:teacher accommodation] case for [location: MCHP]
                </span>
                <InputTextarea 
                    id="query" 
                    placeholder="Message to send for querying" 
                    className="bg-white border-none p-3 text-primary-50" 
                    value={value??''} 
                    onChange={(e) => setValue(e.target.value as any)} 
                    rows={3} 
                    cols={10} 
                />
            </div>
            { loading?(<ProgressSpinner/>):
                (<Button 
                    label="Generate" 
                    onClick={ getOptions } 
                    text 
                    className="p-3 w-8rem ml-10 bg-white border-1 border-white hover:bg-white-alpha-10"/>
                )}
            { 
                data && !loading?(
                    <ByodSampleChart ref={ chartRef } options={ omit(data,'legend') } getImage={ getImage }/>
                ):null
            }
            { interpret && (
                <InputTextarea 
                    id="query_interpretation" 
                    placeholder="" 
                    className="flex h-full bg-white border-none p-3 text-primary-50" 
                    value ={ interpret }
                    rows={2} 
                    cols={10} 
                />
            )}
            { error && (<div>{error}</div>)}
            { (data || interpret) && (
                <div className="flex align-items-center gap-2">
                    <Button 
                        label="Save" 
                        onClick={onClick } 
                        text 
                        className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                    />
                    <Button 
                        label="Cancel" 
                        text 
                        className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                    />
                </div>
            )}
        </div>
    )
}
        