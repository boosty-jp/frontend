// import React from 'react';
// import { connect } from 'react-redux'
// import { Radar, ChartCard } from 'ant-design-pro/lib/Charts';

// const SkillChartComponent = ({ skillData }) => {
//     return (
//         skillData.length === 0 ?
//             <></>
//             :
//             <ChartCard title="スキル一覧">
//                 <Radar hasLegend height={286} data={skillData} />
//             </ChartCard>
//     )
// }

// const mapStateToProps = state => ({
//     skillData: state.courseEditSections.skillMaps,
// })

// const SkillChart = connect(mapStateToProps)(SkillChartComponent)
// export default SkillChart;

import React, { PureComponent } from 'react';
import {
    PieChart, Pie, Legend, Cell
} from 'recharts';

const data01 = [
    { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];
const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'C1', value: 100 },
    { name: 'C2', value: 200 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 },
];
const COLORS = [
    "#65d3da",
    "#79d69f",
    "#fad144",
    "#d76c6c",
    "#138185",
    "#26a0a7",
    "#ec983d",
    "#cbe989",
    "#138185",
    "#f9ec86",
    "#26a0a7",
    "#ebf898"
];

export default class ExampleChart extends PureComponent {
    render() {
        return (
            <>
                <PieChart width={400} height={400}>
                    <Legend verticalAlign="top" height={36} />
                    <Pie data={data01} dataKey="value" cx={200} cy={200} outerRadius={60} fill="#8884d8" >
                        {data01.map((d, idx) => (
                            <Cell fill={COLORS[idx]} key={idx} />
                        ))}
                    </Pie>
                    <Pie data={data02} dataKey="value" cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label >
                        {data02.map((d, idx) => (
                            <Cell fill={COLORS[idx]} key={idx} />
                        ))}
                    </Pie>
                </PieChart>
            </>
        );
    }
}
