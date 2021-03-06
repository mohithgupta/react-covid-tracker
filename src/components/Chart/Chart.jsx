import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => { 
    
    const getinitialdata = async () => {
      
      const initialDailyData = await fetchDailyData();
      setDailyData(initialDailyData);
      // console.log(initialDailyData);
    }

    getinitialdata();
  }, [country]);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered','Deaths', 'Active'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 0, 0.7)',  'rgba(0, 255, 0, 0.7)','rgba(255, 0, 0, 0.7)', 'rgba(0, 0, 255, 0.7)' ],
              data: [confirmed.value, recovered.value, deaths.value, confirmed.value-recovered.value-deaths.value ],
            },
          ],
        }}
        options={{
          responsive:true,
          maintainAspectRatio:true,
          legend: { display: false },
          title: { display: true, text: `Current statistics in ${country}` },
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
              {
                data: dailyData.map((data) => data.confirmed),
                label: 'Infected',
                borderColor: 'rgba(0,0,0,0.8)',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                fill: true,
            },{
                data: dailyData.map((data) => data.deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
            },
          ],
        }}
        options={{
          responsive:true,
          maintainAspectRatio:true,
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Chart;
