import React from 'react'
import { useState } from 'react'

const LanguageSwitcher = () => {
    const [currentLang, setCurrentLang] = useState("EN");
    const [open, setOpen] = useState(false)
    const languages = ["EN" , "VI"]

  return (
    <div className="relative">
        <button
        onClick={() => setOpen(!open)}
        >
            {currentLang} <span><i className="ri-arrow-down-wide-line"></i></span>

        </button>

        { open && (
            <ul className='absolute right-0 bg-gray-50 py-2 px-6'>
                {languages.map((lang)=> (
                    <li
                    key={lang}
                    onClick={()=> {
                        setCurrentLang(lang);
                        setOpen(false);
                    }}
                    className='font-medium py-1'
                    >
                        {lang}
                    </li>
                ))}
            </ul>
        )
            
        }
    </div>
  )
}

export default LanguageSwitcher