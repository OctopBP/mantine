import { Stack } from '@mantine/core'
import { InlineCalendar } from '../InlineCalendar'

export function InlineCalendarDemo() {
  return (
    <Stack>
      <InlineCalendar />
      <InlineCalendar highlightToday />
      <InlineCalendar withCellSpacing={false} />
    </Stack>
  );
}
