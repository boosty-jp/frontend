import React from "react"
import { connect } from 'react-redux'
import { Button } from 'antd';

class AddButtonComponent extends React.Component {
    render() {
        return (
            <Button
                shape="round"
                style={{
                    borderColor: '#F7FAFF',
                    color: '#1890ff',
                    fontWeight: '500',
                    fontSize: '16px',
                    background: '#F7FAFF',
                    boxShadow: '5px 5px 10px #a3a5a8, -5px -5px 10px #ffffff',
                }}
                size="large"
                icon="plus"
                block
            >本棚に追加する</Button >
        )
    }
}

const mapStateToProps = state => ({
    id: state.bookView.id,
})

const AddButton = connect(mapStateToProps)(AddButtonComponent);
export default AddButton