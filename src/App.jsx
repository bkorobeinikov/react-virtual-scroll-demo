import React, { Component } from 'react';
import './App.css';
import { VirtualList } from './virtuallist';
import { AutoSizer } from 'react-virtualized';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class App extends Component {
    constructor(props, context) {
        super(props, context);

        const data = [];
        for (var i = 0; i < 100; i++) {
            data.push(this.generateRandomItem(i));
        }

        this.state = {
            rowCount: 10000,
            data,
        };

        this.loadMoreRows = this.loadMoreRows.bind(this);
    }

    loadMoreRows() {
        const data = this.state.data.slice(0);
        for (var i = this.state.data.length; i < this.state.rowCount; i++) {
            data.push(this.generateRandomItem(i));
        }

        this.setState({
            data,
        });
    }

    generateRandomItem(id) {
        return {
            id,
            height: Math.max(Math.floor(Math.random() * Math.floor(300)), 50),
            color: getRandomColor(),
        };
    }

    render() {
        return (
            <div className="App">
                <AutoSizer disableHeight>
                    {({ width }) => {
                        return (
                            <VirtualList
                                overscanCount={2}
                                width={width}
                                source={this.state.data}
                                rowCount={this.state.rowCount}
                                loadMoreRows={this.loadMoreRows}
                                renderContent={item => <div style={{ height: item.height, backgroundColor: item.color }}>{item.id}</div>}
                            />
                        );
                    }}
                </AutoSizer>
            </div>
        );
    }
}

export default App;
