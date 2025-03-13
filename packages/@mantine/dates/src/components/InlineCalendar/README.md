# InlineCalendar

InlineCalendar is a component that displays dates from 1 to the end of the month in a single line.

## Usage

```tsx
import { InlineCalendar } from '@mantine/dates';

function Demo() {
  return <InlineCalendar />;
}
```

## Props

InlineCalendar accepts all props from Box component and the following props:

* **date** - controlled date value
* **defaultDate** - uncontrolled date value
* **onDateChange** - called when date changes
* **locale** - dayjs locale, defaults to value defined in DatesProvider
* **weekendDays** - indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday
* **getDayProps** - adds props to Day component based on date
* **excludeDate** - callback function to determine whether the day should be disabled
* **minDate** - minimum possible date
* **maxDate** - maximum possible date
* **renderDay** - controls day value rendering
* **getDayAriaLabel** - assigns aria-label to days based on date
* **size** - controls size
* **withCellSpacing** - determines whether controls should be separated by spacing
* **highlightToday** - determines whether today should be highlighted with a border
* **monthLabelFormat** - dayjs format to display month label or a function that returns month label based on month value

## Examples

### With highlighted today

```tsx
import { InlineCalendar } from '@mantine/dates';

function Demo() {
  return <InlineCalendar highlightToday />;
}
```

### With min and max dates

```tsx
import { InlineCalendar } from '@mantine/dates';

function Demo() {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 10);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 10);

  return <InlineCalendar minDate={minDate} maxDate={maxDate} />;
}
```

### Without cell spacing

```tsx
import { InlineCalendar } from '@mantine/dates';

function Demo() {
  return <InlineCalendar withCellSpacing={false} />;
}
```
