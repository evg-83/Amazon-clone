export function isWeekend(date) {
	const day = date.format('dddd')
	return day === 'Saturday' || day === 'Sunday'
}