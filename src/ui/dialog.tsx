
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from "primereact/inputtextarea";
import {  ByodSampleChart } from "./Chart";
import { EChartsOption } from "echarts";

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


export const AiPrompt=({ visible, reset, getData }: any)=> {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const [selected, setSelected] = useState(null);
  const [viz, setViz] = useState(null);
  const [value, setValue] = useState(null);
  const [chat, setChat] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const getOptions =(_e: any)=>{
    setChat(value);
    return;
  }
  const onClick =()=>{

    getData({
        selected: selected,
        value: `<div>${data}<img width="200" height="150" src="${viz?viz:''}"/></div>`
    });
    setValue(null);
    setSelected(null);
  }
  useEffect(()=>{
    const fetchData = async () => {
        try {
            if(chat){
                const response = await fetch('http://192.168.1.72:5000/byodai/ask', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({ 
                        prompt: chat 
                    }), 
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const result = await response.json(); 
                setData(result?.response);
            }
        } 
        catch (err: any) {
          setError(err.message);
        } 
        finally {
          setLoading(false);
        }
      };
    fetchData();
  },[chat])
  console.log("loading:",loading,"error:",error)
  console.log("data:",data)
    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                modal
                onHide={() => {if (!visible) return; reset(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="question" className="text-primary-50 font-semibold">
                                AI Type
                            </label>
                            <Dropdown id="question" value={selected} onChange={(e) => setSelected(e.value)} options={questions} optionLabel="name" 
                placeholder="Select AI type" className="w-full md:w-14rem" />
                        </div>                        
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="query" className="text-primary-50 font-semibold">
                                Query
                            </label>
                            <InputTextarea id="query" placeholder="Message to send for querying" className="bg-white-alpha-20 border-none p-3 text-primary-50" value={value??''} onChange={(e) => setValue(e.target.value as any)} rows={5} cols={30} />
                        </div>
                        <Button label="Send" onClick={ getOptions } text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        {data?(<ByodSampleChart ref={ chartRef } options={ data } getImage={ getImage }/>):null}
                        <div className="flex align-items-center gap-2">
                            <Button label="Save" onClick={(e) => {hide(e); onClick(); return; }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
        