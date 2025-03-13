import dayjs from 'dayjs'
import {
    Box, BoxProps, createVarsResolver, ElementProps, factory, Factory, getFontSize, getSize,
    MantineSize, StylesApiProps, useProps, useResolvedStylesApi, useStyles
} from '@mantine/core'
import { ControlKeydownPayload, DayOfWeek } from '../../types'
import { useDatesContext } from '../DatesProvider'
import { Day, DayProps, DayStylesNames } from '../Day'
import classes from './InlineMonth.module.css'

export type InlineMonthStylesNames = 'inlineMonth' | 'monthRow' | 'monthCell' | DayStylesNames;

export interface InlineMonthSettings {
  /** Determines whether propagation for Escape key should be stopped */
  __stopPropagation?: boolean;

  /** Prevents focus shift when buttons are clicked */
  __preventFocus?: boolean;

  /** Called when day is clicked with click event and date */
  __onDayClick?: (event: React.MouseEvent<HTMLButtonElement>, date: Date) => void;

  /** Called when mouse enters day */
  __onDayMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>, date: Date) => void;

  /** Called when any keydown event is registered on day, used for arrows navigation */
  __onDayKeyDown?: (
    event: React.KeyboardEvent<HTMLButtonElement>,
    payload: ControlKeydownPayload
  ) => void;

  /** Assigns ref of every day based on its position in the table, used for arrows navigation */
  __getDayRef?: (rowIndex: number, cellIndex: number, node: HTMLButtonElement) => void;

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
}

export interface InlineMonthProps
  extends BoxProps,
    InlineMonthSettings,
    StylesApiProps<InlineMonthFactory>,
    ElementProps<'div'> {
  __staticSelector?: string;

  /** Month to display */
  month: Date;

  /** Determines whether days should be static, static days can be used to display month if it is not expected that user will interact with the component in any way  */
  static?: boolean;
}

export type InlineMonthFactory = Factory<{
  props: InlineMonthProps;
  ref: HTMLDivElement;
  stylesNames: InlineMonthStylesNames;
}>;

const defaultProps: Partial<InlineMonthProps> = {
  withCellSpacing: true,
};

const varsResolver = createVarsResolver<InlineMonthFactory>((_, { size }) => ({
  inlineMonth: {
    '--month-fz': getFontSize(size),
    '--month-day-size': getSize(size, 'month-day-size'),
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

export const InlineMonth = factory<InlineMonthFactory>((_props, ref) => {
  const props = useProps('InlineMonth', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    __staticSelector,
    locale,
    month,
    weekendDays,
    getDayProps,
    excludeDate,
    minDate,
    maxDate,
    renderDay,
    getDayAriaLabel,
    static: isStatic,
    __getDayRef,
    __onDayKeyDown,
    __onDayClick,
    __onDayMouseEnter,
    __preventFocus,
    __stopPropagation,
    withCellSpacing,
    size,
    highlightToday,
    ...others
  } = props;

  const getStyles = useStyles<InlineMonthFactory>({
    name: __staticSelector || 'InlineMonth',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
    rootSelector: 'inlineMonth',
  });

  const ctx = useDatesContext();
  const days = getMonthDaysInline(month);

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<InlineMonthFactory>({
    classNames,
    styles,
    props,
  });

  const daysItems = days.map((date, index) => {
    const ariaLabel =
      getDayAriaLabel?.(date) ||
      dayjs(date)
        .locale(locale || ctx.locale)
        .format('D MMMM YYYY');
    const dayProps = getDayProps?.(date);

    return (
      <td
        key={date.toString()}
        {...getStyles('monthCell')}
        data-with-spacing={withCellSpacing || undefined}
      >
        <Day
          __staticSelector={__staticSelector || 'InlineMonth'}
          classNames={resolvedClassNames}
          styles={resolvedStyles}
          unstyled={unstyled}
          data-mantine-stop-propagation={__stopPropagation || undefined}
          highlightToday={highlightToday}
          renderDay={renderDay}
          date={date}
          size={size}
          weekend={ctx.getWeekendDays(weekendDays).includes(date.getDay() as DayOfWeek)}
          outside={false}
          hidden={false}
          aria-label={ariaLabel}
          static={isStatic}
          disabled={
            excludeDate?.(date) ||
            (minDate && dayjs(date).isBefore(dayjs(minDate), 'day')) ||
            (maxDate && dayjs(date).isAfter(dayjs(maxDate), 'day'))
          }
          ref={(node) => __getDayRef?.(0, index, node!)}
          onClick={(event) => __onDayClick?.(event, date)}
          onMouseEnter={(event) => __onDayMouseEnter?.(event, date)}
          onKeyDown={(event) => __onDayKeyDown?.(event, { rowIndex: 0, cellIndex: index, date })}
          {...dayProps}
        />
      </td>
    );
  });

  return (
    <Box ref={ref} {...others}>
      <table {...getStyles('inlineMonth')}>
        <tbody>
          <tr {...getStyles('monthRow')}>{daysItems}</tr>
        </tbody>
      </table>
    </Box>
  );
});

InlineMonth.classes = classes;
InlineMonth.displayName = '@mantine/dates/InlineMonth';
