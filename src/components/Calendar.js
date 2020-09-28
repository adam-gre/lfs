import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import events from './EventList.js';


const localizer = momentLocalizer(moment)

const EventCalendar = props => (
    <Calendar
        popup
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 360 }}
    />
)

export default EventCalendar;