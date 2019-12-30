import React from 'react';
import {
    PieChart, Pie, Sector, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const SkillPieChart = ({ data, colors }) => {
    return (
        <ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
            <PieChart >
                <Pie
                    data={data}
                    labelLine={false}
                    label={renderCustomizedLabel}
                >
                    {
                        data.map((entry) => {
                            if (entry.name === 'hard') {
                                return <Cell name="上級" fill={colors[2]} />
                            } else if (entry.name === 'medium') {
                                return <Cell name="中級" fill={colors[1]} />
                            } else if (entry.name === 'easy') {
                                return <Cell name="初級" fill={colors[0]} />
                            }
                            return <></>
                        })
                    }
                </Pie>
                <Legend iconType="square" margin={{ top: 10 }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default SkillPieChart;