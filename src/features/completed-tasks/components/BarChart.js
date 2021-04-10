/* eslint-disable newline-per-chained-call */
// @flow
import * as d3 from 'd3';
import React, { Component } from 'react';

import { Title } from '../styled';


type Props = {

    /**
     * Array of tasks.
     */
    data: Array<Object>;
}

type DataType = {

    date: string;
    value: number;
}


/**
 * BarChart Component.
 */
class BarChart extends Component<*, State> {

    /**
     * Initializes a new {@code BarChart} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.dimensions = { width: 400,
            height: 250,
            marginLeft: 40,
            marginRight: 20,
            marginTop: 20,
            marginBottom: 70 };
    }

    /**
     * Visualization data
     *
     * @returns {void}
     */
    componentDidMount() {
        this.drawChart();
    }

    /**
     * Update chart.
     */
    componentDidUpdate() {
        d3.select('#chart').selectAll('*').remove();
        this.drawChart();
    }

    /**
     * Function for drawing chart
     *
     * @return {void}
     */
    drawChart() {
        const dimensions = this.dimensions;
        const data = this.props.data;

        const y = d3.scaleLinear()
                .domain([ 0, d3.max(data, d => d.value + 0.5) ])
                .range([ dimensions.height, 0 ]);
        const x = d3.scaleBand()
                .domain(data.map(d => d.date))
                .range([ 0, dimensions.width ])
                .padding(0.05);

        const xAxis = d3.axisBottom(x)
                .ticks(10)
                .tickFormat(d => `${d.slice(0, 10)}`);

        const yAxis = d3.axisLeft(y)
                .ticks(d3.max(data, d => d.value + 1));

        const svg = d3.select('#chart')
            .append('svg');

        svg.attr('width', dimensions.width + dimensions.marginLeft + dimensions.marginRight)
                .attr('height', dimensions.height + dimensions.marginTop + dimensions.marginBottom)
                .append('g')
                .attr('transform',
                    `translate(${dimensions.marginLeft},${dimensions.marginTop})`);
        svg
            .append('g')
            .attr(
                'transform',
                `translate(${dimensions.marginLeft}, ${
                    dimensions.height
                })`
            )
            .call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '-.55em')
            .attr('transform', 'rotate(-90)');

        svg
            .append('g')
            .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Value ($)');

        svg
            .append('g')
            .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('id', (_, i) => `${i}`)
            .attr('value', d => d.value)
            .attr('width', x.bandwidth)
            .attr('height', 0)
            .attr('fill', 'orange')
            .attr('x', d => x(d.date))
            .attr('height', 0)
            .attr('y', dimensions.height)
            .transition()
            .duration(500)
            .delay((_, i) => i * 100)
            .attr('height', d => dimensions.height - y(d.value))
            .attr('y', d => y(d.value));

        svg.append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('x', -35)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .attr('fill', '#fff')
            .text('Кол-во сделанных задач');
    }

    /**
     * Render function of component.
     *
     * @returns {ReactElement}
     */
    render() {
        return (
            <>
                <div id='chart' />
                <div id='info' />
            </>
        );
    }
}

export default BarChart;
