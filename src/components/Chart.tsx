import { memo } from 'react';

import { stringToRGB } from '@/utils';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type PieChartProps = {
  data: { label: string; value: number }[];
};

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return <Pie data={chartDataFactory(data)} options={chartOptions} />;
};

const chartOptions = {
  responsive: true,
  plugins: {},
} satisfies React.ComponentPropsWithRef<typeof Pie>['options'];

const chartDataFactory = (payload: PieChartProps['data']) => {
  const [labels, data] = payload.reduce(
    (acc, { label, value }) => {
      acc[0].push(label);
      acc[1].push(value);
      return acc;
    },
    [[], []] as [string[], number[]]
  );

  return {
    labels,
    datasets: [
      {
        data,
        label: '# of Votes',
        borderWidth: 1,
        borderColor: labels.map((label) => stringToRGB(label, 1)),
        backgroundColor: labels.map((label) => stringToRGB(label, 0.2)),
      },
    ],
  };
};

export default memo(PieChart);
