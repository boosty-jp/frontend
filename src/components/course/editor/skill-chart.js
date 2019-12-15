import React from 'react';
import { connect } from 'react-redux'
import { Radar, ChartCard } from 'ant-design-pro/lib/Charts';

const SkillChartComponent = ({ skillData }) => {
    return (
        skillData.length === 0 ?
            <></>
            :
            <ChartCard title="スキル一覧">
                <Radar hasLegend height={286} data={skillData} />
            </ChartCard>
    )
}

const mapStateToProps = state => ({
    skillData: state.courseEditSections.skillMaps,
})

const SkillChart = connect(mapStateToProps)(SkillChartComponent)
export default SkillChart;