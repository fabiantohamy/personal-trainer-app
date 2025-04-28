import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fi } from 'date-fns/locale/fi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getTrainings } from '../api';
import { Training, CalendarEvent } from '../types';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales: { fi }
});

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>('week');

  useEffect(() => {
    getTrainings()
      .then((data) => {
        const formattedEvents = data.map((training: Training) => ({
          title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
          start: new Date(training.date),
          end: new Date(new Date(training.date).getTime() + training.duration * 60000),
        }));
        setEvents(formattedEvents);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  return (
    <div style={{ height: '88vh', margin: '20px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day', 'agenda']}
        defaultView="week"
        view={currentView}
        date={currentDate}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        style={{ height: '100%' }}
        popup
      />
    </div>
  );
}
