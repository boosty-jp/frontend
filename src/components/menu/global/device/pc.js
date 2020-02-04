import React from "react"
import { Layout, Row, Col } from 'antd';
import LogoImage from "components/image/logo";
import SearchComponent from "components/menu/items/search";
import OwnBooksIcon from "components/menu/items/own-books-icon";
import AccountDropdown from "components/menu/items/account-dropdown";
import { isLoggedIn } from "services/local-user";
import GuestButtons from "components/menu/items/guest";

const { Header } = Layout;

const UserItems = () => {
    if (!isLoggedIn()) {
        return (<GuestButtons />)
    }
    return (
        <>
            <OwnBooksIcon />
            <AccountDropdown />
        </>
    )
}

const PcGlobalMenu = () => {
    return (
        <Header style={{ backgroundColor: 'white', }}>
            <div style={{ maxWidth: "900px", margin: 'auto', padding: '0px 20px' }}>
                <Row type="flex" align="middle" >
                    <Col span={8}>
                        <LogoImage />
                    </Col>
                    <Col span={16} style={{ textAlign: 'right' }}>
                        <SearchComponent width={320} />
                        <UserItems />
                    </Col >
                </Row>
            </div>
        </Header >
    )
}

export default PcGlobalMenu