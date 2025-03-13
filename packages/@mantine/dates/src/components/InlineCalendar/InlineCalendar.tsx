import dayjs from 'dayjs'
import {
    Box, BoxProps, createVarsResolver, ElementProps, factory, Factory, getFontSize, getSize,
    MantineSize, StylesApiProps, useProps, useStyles
} from '@mantine/core'
import { useUncontrolled } from '@mantine/hooks'
import { DayOfWeek } from '../../types'
import { CalendarHeader, CalendarHeaderStylesNames } from '../CalendarHeader'
import { useDatesContext } from '../DatesProvider'
import { DayProps, DayStylesNames } from '../Day'
import { InlineMonth, InlineMonthStylesNames } from '../InlineMonth'
import classes from './InlineCalendar.module.css'

export type InlineCalendarStylesNames =
  | 'inlineCalendar'
  | 'monthRow'
  | 'monthCell'
  | DayStylesNames
  | CalendarHeaderStylesNames
  | InlineMonthStylesNames;

export interface InlineCalendarSettings {
  /** Dayjs locale, defaults to value defined in DatesProvider */
  locale?: string;

  /** Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday, defaults to value defined in DatesProvider */
  weekendDays?: DayOfWeek[];

  /** Adds props to Day component based on date */
  getDayProps?: (date: Date) => Omit<Partial<DayProps>, 'classNames' | 'styles' | 'vars'>;

  /** Callback function to determine whether the day should be disabled */
  excludeDate?: (date: Date) => boolean;

  /** Minimum possible date */
  minDate?: Date;

  /** Maximum possible date */
  maxDate?: Date;

  /** Controls day value rendering */
  renderDay?: (date: Date) => React.ReactNode;

  /** Assigns aria-label to days based on date */
  getDayAriaLabel?: (date: Date) => string;

  /** Controls size */
  size?: MantineSize;

  /** Determines whether controls should be separated by spacing, true by default */
  withCellSpacing?: boolean;

  /** Determines whether today should be highlighted with a border, `false` by default */
  highlightToday?: boolean;

  /** Dayjs label format to display month label or a function that returns month label based on month value, defaults to "MMMM YYYY" */
  monthLabelFormat?: string | ((month: Date) => React.ReactNode);
}

export interface InlineCalendarBaseProps {
  /** Initial date that is displayed, used for uncontrolled component */
  defaultDate?: Date;

  /** Date that is displayed, used for controlled component */
  date?: Date;

  /** Called when date changes */
  onDateChange?: (date: Date) => void;

  /** Prevents focus shift when buttons are clicked */
  __preventFocus?: boolean;

  /** Determines whether propagation for Escape key should be stopped */
  __stopPropagation?: boolean;

  /** Called when day is clicked with click event and date */
  __onDayClick?: (event: React.MouseEvent<HTMLButtonElement>, date: Date) => void;

  /** Called when mouse enters day */
  __onDayMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>, date: Date) => void;

  /** Arial-label for next button */
  nextLabel?: string;

  /** Arial-label for previous button */
  previousLabel?: string;

  /** Called when next month button is clicked */
  onNextMonth?: (date: Date) => void;

  /** Called when previous month button is clicked */
  onPreviousMonth?: (date: Date) => void;
}

export interface InlineCalendarProps
  extends BoxProps,
    InlineCalendarSettings,
    InlineCalendarBaseProps,
    StylesApiProps<InlineCalendarFactory>,
    ElementProps<'div'> {
  /** Determines whether days should be static, static days can be used to display month if it is not expected that user will interact with the component in any way  */
  static?: boolean;
}

export type InlineCalendarFactory = Factory<{
  props: InlineCalendarProps;
  ref: HTMLDivElement;
  stylesNames: InlineCalendarStylesNames;
}>;

const defaultProps: Partial<InlineCalendarProps> = {
  monthLabelFormat: 'MMMM YYYY',
  withCellSpacing: true,
};

