import {
    Box, BoxProps, createVarsResolver, Flex, getSpacing, MantineRadius, MantineShadow,
    MantineSpacing, Paper, polymorphicFactory, PolymorphicFactory, ScrollArea, StylesApiProps,
    Table, useProps, useStyles
} from '@mantine/core'
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
    padding,
    withBorder,
    children,
    tasks,
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

  return (
    <GanttChartProvider value={{ withBorder, getStyles }}>
      <Paper component="div" ref={ref} withBorder={withBorder} {...getStyles('root')} {...others}>
        <Flex>
          {/* Left side: Task table */}
          <Box
            {...getStyles('taskTable')}
            style={{ width: '300px', borderRight: '1px solid var(--mantine-color-gray-3)' }}
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
            {/* Calendar area */}
            <Box
              {...getStyles('calendarArea')}
              style={{ height: '50px', borderBottom: '1px solid var(--mantine-color-gray-3)' }}
            >
              <ScrollArea>
                <Box style={{ display: 'flex', minWidth: '1000px' }}>
                  {/* Placeholder for calendar days/weeks */}
                  {Array.from({ length: 30 }).map((_, i) => (
                    <Box
                      key={i}
                      style={{
                        width: '30px',
                        textAlign: 'center',
                        borderRight: i < 29 ? '1px solid var(--mantine-color-gray-2)' : 'none',
                      }}
                    >
                      {i + 1}
                    </Box>
                  ))}
                </Box>
              </ScrollArea>
            </Box>

            {/* Tasks area */}
            <Box {...getStyles('tasksArea')}>
              <ScrollArea>
                <Box style={{ minWidth: '1000px' }}>
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
              </ScrollArea>
            </Box>
          </Box>
        </Flex>
        {children}
      </Paper>
    </GanttChartProvider>
  );
});

GanttChart.classes = classes;
GanttChart.displayName = '@mantine/core/GanttChart';
GanttChart.Section = GanttChartSection;
