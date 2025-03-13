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
  presentation?: GanttChartPresentation;

  /** Called when presentation mode changes */
  onPresentationChange?: (presentation: GanttChartPresentation) => void;

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
  presentation: 'month',
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
    presentation: controlledPresentation,
    onPresentationChange,
    children,
    ...others
  } = props;

  const [uncontrolledPresentation, setUncontrolledPresentation] =
    useState<GanttChartPresentation>('month');
  const presentation = controlledPresentation ?? uncontrolledPresentation;
  const handlePresentationChange = (value: string | null) => {
    if (value) {
      if (onPresentationChange) {
        onPresentationChange(value as GanttChartPresentation);
      } else {
        setUncontrolledPresentation(value as GanttChartPresentation);
      }
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
                        style={{
                          left: `${task.startDate.getDate() * 40}px`,
                          width: `${(task.endDate.getDate() - task.startDate.getDate() + 1) * 40}px`,
                        }}
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
