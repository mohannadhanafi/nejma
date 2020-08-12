import React from 'react'
import './index.scss'

export default function SideWrapper(props) {
    const className = `payment-side-wrapper ${props.className}`
    // preview-no-padding
    return (
        <div className={className}>
            {props.children}
        </div>
    )
}
