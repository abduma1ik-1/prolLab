import React from 'react'

export const Modal = ({active, setActive, content, item}) => {
  return (
    <div className={`modal ${active ? 'active' : ''}`} onClick={() => setActive(false)}>
        <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            {content}
        </div>
    </div>
  )
}
