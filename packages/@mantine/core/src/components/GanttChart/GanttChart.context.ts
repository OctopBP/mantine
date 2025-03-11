import { createSafeContext, FactoryPayload, GetStylesApi } from '../../core'

// Define a minimal interface that satisfies FactoryPayload
interface GanttChartFactoryPayload extends FactoryPayload {
  props: Record<string, any>;
  stylesNames: 'root' | 'section';
}

interface GanttChartContextValue {
  withBorder?: boolean;
  getStyles: GetStylesApi<GanttChartFactoryPayload>;
}

export const [GanttChartProvider, useGanttChartContext] = createSafeContext<GanttChartContextValue>(
  'GanttChart component was not found in the tree'
);
