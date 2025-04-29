import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getTrainings } from '../api';
import { groupBy, sumBy } from 'lodash';
import { Training, ChartData } from '../types';

export default function StatisticsPage() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    getTrainings()
      .then((trainings: Training[]) => {
        const grouped = groupBy(trainings, 'activity');
        const chartData = Object.keys(grouped).map((activity) => ({
          activity,
          duration: sumBy(grouped[activity], 'duration'),
        }));
        setData(chartData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ width: '100%', height: 500, marginTop: '40px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="activity" />
          <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="duration" fill="mediumpurple" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
