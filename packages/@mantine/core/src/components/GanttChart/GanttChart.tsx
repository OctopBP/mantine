import {
    Box, BoxProps, createVarsResolver, Flex, getSpacing, MantineRadius, MantineShadow,
    MantineSpacing, Paper, polymorphicFactory, PolymorphicFactory, ScrollArea, StylesApiProps,
    Table, useProps, useStyles
} from '@mantine/core'
import { Day } from '@mantine/dates'
import { GanttChartProvider } from './GanttChart.context'
import classes from './GanttChart.module.css'
import { GanttChartSection } from './GanttChartSection/GanttChartSection'

export type GanttChartStylesNames =
  | 'root'
  | 'section'
  | 'taskTable'
  | 'calendarArea'
  | 'tasksArea'
  | 'rightSection';

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
  tasks?: any[];

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
};

const varsResolver = createVarsResolver<GanttChartFactory>((_, { padding }) => ({
  root: {
    '--gantt-chart-padding': getSpacing(padding),
  },
}));

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
    tasks = [],
    children,
    ...others
  } = props;

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

  // Generate dates for the calendar (current month)
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const calendarDays = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(today.getFullYear(), today.getMonth(), i + 1)
  );

  return (
    <GanttChartProvider value={{ tasks }}>
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
          <Box
            {...getStyles('taskTable')}
            style={{
              width: '200px',
              borderRight: '1px solid var(--mantine-color-gray-3)',
            }}
          >
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Task Name</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {/* Placeholder for task rows */}
                <Table.Tr>
                  <Table.Td>Task 1</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Task 2</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Task 3</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Box>

          {/* Right side: Calendar and task blocks */}
          <Box {...getStyles('rightSection')} style={{ flex: 1 }}>
            <ScrollArea>
              <Box style={{ minWidth: '1000px' }}>
                {/* Calendar area */}
                <Box
                  {...getStyles('calendarArea')}
                  style={{
                    borderBottom: '1px solid var(--mantine-color-gray-3)',
                    display: 'flex',
                    alignItems: 'center',
                    height: '50px',
                  }}
                >
                  {/* Calendar days using Day component */}
                  <Box style={{ display: 'flex' }}>
                    {calendarDays.map((date, i) => (
                      <Day
                        key={i}
                        date={date}
                        size="sm"
                        static
                        weekend={date.getDay() === 0 || date.getDay() === 6}
                        highlightToday
                      />
                    ))}
                  </Box>
                </Box>

                {/* Tasks area */}
                <Box {...getStyles('tasksArea')}>
                  {/* Placeholder for task blocks */}
                  <Box
                    style={{
                      height: '40px',
                      position: 'relative',
                      borderBottom: '1px solid var(--mantine-color-gray-2)',
                    }}
                  >
                    <Box
                      style={{
                        position: 'absolute',
                        left: '60px',
                        width: '120px',
                        height: '30px',
                        background: 'var(--mantine-color-blue-5)',
                        borderRadius: '4px',
                        margin: '5px 0',
                      }}
                    />
                  </Box>
                  <Box
                    style={{
                      height: '40px',
                      position: 'relative',
                      borderBottom: '1px solid var(--mantine-color-gray-2)',
                    }}
                  >
                    <Box
                      style={{
                        position: 'absolute',
                        left: '150px',
                        width: '90px',
                        height: '30px',
                        background: 'var(--mantine-color-green-5)',
                        borderRadius: '4px',
                        margin: '5px 0',
                      }}
                    />
                  </Box>
                  <Box
                    style={{
                      height: '40px',
                      position: 'relative',
                      borderBottom: '1px solid var(--mantine-color-gray-2)',
                    }}
                  >
                    <Box
                      style={{
                        position: 'absolute',
                        left: '30px',
                        width: '180px',
                        height: '30px',
                        background: 'var(--mantine-color-orange-5)',
                        borderRadius: '4px',
                        margin: '5px 0',
                      }}
                    />
                  </Box>
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
