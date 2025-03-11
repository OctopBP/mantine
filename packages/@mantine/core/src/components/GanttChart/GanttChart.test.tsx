import { tests } from '@mantine-tests/core'
import { GanttChart, GanttChartProps, GanttChartStylesNames } from './GanttChart'
import { GanttChartSection } from './GanttChartSection/GanttChartSection'

const defaultProps: GanttChartProps = {};

describe('@mantine/core/GanttChart', () => {
  tests.itSupportsSystemProps<GanttChartProps, GanttChartStylesNames>({
    component: GanttChart,
    props: defaultProps,
    mod: true,
    polymorphic: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@mantine/core/GanttChart',
    stylesApiSelectors: ['root', 'section'],
  });

  it('exports GanttChart.Section component', () => {
    expect(GanttChart.Section).toBe(GanttChartSection);
  });
});
