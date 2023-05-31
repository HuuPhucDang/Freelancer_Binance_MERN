import React, { useEffect } from 'react';
import { AdvancedChart } from 'react-tradingview-embed';

import { Utils } from '@/Libs';

const CRYPTO_COMPARE =
  '54c69a67adfc783963d3589c5a08a40a5d619b0f22b94b1c79df9acc9129c5ff';
// const GLASSNODE = '1pzEImQbuhq9Qj0LynC5b4oqQog';

const Dashboard: React.FC = () => {
  const theme = Utils.getThemeMode();

  const loadChartData = async () => {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/blockchain/histo/day?fsym=&api_key=${CRYPTO_COMPARE}&limit=30`
    );
    const data = await response.json();
    const bulkData = data.Data.Data;
    const dataArray:
      | ((prevState: never[]) => never[])
      | { x: number; y: number }[] = [];
    bulkData.map(
      (y: {
        time: number;
        transaction_count: number;
        average_transaction_value: number;
      }) =>
        dataArray.push({
          x: y.time * 1000,
          y: y.transaction_count * y.average_transaction_value,
        })
    );
  };

  useEffect(() => {
    loadChartData();
  }, []);

  return (
    <AdvancedChart
      widgetProps={{
        theme,
        // hide_top_toolbar: true,
        hide_side_toolbar: true,
        enable_publishing: false,
        locale: 'vi_VN',
        style: '1',
        symbol: 'BINANCE:BTCUSDT',
        height: '100%',
        // height: '252px'
        // height: "calc(100vh - 460px)",
      }}
    />
  );
};

export default Dashboard;
