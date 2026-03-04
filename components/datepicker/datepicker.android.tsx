import { DateTimePicker, Host } from '@expo/ui/jetpack-compose';
import { memo } from 'react';

interface DatePickerProps {
    value: Date;
    onChange: (date: Date) => void;
    range?: { start: Date; end: Date };
}

function DatePickerComponent({ value, onChange }: DatePickerProps) {
    return (
        <Host matchContents>
            <DateTimePicker
                onDateSelected={onChange}
                displayedComponents="date"
                initialDate={value.toISOString()}
                variant="picker"
            />
        </Host>
    );
}

export default memo(DatePickerComponent);
