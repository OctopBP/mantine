import { useState } from 'react';
import {
  Box,
  BoxProps,
  createVarsResolver,
  Flex,
  getSpacing,
  MantineColor,
  MantineRadius,
  MantineShadow,
  MantineSpacing,
  Paper,
  polymorphicFactory,
  PolymorphicFactory,
  ScrollArea,
  Select,
  StylesApiProps,
  Table,
  Text,
  useProps,
  useStyles,
} from '@mantine/core';
import { Day } from '@mantine/dates';
import { GanttChartProvider } from './GanttChart.context';
import { GanttChartSection } from './GanttChartSection/GanttChartSection';
import classes from './GanttChart.module.css';

export type GanttChartPresentation = 'hours' | 'day' | 'week' | 'month' | 'year' | '5years';

export interface Task {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  color?: MantineColor;
}

export type GanttChartStylesNames =
  | 'root'
  | 'section'
  | 'taskTable'
  | 'calendarArea'
  | 'calendarHeader'
  | 'tasksArea'
  | 'rightSection'
  | 'scrollContainer'
  | 'calendarDays'
  | 'taskRow'
  | 'taskBlock'
  | 'presentationSelect'
  | 'timelineItem'
  | 'currentPeriod';

export type GanttChartCssVariables = {
  root: '--gantt-chart-padding';
};

export interface GanttChartProps extends BoxProps, StylesApiProps<GanttChartFactory> {
  /** Key of `theme.shadows` or any valid CSS value to set `box-shadow`, `none` by default */
  shadow?: MantineShadow;

  /** Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem, `theme.defaultRadius` by default */
  radius?: MantineRadius;

  /** Controls `padding`, key of `theme.spacing` or any valid CSS value, `'md'` by default */
  padding?: MantineSpacing;

  /** Determines whether the card should have border, `false` by default */
  withBorder?: boolean;

  /** List of tasks to display in the Gantt chart */
  data?: Task[];

  /** Current presentation mode, `'month'` by default */
  defaultPresentation?: GanttChartPresentation;

  /** GanttChart content */
  children?: React.ReactNode;
}

export type GanttChartFactory = PolymorphicFactory<{
  props: GanttChartProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: GanttChartStylesNames;
  vars: GanttChartCssVariables;
  staticComponents: {
    Section: typeof GanttChartSection;
  };
}>;

const defaultProps: Partial<GanttChartProps> = {
  padding: 'md',
  defaultPresentation: 'month',
};

const varsResolver = createVarsResolver<GanttChartFactory>((_, { padding }) => ({
  root: {
    '--gantt-chart-padding': getSpacing(padding),
  },
}));

const presentationOptions = [
  { value: 'hours', label: 'Hours' },
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
  { value: '5years', label: '5 Years' },
];

