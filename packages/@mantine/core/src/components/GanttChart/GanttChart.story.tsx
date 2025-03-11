import { Paper } from '../Paper'
import { GanttChart } from './GanttChart'

export default { title: 'GanttChart' };

export function Usage() {
  return (
    <div style={{ maxWidth: 600, padding: 40, margin: 'auto' }}>
      <GanttChart withBorder>
        <GanttChart.Section inheritPadding py="md">
          GanttChart section 1
        </GanttChart.Section>
        <div>Content 1</div>
        <GanttChart.Section inheritPadding>GanttChart section 2</GanttChart.Section>
        <div>Content 2</div>
      </GanttChart>
    </div>
  );
}

export function CustomComponent() {
  return (
    <div style={{ maxWidth: 600, padding: 40, margin: 'auto' }}>
      <GanttChart component="article">
        <GanttChart.Section>GanttChart section</GanttChart.Section>
        <Paper p="md">Content</Paper>
      </GanttChart>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ maxWidth: 600, padding: 40, margin: 'auto' }}>
      <GanttChart unstyled>Unstyled GanttChart</GanttChart>
    </div>
  );
}
