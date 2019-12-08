import React from "react"
import { Input, Icon } from 'antd';
import UserButtons from "components/menu/buttons/user";
import styled from 'styled-components'

const RoundSearch = styled(Input.Search)`
  .ant-input {
    border-radius: 500rem;
  }
`;

const LargeVerticalMenuItems = ({ title, collapsed, toggle }) => {
    return (
        <>
            <span style={{ float: 'left', marginLeft: '20px', fontSize: '20px' }}>
                <Icon
                    className="trigger"
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={toggle}
                    style={{ marginRight: '12px' }}
                />
                {title}
            </span>
            <RoundSearch
                placeholder="検索する"
                onSearch={value => console.log(value)}
                onChange={e => console.log(e.target.value)}
                style={{ width: 280, height: 32, marginRight: '12px' }}
            />
            <UserButtons />
        </>
    )
}
export default LargeVerticalMenuItems