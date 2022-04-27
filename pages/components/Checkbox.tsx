import React from 'react'

export default function Checkbox({ name, value, onChange }) {
	return (
		<div className='checkbox'>
			<label htmlFor='vals'>
				<input type="checkbox" checked={value} onChange={onChange} />
				{name}
			</label>
		</div>
	)
}