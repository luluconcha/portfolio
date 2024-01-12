
import { useState, useEffect } from 'react'
export default function Skills({data, id}) {
  

  function setHighlighted(){
    if (data) {
      data.map((d) => {
      return (<div key={d.id} className="skills-list">
         {d.skills.map((s) => <p key={s.id} className={s.parentID === id ? "highlighted-skill" : "normal-skill" } onMouseOver={() => console.log(s.parentID)}>
            {s.skill}
          </p>)}
      </div>)
    })}
  }
  useEffect(() => {
    setHighlighted()
  }, [id])


  return (
    <div className="all-skills">what I learned

      {data && data.reverse().map((d) => {
        return (<div className="skills-list">
           {d.skills.map((s) => <p className={s.parentID === id ? "normal-skill" : "highlighted-skill"} onMouseOver={() => console.log(s.parentID)}>
              {s.skill}
            </p>)}
        </div>)
      })}
    </div>
  )
}
