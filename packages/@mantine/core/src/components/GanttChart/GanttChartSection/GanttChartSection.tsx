import {
    Box, BoxProps, CompoundStylesApiProps, polymorphicFactory, PolymorphicFactory, useProps
} from '../../../core'
import { useGanttChartContext } from '../GanttChart.context'
import classes from '../GanttChart.module.css'

export type GanttChartSectionStylesNames = 'section';

export interface GanttChartSectionProps
  extends BoxProps,
    CompoundStylesApiProps<GanttChartSectionFactory> {
  /** Determines whether the section should have a border, `false` by default */
  withBorder?: boolean;

  /** Determines whether the section should inherit padding from the parent `GanttChart`, `false` by default */
  inheritPadding?: boolean;
}

export type GanttChartSectionFactory = PolymorphicFactory<{
  props: GanttChartSectionProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: GanttChartSectionStylesNames;
  compound: true;
}>;

const defaultProps: Partial<GanttChartSectionProps> = {};

export const GanttChartSection = polymorphicFactory<GanttChartSectionFactory>((_props, ref) => {
  const props = useProps('GanttChartSection', defaultProps, _props);
  const { classNames, className, style, styles, vars, withBorder, inheritPadding, mod, ...others } =
    props;
  const ctx = useGanttChartContext();

  return (
    <Box
      ref={ref}
      mod={[
        { 'with-border': withBorder || ctx.withBorder, 'inherit-padding': inheritPadding },
        mod,
      ]}
      {...(ctx.getStyles?.('section', { className, style, styles, classNames }) || {
        className: classes.section,
      })}
      {...others}
    />
  );
});

GanttChartSection.classes = classes;
GanttChartSection.displayName = '@mantine/core/GanttChartSection';
