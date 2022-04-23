import React from 'react'
import styles from "../../styles/RightSideBar.module.css"

export default function RightSideBar({ className, click }) {
	return (
		<div className={className}>
			<button
				onClick={click}
				type="button"
				className={styles.button}
			>Deminify</button>
		</div>
	)
}