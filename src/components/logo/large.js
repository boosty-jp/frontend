import React from 'react'
import LogoImage from 'images/logo.png'
import { Link } from 'gatsby'

const LargeLogo = () => {
    return (
        <Link to="/">
            < img alt="ロゴ" src={LogoImage} style={{ width: "180px", marginBottom: '0px' }} />
        </Link>
    )
}

export default LargeLogo