const varsResolver = createVarsResolver<InlineCalendarFactory>((_, { size }) => ({
  inlineCalendar: {
    '--ic-fz': getFontSize(size),
    '--ic-size': getSize(size, 'ic-size'),
  },
}));

export function getMonthDaysInline(month: Date): Date[] {
  const daysInMonth = dayjs(month).daysInMonth();
  const days: Date[] = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const date = dayjs(month).date(i).toDate();
    days.push(date);
  }

  return days;
}

export const InlineCalendar = factory<InlineCalendarFactory>((_props, ref) => {
  const props = useProps('InlineCalendar', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    date,
    defaultDate,
    onDateChange,
    locale,
    weekendDays,
    getDayProps,
    excludeDate,
    minDate,
    maxDate,
    renderDay,
    getDayAriaLabel,
    static: isStatic,
    __onDayClick,
    __onDayMouseEnter,
    __preventFocus,
    __stopPropagation,
    withCellSpacing,
    size,
    highlightToday,
    monthLabelFormat,
    nextLabel,
    previousLabel,
    onNextMonth,
    onPreviousMonth,
    ...others
  } = props;

  const getStyles = useStyles<InlineCalendarFactory>({
    name: 'InlineCalendar',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
    rootSelector: 'inlineCalendar',
  });

  const ctx = useDatesContext();

  const [_date, setDate] = useUncontrolled({
    value: date,
    defaultValue: defaultDate,
    onChange: onDateChange,
  });

  const currentDate = _date || new Date();

  const handleNextMonth = () => {
    const nextDate = dayjs(currentDate).add(1, 'month').toDate();
    onNextMonth?.(nextDate);
    setDate(nextDate);
  };

  const handlePreviousMonth = () => {
    const nextDate = dayjs(currentDate).subtract(1, 'month').toDate();
    onPreviousMonth?.(nextDate);
    setDate(nextDate);
  };

  const _nextDisabled = maxDate ? !dayjs(currentDate).endOf('month').isBefore(maxDate) : false;
  const _previousDisabled = minDate ? !dayjs(currentDate).startOf('month').isAfter(minDate) : false;

  return (
    <Box ref={ref} {...others} {...getStyles('inlineCalendar')}>
      <CalendarHeader
        label={
          typeof monthLabelFormat === 'function'
            ? monthLabelFormat(currentDate)
            : dayjs(currentDate)
                .locale(locale || ctx.locale)
                .format(monthLabelFormat)
        }
        __preventFocus={__preventFocus}
        __stopPropagation={__stopPropagation}
        nextLabel={nextLabel}
        previousLabel={previousLabel}
        onNext={handleNextMonth}
        onPrevious={handlePreviousMonth}
        nextDisabled={_nextDisabled}
        previousDisabled={_previousDisabled}
        hasNextLevel={false}
        withNext
        withPrevious
        classNames={classNames}
        styles={styles}
        unstyled={unstyled}
        size={size}
      />

      <InlineMonth
        month={currentDate}
        locale={locale}
        weekendDays={weekendDays}
        getDayProps={getDayProps}
        excludeDate={excludeDate}
        minDate={minDate}
        maxDate={maxDate}
        renderDay={renderDay}
        getDayAriaLabel={getDayAriaLabel}
        __onDayClick={__onDayClick}
        __onDayMouseEnter={__onDayMouseEnter}
        __preventFocus={__preventFocus}
        __stopPropagation={__stopPropagation}
        static={isStatic}
        withCellSpacing={withCellSpacing}
        size={size}
        highlightToday={highlightToday}
        classNames={classNames}
        styles={styles}
        unstyled={unstyled}
      />
    </Box>
  );
});

InlineCalendar.classes = { ...InlineMonth.classes, ...CalendarHeader.classes };
InlineCalendar.displayName = '@mantine/dates/InlineCalendar';
