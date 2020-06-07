import React from 'react'
import LogoImage from 'images/logo.png'
import { Link } from 'gatsby'

const Logo = ({ noLink = false }) => {
    if (noLink) {
        return (
            < img alt="ロゴ" src={LogoImage} style={{ width: "120px", marginBottom: '0px' }} />
        )
    }
    return (
        <Link to="/home">
            < img alt="ロゴ" src={LogoImage} style={{ width: "120px", marginBottom: '0px' }} />
        </Link>
    )
}

export default Logo