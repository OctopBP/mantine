import { Children, cloneElement } from 'react'
import {
    BoxProps, createVarsResolver, getSpacing, MantineRadius, MantineShadow, MantineSpacing,
    polymorphicFactory, PolymorphicFactory, StylesApiProps, useProps, useStyles
} from '../../core'
import { Paper } from '../Paper'
import { GanttChartProvider } from './GanttChart.context'
import classes from './GanttChart.module.css'
import { GanttChartSection } from './GanttChartSection/GanttChartSection'

export type GanttChartStylesNames = 'root' | 'section';
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

  const _children = Children.toArray(children);
  const content = _children.map((child, index) => {
    if (typeof child === 'object' && child && 'type' in child && child.type === GanttChartSection) {
      return cloneElement(child, {
        'data-first-section': index === 0 || undefined,
        'data-last-section': index === _children.length - 1 || undefined,
      } as any);
    }

    return child;
  });

  return (
    <GanttChartProvider value={{ withBorder, getStyles }}>
      <Paper component="div" ref={ref} withBorder={withBorder} {...getStyles('root')} {...others}>
        {content}
      </Paper>
    </GanttChartProvider>
  );
});

GanttChart.classes = classes;
GanttChart.displayName = '@mantine/core/GanttChart';
GanttChart.Section = GanttChartSection;
