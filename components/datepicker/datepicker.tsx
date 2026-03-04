
interface DatePickerProps {
    value: Date;
    onChange: (date: Date) => void;
    range?: { start: Date; end: Date };
}

export default function DatePickerComponent({ value, onChange, range }: DatePickerProps) {
    return null;
}
