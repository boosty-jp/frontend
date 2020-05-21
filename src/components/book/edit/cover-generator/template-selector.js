import React from "react"
import { connect } from 'react-redux'
import { Radio } from 'antd';
import { updateTemplateType, updateTemplateValue } from "modules/book/edit/generator"

class TemplateSelectorComponent extends React.Component {
    render() {
        return (
            <>
                <div>
                    <Radio.Group
                        defaultValue="simple"
                        style={{ marginBottom: '20px' }}
                        value={this.props.templateType}
                        onChange={e => this.props.updateTemplateType(e.target.value)}
                    >
                        <Radio.Button value="simple">シンプル</Radio.Button>
                        <Radio.Button value="stripe">ストライプ</Radio.Button>
                        <Radio.Button value="curve">曲線</Radio.Button>
                        <Radio.Button value="pattern">模様</Radio.Button>
                    </Radio.Group>
                </div>
                <div>
                    <Radio.Group
                        defaultValue={0}
                        style={{ marginBottom: '20px' }}
                        value={this.props.templateValue}
                        onChange={e => this.props.updateTemplateValue(e.target.value)}
                    >
                        <Radio.Button value={0}>タイプ1</Radio.Button>
                        <Radio.Button value={1}>タイプ2</Radio.Button>
                        <Radio.Button value={2}>タイプ3</Radio.Button>
                        <Radio.Button value={3}>タイプ4</Radio.Button>
                        <Radio.Button value={4}>タイプ5</Radio.Button>
                    </Radio.Group>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    templateType: state.bookGenerator.templateType,
    templateValue: state.bookGenerator.templateValue,
})

const mapDispatchToProps = dispatch => ({
    updateTemplateType: (type) => dispatch(updateTemplateType(type)),
    updateTemplateValue: (value) => dispatch(updateTemplateValue(value)),
})

const TemplateSelector = connect(mapStateToProps, mapDispatchToProps)(TemplateSelectorComponent);
export default TemplateSelector