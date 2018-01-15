import * as React from 'react';
import { FlatList, View, Button, TextInput } from 'react-native';
import { BodyText } from './Components/TextComponents';
import { DateInput } from './Components/DateInput';
import { RbrTextInput } from './Components/TextInput';

interface ITodoItem {
    text: string;
    by: Date;
}

export class Todo extends React.Component <{

}, {
    todos: ITodoItem[];
    newText: string;
    newBy: Date;
}> {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            newText: '',
            newBy: new Date(),
        };
    }

    get validInput(): boolean {
        const {newText, newBy, todos} = this.state;
        if (!newText || !newBy)
            return false;

        const item: ITodoItem = {
            text: newText,
            by: newBy,
        };

        const thisKey = this.getKey(item);
        const keys = todos.map(i => this.getKey(i));
        if (keys.find(i => i === thisKey) !== undefined)
            return false;

        return true;
    }

    getKey = (item: ITodoItem) => `${item.text.toLowerCase()}_${item.by.toISOString()}`;

    onAdd = () => {
        this.setState(prevState => ({
            todos: [...prevState.todos, {
                text: prevState.newText,
                by: prevState.newBy,
            }],
            newText: '',
            newBy: new Date(),
        }));
    }

    onDelete = (item: ITodoItem) => {
        this.setState(prevState => ({
            todos: prevState.todos.filter(i => i !== item),
        }));
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <RbrTextInput placeholder='Task' value={this.state.newText} onChangeText={newText => this.setState({newText})} />
                <DateInput placeholder='Due date' dateValue={this.state.newBy} onDateChange={newBy => this.setState({newBy})} />
                <Button title='Add TODO' accessibilityLabel='Add TODO' onPress={this.onAdd} disabled={!this.validInput} />
                <FlatList
                    data={this.state.todos.sort((a, b) => this.getKey(a).localeCompare(this.getKey(b)))}
                    keyExtractor={this.getKey}
                    renderItem={({item}) => <TodoRow item={item} onDelete={this.onDelete} />}
                />
            </View>
        );
    }
}

class TodoRow extends React.Component<{
    item: ITodoItem;
    onDelete?(item: ITodoItem): void;
}> {
    onDelete = () => {
        this.props.onDelete && this.props.onDelete(this.props.item);
    }

    render() {
        return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <BodyText>{this.props.item.text}</BodyText>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <BodyText>{this.props.item.by.toISOString().substr(0, 10)}</BodyText>
                <Button title='Delete' accessibilityLabel='Delete' onPress={this.onDelete} />
            </View>
        </View>
        );
    }
}
