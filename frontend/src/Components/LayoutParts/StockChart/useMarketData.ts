import { useEffect, useRef, useState } from 'react';
import { tsvParse } from 'd3-dsv';
import { timeParse } from 'd3-time-format';

const parseDate = timeParse('%Y-%m-%d');

const parseData = () => (d: any) => {
  const date = parseDate(d.date);
  date ? (d.date = new Date(date)) : (d.date = new Date(Number(d.date)));

  for (const key in d) {
    if (key !== 'date' && Object.prototype.hasOwnProperty.call(d, key)) {
      d[key] = +d[key];
    }
  }

  return d;
};

const useInterval = (callback: any, delay: any) => {
  const intervalRef: any = useRef(null);
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      if (!intervalRef?.current) return;
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
    return;
  }, [delay]);
  return intervalRef;
};

export function useMarketData(dataSet = 'MINUTES', updating = false) {
  const [data, setData] = useState<any>();
  const [length, setLength] = useState(500);

  useEffect(() => {
    if (!data) {
      fetch(
        `https://raw.githubusercontent.com/reactivemarkets/react-financial-charts/master/packages/stories/src/data/${dataSet}.tsv`
      )
        .then((response) => response.text())
        .then((data) => tsvParse(data, parseData()))
        .then((data) => {
          setData(data);
        });
    }
  }, [data, dataSet, setData]);

  useInterval(() => {
    if (data && updating) setLength(length + 1);
  }, 1000);

  return {
    data: updating ? data?.slice(0, length + 1) : data,
    loaded: Boolean(data),
  };
}
