import React from 'react';
import { format } from 'd3-format';
import {
  functor,
  GenericChartComponent,
  last,
} from '@react-financial-charts/core';
import {
  ToolTipText,
  ToolTipTSpanLabel,
} from '@react-financial-charts/tooltip';

const displayTextsDefault = {
  o: 'O: ',
  h: ' H: ',
  l: ' L: ',
  c: ' C: ',
  na: ' n/a ',
  v: ' \xa0 Vol: ',
};

const Tooltip: React.FC<any> = (props: any) => {
  const renderSVG = (moreProps: any) => {
    const {
      accessor = (d: any) => d,
      changeFormat = format('+.2f'),
      className = 'react-financial-charts-tooltip-hover',
      displayTexts = displayTextsDefault,
      displayValuesFor = (_: any, anyProp: any) => anyProp.currentItem,
      fontFamily = "-apple-system, system-ui, 'Helvetica Neue', Ubuntu, sans-serif",
      fontSize = '12px',
      fontWeight = 300,
      labelFill = '#9EAAC7',
      labelFontWeight = 300,
      ohlcFormat = format('.2f'),
      onClick = null,
      origin = [0, 0],
      percentFormat = format('+.2%'),
      textFill = null,
      volumeFormat = format('.4s'),
    } = props;

    const {
      chartConfig: { width, height },
      fullData,
    } = moreProps;

    const _a = displayValuesFor(props, moreProps);
    const currentItem = _a !== null && _a !== void 0 ? _a : last(fullData);

    let open = displayTexts.na;
    let high = displayTexts.na;
    let low = displayTexts.na;
    let close = displayTexts.na;
    let change = displayTexts.na;
    let volume = displayTexts.na;

    if (currentItem !== undefined && accessor !== undefined) {
      const item = accessor(currentItem);
      if (item !== undefined) {
        open = ohlcFormat(item.open);
        high = ohlcFormat(item.high);
        low = ohlcFormat(item.low);
        close = ohlcFormat(item.close);
        change = `${changeFormat(item.close - item.open)} (${percentFormat(
          (item.close - item.open) / item.open
        )})`;
        volume = volumeFormat(item.volume);
      }
    }

    const [x, y] = functor(origin)(width, height);
    const valueFill = functor(textFill)(currentItem);

    return (
      <g
        className={className}
        transform={`translate(${x}, ${y})`}
        onClick={onClick}
      >
        <ToolTipText
          x={0}
          y={0}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
        >
          <ToolTipTSpanLabel
            fill={labelFill}
            fontWeight={labelFontWeight}
            key="label_O"
          >
            {displayTexts.o}
          </ToolTipTSpanLabel>
          <tspan key="value_O" fill={valueFill}>
            {open}
          </tspan>
          <ToolTipTSpanLabel
            fill={labelFill}
            fontWeight={labelFontWeight}
            key="label_H"
          >
            {displayTexts.h}
          </ToolTipTSpanLabel>
          <tspan key="value_H" fill={valueFill}>
            {high}
          </tspan>
          <ToolTipTSpanLabel
            fill={labelFill}
            fontWeight={labelFontWeight}
            key="label_L"
          >
            {displayTexts.l}
          </ToolTipTSpanLabel>
          <tspan key="value_L" fill={valueFill}>
            {low}
          </tspan>
          <ToolTipTSpanLabel
            fill={labelFill}
            fontWeight={labelFontWeight}
            key="label_C"
          >
            {displayTexts.c}
          </ToolTipTSpanLabel>
          <tspan key="value_C" fill={valueFill}>
            {close}
          </tspan>
          <tspan key="value_Change" fill={valueFill}>
            {` ${change}`}
          </tspan>

          <ToolTipTSpanLabel
            fill={labelFill}
            fontWeight={labelFontWeight}
            key="label_V"
          >
            {displayTexts.v}
          </ToolTipTSpanLabel>
          <tspan key="value_V" fill={valueFill}>
            {volume}
          </tspan>
        </ToolTipText>
      </g>
    );
  };

  return (
    <GenericChartComponent
      clip={false}
      svgDraw={renderSVG}
      drawOn={['mousemove']}
    />
  );
};

export default Tooltip;
