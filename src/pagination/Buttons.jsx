import React from 'react'

import { returnPaginationRange } from './AppUtilits'

export const Buttons = ({totalPage, page, limit, siblings, onPageChange}) => {

    let array = returnPaginationRange(totalPage, page, limit, siblings)
  return (
    <div>
        <div onClick={() => onPageChange("prev")}><div>prev</div></div>
        {
            array.map(value => {
                if(value === page){
                    return(
                        <div key={value}><div onClick={() => onPageChange(value)} style={{color: 'red'}}>{value}</div></div>
                    )
                }else{
                    return(
                        <div key={value}><div onClick={() => onPageChange(value)}>{value}</div></div>
                    )
                }
            })
        }
        <div onClick={() => onPageChange("next")}><div>next</div></div>
    </div>
  )
}
