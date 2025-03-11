import { GanttChart } from './GanttChart'

export default { title: 'GanttChart' };

export function Usage() {
  return (
    <div style={{ maxWidth: '90%', padding: 40, margin: 'auto' }}>
      <GanttChart withBorder />
    </div>
  );
}

export function CustomWidth() {
  return (
    <div style={{ maxWidth: '90%', padding: 40, margin: 'auto' }}>
      <GanttChart withBorder style={{ height: '500px' }} />
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ maxWidth: '90%', padding: 40, margin: 'auto' }}>
      <GanttChart unstyled>Unstyled GanttChart</GanttChart>
    </div>
  );
}
