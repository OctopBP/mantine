import { DatesProvider } from '../DatesProvider'
import { Calendar } from './Calendar'

export default { title: 'Calendar' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar />
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar unstyled />
    </div>
  );
}

export function ConsistentWeeks() {
  return (
    <div style={{ padding: 40 }}>
      <DatesProvider settings={{ consistentWeeks: true }}>
        <Calendar />
      </DatesProvider>
    </div>
  );
}

export function MaxLevel() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar maxLevel="year" />
    </div>
  );
}

export function MinLevel() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar minLevel="year" />
    </div>
  );
}

export function NumberOfColumns() {
  return (
    <div style={{ padding: 40 }}>
      <div>1 column</div>
      <Calendar mb={50} mt="xs" />

      <div>2 columns</div>
      <Calendar numberOfColumns={2} columnsToScroll={2} mb={50} mt="xs" />

      <div>3 columns</div>
      <Calendar numberOfColumns={3} mb={50} mt="xs" />
    </div>
  );
}

export function InitialLevelYear() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar defaultLevel="year" />
    </div>
  );
}

export function InitialLevelDecade() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar defaultLevel="decade" />
    </div>
  );
}

export function Sizes() {
  const sizes = (['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
    <Calendar size={size} key={size} mt="xl" />
  ));

  return <div style={{ padding: 40 }}>{sizes}</div>;
}

export function Controlled() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar level="year" />
    </div>
  );
}

export function MinMax() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar maxLevel="year" minLevel="month" />
    </div>
  );
}

export function DefaultDate() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar defaultDate={new Date(2022, 3, 11)} />
    </div>
  );
}

export function Locale() {
  return (
    <div style={{ padding: 40 }}>
      <DatesProvider settings={{ locale: 'ru' }}>
        <Calendar defaultDate={new Date(2022, 3, 11)} />
      </DatesProvider>
    </div>
  );
}

export function FirstDayOfWeek() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar firstDayOfWeek={0} />
    </div>
  );
}

export function WeekendDays() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar weekendDays={[1, 3, 5]} />
    </div>
  );
}

export function HideWeekdays() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar hideWeekdays />
    </div>
  );
}

export function HideOutsideDates() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar hideOutsideDates />
    </div>
  );
}
