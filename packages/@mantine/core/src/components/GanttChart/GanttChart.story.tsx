import { useState } from 'react';
import { Stack } from '@mantine/core';
import { GanttChart, GanttChartPresentation } from './GanttChart';

export default { title: 'GanttChart' };

const defaultData = [
  {
    id: '1',
    title: 'Research',
    startDate: new Date(2024, 2, 1),
    endDate: new Date(2024, 2, 5),
    color: 'blue',
  },
  {
    id: '2',
    title: 'Design',
    startDate: new Date(2024, 2, 3),
    endDate: new Date(2024, 2, 8),
    color: 'green',
  },
  {
    id: '3',
    title: 'Development',
    startDate: new Date(2024, 2, 6),
    endDate: new Date(2024, 2, 15),
    color: 'orange',
  },
];

export function Usage() {
  return (
    <Stack>
      <GanttChart data={defaultData} />
    </Stack>
  );
}

export function WithPresentationSelector() {
  const [presentation, setPresentation] = useState<GanttChartPresentation>('month');

  return (
    <Stack>
      <GanttChart
        data={defaultData}
        presentation={presentation}
        onPresentationChange={setPresentation}
      />
    </Stack>
  );
}

export function Empty() {
  return (
    <Stack>
      <GanttChart />
    </Stack>
  );
}

export function WithBorder() {
  return (
    <Stack>
      <GanttChart data={defaultData} withBorder />
    </Stack>
  );
}

export function WithShadow() {
  return (
    <Stack>
      <GanttChart data={defaultData} shadow="md" />
    </Stack>
  );
}

export function CustomPadding() {
  return (
    <Stack>
      <GanttChart data={defaultData} padding="xl" />
    </Stack>
  );
}

export function CustomRadius() {
  return (
    <Stack>
      <GanttChart data={defaultData} radius="lg" />
    </Stack>
  );
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
