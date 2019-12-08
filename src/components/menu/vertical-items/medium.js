import React from "react"
import { Input, Drawer, Icon, } from 'antd';
import UserButtons from "components/menu/buttons/user";

class MediumVerticalMenuItems extends React.Component {
    state = { onSearch: false };

    showSearch = () => this.setState({ onSearch: true });

    closeSearch = () => this.setState({ onSearch: false });


    render() {
        return (
            <>
                <span style={{ float: 'left', marginLeft: '20px', fontSize: '20px' }}>
                    <Icon
                        className="trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.toggle}
                        style={{ marginRight: '12px' }}
                    />
                    {this.props.title}
                </span>
                <Icon type="search" style={{ marginRight: '20px', fontSize: '20px' }} onClick={this.showSearch} />
                <UserButtons />
                <Drawer
                    title={
                        <Input.Search
                            placeholder="検索ワードを入力してください"
                            onSearch={value => console.log(value)}
                            style={{ width: '90%' }}
                        />
                    }
                    closable={true}
                    placement="top"
                    onClose={this.closeSearch}
                    visible={this.state.onSearch}
                    height={60}
                >
                </Drawer>

            </>
        )
    }
}
export default MediumVerticalMenuItems