import React from 'react'
import styles from "../../styles/RightSideBar.module.css"
import Dropdown from './Dropdown'

export default function RightSideBar({ className, click, options, handleChange, theme_options, themeChange }) {
	return (
		<div className={className}>
			<button
				onClick={click}
				type="button"
				className={styles.button}
			>Deminify</button>
			<Dropdown items={options} name={"Tab Size"} onChange={handleChange} />
			<Dropdown items={theme_options} name={"Theme"} onChange={themeChange} />
		</div>
	)
}