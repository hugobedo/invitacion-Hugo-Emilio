import { EventDetails } from '../types/invitation';

export function createGoogleCalendarUrl(event: EventDetails): string {
  // Hugo Emilio's 1st Birthday: Jan 28, 2027 from 16:00 to 20:00 (or customized time)
  const startDate = new Date(event.targetDateIso);
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours duration

  const formatGCalDate = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const dates = `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`;
  const title = encodeURIComponent(`🎂 ¡Primer Añito de ${event.childName}! - La Granja de Zenón 🚜`);
  const details = encodeURIComponent(
    `¡Acompáñanos a celebrar el primer añito de ${event.childName} en La Granja de Zenón!\n\n` +
    `Lugar: ${event.venueName}\n` +
    `Dirección: ${event.address}\n\n` +
    `¡Te esperamos con Bartolito, La Vaca Lola, juegos y pastel!`
  );
  const location = encodeURIComponent(`${event.venueName}, ${event.address}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function downloadIcsFile(event: EventDetails): void {
  const startDate = new Date(event.targetDateIso);
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

  const formatIcsDate = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Hugo Emilio Primer Anito//La Granja de Zenon//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${formatIcsDate(startDate)}`,
    `DTEND:${formatIcsDate(endDate)}`,
    `SUMMARY:🎂 ¡Primer Añito de ${event.childName}! - La Granja de Zenón`,
    `DESCRIPTION:Celebración del 1er cumpleaños de ${event.childName} en ${event.venueName}. ¡La Granja de Zenón, pastel y mucha diversión!`,
    `LOCATION:${event.venueName}, ${event.address}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `cumpleanos-${event.childName.toLowerCase().replace(/\s+/g, '-')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
