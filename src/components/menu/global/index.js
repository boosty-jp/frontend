import React, { useState, useEffect, useRef } from "react"
import MobileGlobalMenu from 'components/menu/global/device/mobile'
import PcGlobalMenu from 'components/menu/global/device/pc'

const GlobalMenu = () => {
    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    }, []);

    let Contents;
    if (width > 900) {
        Contents = PcGlobalMenu;
    } else {
        Contents = MobileGlobalMenu;
    }

    return (
        <div ref={ref}>
            <Contents width={width} />
        </div>
    )
}

export default GlobalMenu