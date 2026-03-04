import { DatePicker, Host } from '@expo/ui/swift-ui';
import { memo, useState } from 'react';

function DatePickerComponent() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <Host matchContents>
            <DatePicker
                title="Select a date"
                selection={selectedDate}
                displayedComponents={['date']}
                onDateChange={date => {
                    setSelectedDate(date);
                }}
            />
        </Host>
    );
}

export default memo(DatePickerComponent)
