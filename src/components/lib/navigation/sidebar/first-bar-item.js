import React from "react"
import { Tooltip } from 'antd';
import { Link } from "gatsby";
import style from "styles/lib/navigation/sidebar/first-bar-item.mod.scss";

const FirstBarUpperItem = ({ title, icon, link, isActive, isLower = false }) => {
    const linkClass = isActive ? style.activeLink : style.link;
    const itemClass = isLower ? style.lowerItem : style.upperItem;

    return (
        <div className={itemClass}>
            <Tooltip placement="right" title={title} align={{ offset: [17, 0] }} arrowContent={true}>
                <Link to={link} className={linkClass}>
                    {icon}
                </Link>
            </Tooltip>
        </div>
    )
}

export default FirstBarUpperItem;