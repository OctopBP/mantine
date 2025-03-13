import { Stack } from '@mantine/core'
import { DatesProvider } from '../DatesProvider'
import { InlineCalendar } from './InlineCalendar'

export default { title: 'InlineCalendar' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <InlineCalendar />
    </div>
  );
}

export function Sizes() {
  const sizes = (['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
    <div key={size} style={{ marginBottom: 20 }}>
      <div style={{ marginBottom: 10 }}>{size}</div>
      <InlineCalendar size={size} />
    </div>
  ));

  return (
    <div style={{ padding: 40 }}>
      <Stack>{sizes}</Stack>
    </div>
  );
}

export function DefaultDate() {
  return (
    <div style={{ padding: 40 }}>
      <InlineCalendar defaultDate={new Date(2022, 3, 11)} />
    </div>
  );
}

export function Locale() {
  return (
    <div style={{ padding: 40 }}>
      <DatesProvider settings={{ locale: 'ru' }}>
        <InlineCalendar defaultDate={new Date(2022, 3, 11)} />
      </DatesProvider>
    </div>
  );
}

export function WithCellSpacing() {
  return (
    <div style={{ padding: 40 }}>
      <Stack>
        <div>
          <div style={{ marginBottom: 10 }}>With cell spacing (default)</div>
          <InlineCalendar withCellSpacing />
        </div>
        <div>
          <div style={{ marginBottom: 10 }}>Without cell spacing</div>
          <InlineCalendar withCellSpacing={false} />
        </div>
      </Stack>
    </div>
  );
}

export function HighlightToday() {
  return (
    <div style={{ padding: 40 }}>
      <Stack>
        <div>
          <div style={{ marginBottom: 10 }}>Without highlight (default)</div>
          <InlineCalendar />
        </div>
        <div>
          <div style={{ marginBottom: 10 }}>With highlight</div>
          <InlineCalendar highlightToday />
        </div>
      </Stack>
    </div>
  );
}

export function MinMaxDate() {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 10);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 10);

  return (
    <div style={{ padding: 40 }}>
      <div style={{ marginBottom: 10 }}>
        Limited to 10 days before and after today ({minDate.toLocaleDateString()} –{' '}
        {maxDate.toLocaleDateString()})
      </div>
      <InlineCalendar minDate={minDate} maxDate={maxDate} />
    </div>
  );
}

export function CustomMonthLabel() {
  return (
    <div style={{ padding: 40 }}>
      <Stack>
        <div>
          <div style={{ marginBottom: 10 }}>Custom format string</div>
          <InlineCalendar monthLabelFormat="YYYY [year] MMMM" />
        </div>
        <div>
          <div style={{ marginBottom: 10 }}>Custom render function</div>
          <InlineCalendar
            monthLabelFormat={(date) => {
              const month = date.toLocaleString('en', { month: 'long' });
              const year = date.getFullYear();
              return `${month} of year ${year}`;
            }}
          />
        </div>
      </Stack>
    </div>
  );
}

export function CustomDayRender() {
  return (
    <div style={{ padding: 40 }}>
      <InlineCalendar
        renderDay={(date) => {
          const day = date.getDate();
          return (
            <div
              style={{
                background: day % 2 === 0 ? '#e8f5e9' : '#f3e5f5',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
              }}
            >
              {day}
            </div>
          );
        }}
      />
    </div>
  );
}

export function MultipleCalendars() {
  return (
    <div style={{ padding: 40 }}>
      <Stack>
        {[0, 1, 2].map((monthsToAdd) => {
          const date = new Date();
          date.setMonth(date.getMonth() + monthsToAdd);
          return <InlineCalendar key={monthsToAdd} defaultDate={date} highlightToday />;
        })}
      </Stack>
    </div>
  );
}

export function WeekendDays() {
  return (
    <div style={{ padding: 40 }}>
      <div style={{ marginBottom: 10 }}>Custom weekend days (Monday, Wednesday, Friday)</div>
      <InlineCalendar weekendDays={[1, 3, 5]} />
    </div>
  );
}

export function Controlled() {
  return (
    <div style={{ padding: 40 }}>
      <InlineCalendar date={new Date(2023, 0, 1)} />
    </div>
  );
}
