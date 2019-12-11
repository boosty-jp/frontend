import React from "react"

const Icons = ({ icons }) => (
    <ul className="ant-list-item-action" style={{ marginLeft: '0px' }}>
        {icons.map((i, idx) => {
            const isLast = idx === icons.length - 1
            return (
                <li key={"topic-curriculum-icons-" + idx}>
                    {i}
                    {!isLast &&
                        <em className="ant-list-item-action-split"></em>
                    }
                </li>
            )
        })}
    </ul>
)
export default Icons