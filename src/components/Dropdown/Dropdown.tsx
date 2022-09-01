import React, { useState } from 'react'

import "./dropdown.scss"

interface IProps {
    selected: string,
    options: string[],
    setSelected: (selectedOpt: any) => void,
}

export const Dropdown: React.FC<IProps> = ({ selected, setSelected, options}) => {

    const [isActive, setIsActive] = useState(false)


    return (
        <div className='dropdown'>
            <div onClick={() => setIsActive(!isActive)} className="dropdown__btn">
                <div className={`dropdown__btn_leftBlock`}>
                    <span>{selected}</span>
                </div>
                
            </div>

            {isActive && (
                <div className={`dropdown__content`}>
                    {
                        options.map((option, id) => (
                            <div key={id} className="dropdown__content_item" onClick={() => {
                                setSelected(option)
                                setIsActive(false)
                            }}>
                                <span> {option}</span>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}
