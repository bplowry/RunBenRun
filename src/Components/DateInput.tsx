import * as React from 'react';
import { DatePickerIOS, DatePickerAndroid, Platform } from 'react-native';
import { RbrTextInput } from './TextInput';

interface IDateInputProps {
    placeholder?: string;
    dateValue: Date;
    minDate?: Date;
    maxDate?: Date;
    onDateChange(date: Date): void;
}

export class DateInput extends React.Component<IDateInputProps> {
    render() {
        return Platform.select({
            android: <DateInputAndroid {...this.props} />,
            ios: <DateInputIOS {...this.props} />,
            default: <DateInputAgnostic {...this.props} />,
        });
    }
}

class DateInputAgnostic extends React.Component<IDateInputProps> {
    get textValue() {
        return this.props.dateValue && this.props.dateValue.toISOString();
    }

    onChangeText = (text: string) => {
        const date: Date = new Date(text);
        this.props.onDateChange(date);
    }

    render() {
        return <RbrTextInput {...this.props} value={this.textValue} onChangeText={this.onChangeText} />;
    }
}

class DateInputAndroid extends React.Component<IDateInputProps> {
    onFocus = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.props.dateValue || new Date(),
                maxDate: this.props.maxDate,
                minDate: this.props.minDate,
                mode: 'calendar',
            });

            if (action !== DatePickerAndroid.dismissedAction) {
                if (year !== undefined && month !== undefined && day !== undefined) {
                    this.props.onDateChange(new Date(year, month, day));
                }
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }

        // we never really want the input to be focused as it is only used to display a value
        // this.blurInput();
    }

    get inputValue() {
        return this.props.dateValue.toISOString().substr(0, 10);
    }

    render() {
        return (
            <RbrTextInput onFocus={this.onFocus} value={this.inputValue} blurOnSubmit />
        );
    }
}

class DateInputIOS extends React.Component<IDateInputProps> {
    render() {
        return (
            <DatePickerIOS
                date={this.props.dateValue}
                minimumDate={this.props.minDate}
                maximumDate={this.props.maxDate}
                onDateChange={this.props.onDateChange}
                mode='date'
            />
        );
    }
}
