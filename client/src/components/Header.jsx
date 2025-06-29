import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setMode } from '../redux/gameSlice'

const Header = () => {
  const dispatch = useDispatch()
  const mode = useSelector(state => state.game.mode)
  return (
    <div className='flex w-full justify-around items-center h-[10%] text-white font-[cursive] border-b-[0.2px] border-white mb-8'>
        <div className='font-bold text-xl sm:text-[2rem]'>
            <span>Chess</span>
        </div>
        <div className='flex gap-6 sm:gap-12 h-full items-center text-[.6rem] sm:text-xl'>
            <Link
              to="/" 
              className={`${mode === "online" && "border-b-1"} border-white h-[28px] sm:h-[2rem] flex items-end`}
              onClick={()=> dispatch(setMode("online"))}
            >
              Online Game
            </Link>
            <Link 
              to="/offline" 
              className={`${mode === "offline" && "border-b-1"} border-white h-[28px] sm:h-[2rem] flex items-end`}
              onClick={()=> dispatch(setMode("offline"))}
            >
              Offline Game
            </Link>
        </div>
    </div>
  )
}

export default Header