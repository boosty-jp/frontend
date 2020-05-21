import React from "react"
import { connect } from 'react-redux'
import { Radio } from 'antd';
import { updateMode } from "modules/book/edit/generator"

class ModeSelectorComponent extends React.Component {
    render() {
        return (
            <>
                <Radio.Group
                    value={this.props.mode}
                    defaultValue="normal"
                    style={{ marginBottom: '20px' }}
                    onChange={e => this.props.updateMode(e.target.value)}
                >
                    <Radio value="normal" >通常</Radio>
                    <Radio value="dark" >ダークモード</Radio>
                </Radio.Group>
            </>
        )
    }
}

const mapStateToProps = state => ({
    mode: state.bookGenerator.mode,
})

const mapDispatchToProps = dispatch => ({
    updateMode: (mode) => dispatch(updateMode(mode)),
})

const ModeSelector = connect(mapStateToProps, mapDispatchToProps)(ModeSelectorComponent);
export default ModeSelector