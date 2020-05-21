import React, { useState, useEffect, useRef } from "react"
import MobileGlobalMenu from 'components/menu/global/device/mobile'
import PcGlobalMenu from 'components/menu/global/device/pc'

const GlobalMenu = ({ maxWidth = 900 }) => {
    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    }, []);

    let Contents;
    if (width > maxWidth) {
        Contents = PcGlobalMenu;
    } else {
        Contents = MobileGlobalMenu;
    }

    return (
        <div ref={ref}>
            <Contents width={width} maxWidth={maxWidth} />
        </div>
    )
}

export default GlobalMenu