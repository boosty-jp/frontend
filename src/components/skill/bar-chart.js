import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    {
        name: 'Java', middle: 4000, hard: 2400, easy: 2400,
    },
    {
        name: 'Ruby', middle: 3000, hard: 1398, easy: 2210,
    },
    {
        name: 'C++', middle: 2000, hard: 9800, easy: 2290,
    },
];

export default class SkillBarChart extends PureComponent {
    render() {
        return (
            <BarChart
                width={400}
                height={180}
                data={data}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
                layout="vertical"
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="easy" stackId="a" fill="#138185" />
                <Bar dataKey="middle" stackId="a" fill="#8884d8" />
                <Bar dataKey="hard" stackId="a" fill="#82ca9d" />
            </BarChart>
        );
    }
}
