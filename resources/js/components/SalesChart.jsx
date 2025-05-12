import { BarChart } from '@shopify/polaris-viz';
import { Card,Text } from '@shopify/polaris';
import {SpacingBetween} from './CommanComp';

const SalesChart = ({label}) => {
  const data = [
    {
      name: label,
      data: [
        { key: 'Jan', value: 5000 },
        { key: 'Feb', value: 7000 },
        { key: 'Mar', value: 8000 },
      ],
    },
  ];

  return (
    <Card>
        <Text as="h1" variant="headingLg">{label}</Text>
        <SpacingBetween />
        <BarChart data={data} />
    </Card>
  );
};

export default SalesChart;
