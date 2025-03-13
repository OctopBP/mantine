import { Stack } from '@mantine/core';
import { GanttChart } from './GanttChart';

export default { title: 'GanttChart' };

const defaultData = [
  {
    id: '1',
    title: 'Research',
    startDate: new Date(2025, 3, 10, 12, 0, 0),
    endDate: new Date(2025, 3, 16, 14, 0, 0),
    color: 'blue',
  },
  {
    id: '2',
    title: 'Design',
    startDate: new Date(2025, 3, 14, 10, 0, 0),
    endDate: new Date(2025, 3, 20, 12, 0, 0),
    color: 'green',
  },
  {
    id: '3',
    title: 'Development',
    startDate: new Date(2025, 3, 18, 8, 0, 0),
    endDate: new Date(2025, 3, 25, 20, 0, 0),
    color: 'orange',
  },
];

export function Usage() {
  return <GanttChart data={defaultData} />;
}

export function WithPresentationSelector() {
  return <GanttChart data={defaultData} defaultPresentation="month" />;
}

export function Empty() {
  return <GanttChart />;
}

export function WithBorder() {
  return <GanttChart data={defaultData} withBorder />;
}

export function WithShadow() {
  return <GanttChart data={defaultData} shadow="md" />;
}

export function CustomPadding() {
  return <GanttChart data={defaultData} padding="xl" />;
}

export function CustomRadius() {
  return <GanttChart data={defaultData} radius="lg" />;
}

export function LongProject() {
  const longProjectData = [
    {
      id: '1',
      title: 'Planning',
      startDate: new Date(2024, 2, 1),
      endDate: new Date(2024, 2, 28),
      color: 'blue',
    },
    {
      id: '2',
      title: 'Research',
      startDate: new Date(2024, 2, 5),
      endDate: new Date(2024, 2, 15),
      color: 'green',
    },
    {
      id: '3',
      title: 'Design',
      startDate: new Date(2024, 2, 10),
      endDate: new Date(2024, 2, 20),
      color: 'orange',
    },
    {
      id: '4',
      title: 'Development',
      startDate: new Date(2024, 2, 15),
      endDate: new Date(2024, 2, 31),
      color: 'grape',
    },
  ];

  return (
    <Stack>
      <GanttChart data={longProjectData} />
    </Stack>
  );
}

export function CustomColors() {
  const coloredData = [
    {
      id: '1',
      title: 'Task 1',
      startDate: new Date(2024, 2, 1),
      endDate: new Date(2024, 2, 5),
      color: 'pink',
    },
    {
      id: '2',
      title: 'Task 2',
      startDate: new Date(2024, 2, 3),
      endDate: new Date(2024, 2, 8),
      color: 'violet',
    },
    {
      id: '3',
      title: 'Task 3',
      startDate: new Date(2024, 2, 6),
      endDate: new Date(2024, 2, 15),
      color: 'cyan',
    },
  ];

  return (
    <Stack>
      <GanttChart data={coloredData} />
    </Stack>
  );
}

export function WithSection() {
  return (
    <Stack>
      <GanttChart data={defaultData}>
        <GanttChart.Section>
          <div>Custom section content</div>
        </GanttChart.Section>
      </GanttChart>
    </Stack>
  );
}
