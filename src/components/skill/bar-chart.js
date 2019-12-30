import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


const SkillBarChart = ({ data, colors }) => {
    if (data.length > 5) {
        return (
            <ResponsiveContainer width="100%" height={30 * data.length + 40}>
                {/* <ResponsiveContainer width="100%" > */}
                <BarChart
                    height={180}
                    data={data}
                    layout="vertical"
                >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis type="number" hide domain={[0, 'dataMax']} />
                    <YAxis dataKey="name" type="category" tickLine={false} allowDataOverflow width={100} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="easy" name="初級" stackId="a" fill={colors[0]} barSize={15} >
                    </Bar>
                    <Bar dataKey="middle" name="中級" stackId="a" fill={colors[1]} barSize={15}>
                    </Bar>
                    <Bar dataKey="hard" name="上級" stackId="a" fill={colors[2]} barSize={15}>
                    </Bar>
                    <Legend iconType="square" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
    return (
        <ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
            {/* <ResponsiveContainer width="100%" > */}
            <BarChart
                height={180}
                data={data}
                layout="vertical"
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis type="number" hide domain={[0, 'dataMax']} />
                <YAxis dataKey="name" type="category" tickLine={false} allowDataOverflow width={90} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="easy" name="初級" stackId="a" fill={colors[0]} barSize={15} >
                </Bar>
                <Bar dataKey="middle" name="中級" stackId="a" fill={colors[1]} barSize={15}>
                </Bar>
                <Bar dataKey="hard" name="上級" stackId="a" fill={colors[2]} barSize={15}>
                </Bar>
                <Legend iconType="square" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default SkillBarChart;