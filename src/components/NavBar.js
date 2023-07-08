import React from 'react'
import { CustomLink } from './CustomLink'

function NavBar (){
        return (
            <>
            <header>
                <CustomLink to="/events">Создать событие</CustomLink>
                <CustomLink to="/all">Посмотреть события</CustomLink>
                <CustomLink to="/schedule">Расписание</CustomLink>
                <CustomLink to="/students">Студенты</CustomLink>
                <CustomLink to="/auth">Выход</CustomLink>
            </header>
            </>
        )
    }
export default NavBar