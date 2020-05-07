import React from "react"
import { connect } from 'react-redux'
import { Radio } from 'antd';
import { updateColor } from "modules/book/edit/generator"

export const coverThemeColors = [
    // "#ffccc7",
    // "#ffd8bf",
    // "#ffe7ba",
    // "#fff1b8",
    // "#d9f7be",
    // "#b5f5ec",
    // "#bae7ff",
    // "#d6e4ff",
    // "#efdbff",
    // "#ffd6e7",
    "#f5222d",
    "#fa541c",
    "#fa8c16",
    "#faad14",
    "#fadb14",
    "#a0d911",
    "#52c41a",
    "#13c2c2",
    "#1890ff",
    "#2f54eb",
    "#722ed1",
    "#eb2f96"
]

const ColorBlock = ({ color }) => {
    return (
        <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: color }}></div>
    )
}
class ColorSelectorComponent extends React.Component {
    render() {
        return (
            <>
                <Radio.Group
                    value={this.props.color}
                    defaultValue="#ffccc7"
                    style={{ marginBottom: '20px' }}
                    onChange={e => this.props.updateColor(e.target.value)}
                >
                    {coverThemeColors.map(color => {
                        return (
                            <Radio.Button key={color} value={color} style={{ padding: '6px' }}>
                                <ColorBlock color={color} />
                            </Radio.Button>
                        )
                    })}
                </Radio.Group>
            </>
        )
    }
}

const mapStateToProps = state => ({
    color: state.bookGenerator.color,
})

const mapDispatchToProps = dispatch => ({
    updateColor: (color) => dispatch(updateColor(color)),
})

const ColorSelector = connect(mapStateToProps, mapDispatchToProps)(ColorSelectorComponent);
export default ColorSelector