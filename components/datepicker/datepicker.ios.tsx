import { DatePicker, Host } from '@expo/ui/swift-ui';
import { datePickerStyle } from '@expo/ui/swift-ui/modifiers';
import { memo } from 'react';

interface DatePickerProps {
    value: Date;
    onChange: (date: Date) => void;
    range?: { start: Date; end: Date };
}

function DatePickerComponent({ value, onChange, range }: DatePickerProps) {
    return (
        <Host matchContents>
            <DatePicker
                modifiers={[datePickerStyle('wheel')]}
                selection={value}
                displayedComponents={['date']}
                onDateChange={onChange}
                range={{ end: range?.end, start: range?.start }}
            />
        </Host>
    );
}

export default memo(DatePickerComponent)
