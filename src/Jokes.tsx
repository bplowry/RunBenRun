import * as React from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';
import { HttpExecutor } from './Shared/HttpExecutor';
import { BodyText } from './Components/TextComponents';
import { Progress } from './Components/Progress';

interface IRandomJoke {
    type: string;
    value: { id: number, joke: string };
}

export class Jokes extends React.Component<{
    navigation: any,
}, {
    loading: boolean,
    last5: IRandomJoke[];
}> {
    http: HttpExecutor;

    constructor(props) {
        super(props);

        this.http = new HttpExecutor();

        this.state = {
            last5: [],
            loading: false,
        };
    }

    showRandomJoke = async () => {
        try {
            this.setState({ loading: true });
            const joke = await this.http.get<IRandomJoke>('http://api.icndb.com/jokes/random');
            this.setState(prevState => ({
                last5: [joke, ...prevState.last5].slice(0, 5),
            }));
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        return (
            <ScrollView>
                <Button
                    onPress={this.showRandomJoke}
                    title='Random joke'
                    accessibilityLabel='Random joke'
                    disabled={this.state.loading || false}
                />
                {this.state.last5.map(x => (<View key={x.value.id}>
                    <BodyText>{x.value.joke}</BodyText>
                </View>))}
                {this.state.loading && <Progress />}
            </ScrollView>
        );
    }
}
