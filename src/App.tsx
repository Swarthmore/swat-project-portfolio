import * as React from "react";

interface Props {
    name: string
}

class App extends React.Component<Props> {
    render() {
        const { name } = this.props;
        return (
            <div>
                <h1>
                    Hello {name}
                </h1>
            </div>
        );
    }
}

export default App;
