import React, { useState, useEffect, useRef } from "react"
import { Layout } from 'antd';
import SmallMenuItems from 'components/menu/horizontal-items/small'
import LargeMenuItems from 'components/menu/horizontal-items/large'
import MediumMenuItems from 'components/menu/horizontal-items/medium'

const { Header } = Layout;


const HorizontalMenu = () => {
    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    })

    let MenuItems;
    if (width > 700) {
        MenuItems = LargeMenuItems;
    } else if (width > 500) {
        MenuItems = MediumMenuItems
    } else {
        MenuItems = SmallMenuItems
    }
    // 何もしなければデフォルトで3分割される

    return (
        <Header style={{ background: '#fff', padding: '0px' }} >
            <div ref={ref} style={{ maxWidth: '100%', width: "1250px", margin: 'auto', padding: '0 20px 0 20px', position: 'relative' }}>
                <MenuItems />
            </div>
        </Header>
    )
}
export default HorizontalMenu