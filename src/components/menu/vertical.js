import React, { useState, useEffect, useRef } from "react"
import { Layout } from 'antd';
import SmallMenuItems from 'components/menu/vertical-items/small'
import LargeMenuItems from 'components/menu/vertical-items/large'
import MediumMenuItems from 'components/menu/vertical-items/medium'

const { Header } = Layout;

const VerticalMenu = ({ title, collapsed, toggle }) => {
    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    }, [])

    let MenuItems;
    if (width > 700) {
        MenuItems = <LargeMenuItems title={title} collapsed={collapsed} toggle={toggle} />;
    } else if (width > 450) {
        MenuItems = <MediumMenuItems title={title} collapsed={collapsed} toggle={toggle} />
    } else {
        MenuItems = <SmallMenuItems collapsed={collapsed} toggle={toggle} />
    }

    return (
        <Header style={{ background: '#fff', padding: 0 }}>
            <div ref={ref} style={{ textAlign: 'right', paddingRight: '12px' }}>
                {MenuItems}
            </div>
        </Header>
    )
}
export default VerticalMenu