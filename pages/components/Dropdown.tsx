import React from 'react'

interface Props {
	items: string[]
	name : string
	onChange: React.ChangeEventHandler
}

export default function Dropdown({ items=[], name, onChange }: Props) {
	return (
		<div className='dropdown'>
			<label htmlFor={name} >{name}</label>
			<select name={name} onChange={onChange} itemType={"select"}>
			{
				items.map(
					each => <option key={each} value={each}>{each}</option>
				)
			}
			</select>
		</div>
	)
}