const getTimelineData = (presentation: GanttChartPresentation) => {
  const today = new Date();
  const timeline = [];

  switch (presentation) {
    case 'hours':
      // Generate 24 hours
      for (let i = 0; i < 24; i++) {
        const date = new Date();
        date.setHours(i, 0, 0, 0);
        timeline.push({
          date,
          label: `${i.toString().padStart(2, '0')}:00`,
        });
      }
      break;

    case 'day':
      // Generate next 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        timeline.push({
          date,
          label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        });
      }
      break;

    case 'week':
      // Generate 4 weeks
      for (let i = 0; i < 4; i++) {
        const startDate = new Date(today);
        startDate.setDate(today.getDate() + i * 7);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        timeline.push({
          date: startDate,
          label: `Week ${i + 1}`,
          subLabel: `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
        });
      }
      break;

    case 'month':
      // Generate 12 months
      for (let i = 0; i < 12; i++) {
        const date = new Date(today.getFullYear(), i);
        timeline.push({
          date,
          label: date.toLocaleDateString('en-US', { month: 'short' }),
        });
      }
      break;

    case 'year':
      // Generate 5 years
      for (let i = 0; i < 5; i++) {
        const date = new Date(today.getFullYear() + i);
        timeline.push({
          date,
          label: date.getFullYear().toString(),
        });
      }
      break;

    case '5years':
      // Generate 25 years in 5-year groups
      for (let i = 0; i < 5; i++) {
        const startYear = today.getFullYear() + i * 5;
        const endYear = startYear + 4;
        timeline.push({
          date: new Date(startYear),
          label: `${startYear}-${endYear}`,
        });
      }
      break;
  }

  return timeline;
};

export const GanttChart = polymorphicFactory<GanttChartFactory>((_props, ref) => {
  const props = useProps('GanttChart', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    shadow,
    radius,
    padding,
    withBorder,
    data = [],
    defaultPresentation = 'month',
    children,
    ...others
  } = props;

  const [presentation, setPresentation] = useState<GanttChartPresentation>(defaultPresentation);
  const handlePresentationChange = (value: string | null) => {
    if (value) {
      setPresentation(value as GanttChartPresentation);
    }
  };

  const getStyles = useStyles<GanttChartFactory>({
    name: 'GanttChart',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const timelineData = getTimelineData(presentation);

  const renderTimelineItem = (item: { date: Date; label: string; subLabel?: string }) => {
    switch (presentation) {
      case 'hours':
        return (
          <Box {...getStyles('timelineItem')}>
            <Text size="sm" fw={500}>
              {item.label}
            </Text>
          </Box>
        );

      case 'day':
        return (
          <Day
            date={item.date}
            size="sm"
            static
            highlightToday
            weekend={item.date.getDay() === 0 || item.date.getDay() === 6}
          />
        );

      case 'week':
      case 'month':
        return (
          <Box {...getStyles('timelineItem')}>
            <Text size="sm" fw={500}>
              {item.label}
            </Text>
            {item.subLabel && (
              <Text size="xs" c="dimmed">
                {item.subLabel}
              </Text>
            )}
          </Box>
        );

      case 'year':
      case '5years':
        return (
          <Box {...getStyles('timelineItem')}>
            <Text size="sm" fw={500}>
              {item.label}
            </Text>
          </Box>
        );

      default:
        return null;
    }
  };

  const getCurrentPeriodLabel = () => {
    const today = new Date();
    let startYear: number;
    switch (presentation) {
      case 'hours':
        return today.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        });
      case 'day':
        return today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      case 'week':
        return today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      case 'month':
        return today.getFullYear().toString();
      case 'year':
        return today.getFullYear().toString();
      case '5years':
        startYear = Math.floor(today.getFullYear() / 5) * 5;
        return `${startYear}-${startYear + 4}`;
      default:
        return '';
    }
  };

  const getTaskBlockStyle = (task: Task) => {
    const timelineStart = timelineData[0].date;
    const itemWidth = 40; // Width of each timeline item

    let startPosition = 0;
    let duration = 0;
    let startYear: number;
    let taskStartYear: number;
    let taskEndYear: number;

    switch (presentation) {
      case 'hours':
        startPosition = (task.startDate.getHours() - timelineStart.getHours()) * itemWidth;
        duration = (task.endDate.getHours() - task.startDate.getHours() + 1) * itemWidth;
        break;

      case 'day':
        startPosition = (task.startDate.getDate() - timelineStart.getDate()) * itemWidth;
        duration = (task.endDate.getDate() - task.startDate.getDate() + 1) * itemWidth;
        break;

      case 'week':
        startPosition =
          Math.floor(
            (task.startDate.getTime() - timelineStart.getTime()) / (7 * 24 * 60 * 60 * 1000)
          ) * itemWidth;
        duration =
          Math.ceil(
            (task.endDate.getTime() - task.startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
          ) * itemWidth;
        break;

      case 'month':
        startPosition = (task.startDate.getMonth() - timelineStart.getMonth()) * itemWidth;
        duration = (task.endDate.getMonth() - task.startDate.getMonth() + 1) * itemWidth;
        break;

      case 'year':
        startPosition = (task.startDate.getFullYear() - timelineStart.getFullYear()) * itemWidth;
        duration = (task.endDate.getFullYear() - task.startDate.getFullYear() + 1) * itemWidth;
        break;

      case '5years':
        startYear = Math.floor(timelineStart.getFullYear() / 5) * 5;
        taskStartYear = Math.floor(task.startDate.getFullYear() / 5) * 5;
        taskEndYear = Math.floor(task.endDate.getFullYear() / 5) * 5;
        startPosition = ((taskStartYear - startYear) / 5) * itemWidth;
        duration = ((taskEndYear - taskStartYear) / 5 + 1) * itemWidth;
        break;
    }

    return {
      left: `${startPosition}px`,
      width: `${duration}px`,
    };
  };

  return (
    <GanttChartProvider value={{ data, getStyles }}>
      <Paper
        ref={ref}
        {...getStyles('root')}
        shadow={shadow}
        radius={radius}
        withBorder={withBorder}
        {...others}
      >
        <Flex>
          {/* Left side: Task table */}
          <Box {...getStyles('taskTable')}>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Task Name</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.map((task) => (
                  <Table.Tr key={task.id}>
                    <Table.Td>{task.title}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>

          {/* Right side: Calendar and task blocks */}
          <Box {...getStyles('rightSection')}>
            <Box {...getStyles('calendarHeader')}>
              <Text size="sm" fw={500} {...getStyles('currentPeriod')}>
                {getCurrentPeriodLabel()}
              </Text>
              <Select
                {...getStyles('presentationSelect')}
                data={presentationOptions}
                value={presentation}
                onChange={handlePresentationChange}
                size="xs"
              />
            </Box>
            <ScrollArea>
              <Box {...getStyles('scrollContainer')}>
                {/* Calendar area */}
                <Box {...getStyles('calendarArea')}>
                  {/* Timeline days */}
                  <Box {...getStyles('calendarDays')}>
                    {timelineData.map((item, i) => (
                      <Box key={i} {...getStyles('timelineItem')}>
                        {renderTimelineItem(item)}
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Tasks area */}
                <Box {...getStyles('tasksArea')}>
                  {data.map((task) => (
                    <Box key={task.id} {...getStyles('taskRow')}>
                      <Box
                        {...getStyles('taskBlock')}
                        data-mantine-color={task.color}
                        style={getTaskBlockStyle(task)}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </ScrollArea>
          </Box>
        </Flex>
      </Paper>
    </GanttChartProvider>
  );
});

GanttChart.classes = classes;
GanttChart.displayName = '@mantine/core/GanttChart';
GanttChart.Section = GanttChartSection;
