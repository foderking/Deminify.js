import React from 'react'
import styles from "../../styles/RightSideBar.module.css"
import Checkbox from './Checkbox'
import Dropdown from './Dropdown'

export default function RightSideBar({ className, click, options, handleChange, theme_options, themeChange, checkName, checkValue, checkOnchange }) {
	return (
		<div className={className}>
			<div className={styles.navbar}>
				<span className={styles.active}></span>
				<span></span>
			</div>
			<div className={styles.main}>
				<h3> Basic </h3>
				<Dropdown items={options}    name={"Tab Size"} onChange={handleChange} />
				<Dropdown items={theme_options} name={"Theme"} onChange={themeChange}  />
				<Checkbox value={checkValue} name={checkName} onChange={checkOnchange} />
				<div className={styles.center}>
					<button onClick={click} type="button" className={styles.button} >
						Deminify
					</button>
				</div>
			</div>
		</div>
	)
}