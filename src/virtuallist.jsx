import * as React from 'react';
import { WindowScroller, List, InfiniteLoader, CellMeasurerCache, CellMeasurer } from 'react-virtualized';

class VirtualList extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.cache = new CellMeasurerCache();
    }

    isRowLoaded({ index }) {
        return index < this.props.source.length;
    }

    render() {
        return (
            <InfiniteLoader rowCount={this.props.rowCount} isRowLoaded={this.isRowLoaded.bind(this)} loadMoreRows={this.props.loadMoreRows}>
                {({ onRowsRendered, registerChild }) => {
                    return (
                        <WindowScroller scrollElement={window}>
                            {({ height, isScrolling, onChildScroll, scrollTop }) => {
                                return (
                                    <List
                                        autoHeight
                                        height={height}
                                        isScrolling={isScrolling}
                                        onScroll={onChildScroll}
                                        deferredMeasurementCache={this.cache}
                                        overscanRowCount={this.props.overscanCount}
                                        rowRenderer={this._rowRenderer.bind(this)}
                                        rowHeight={this.cache.rowHeight}
                                        rowCount={this.props.source.length}
                                        onRowsRendered={onRowsRendered}
                                        ref={registerChild}
                                        scrollTop={scrollTop}
                                        width={this.props.width}
                                    />
                                );
                            }}
                        </WindowScroller>
                    );
                }}
            </InfiniteLoader>
        );
    }

    _rowRenderer({ index, key, parent, style }) {
        const source = this.props.source;
        const item = index < source.length ? source[index] : null;

        if (!item) {
            return null;
        }

        return (
            <CellMeasurer cache={this.cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
                <div style={style}>
                    <div>{this.props.renderContent(item)}</div>
                </div>
            </CellMeasurer>
        );
    }
}

export { VirtualList };
