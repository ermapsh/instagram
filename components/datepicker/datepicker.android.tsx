import { DateTimePicker, Host } from '@expo/ui/jetpack-compose';
import { useState } from 'react';

export default function DatePickerComponent() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <Host matchContents>
            <DateTimePicker
                onDateSelected={date => {
                    setSelectedDate(date);
                }}
                displayedComponents="date"
                initialDate={selectedDate.toISOString()}
                variant="picker"
            />
        </Host>
    );
}
