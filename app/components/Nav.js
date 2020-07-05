import React from 'react';

import { ThemeConsumer } from '../contexts/theme'

export default function Nav() {


    return (
        <ThemeConsumer>
            {({ theme, toogleTheme }) => (
                <nav className='row space-between'>
                    <button
                        style={{ fontSize: 30 }}
                        className='btn-clear'
                        onClick={toogleTheme}
                    >
                        {theme === 'light' ? '🔦' :'💡'}
                    </button>
                </nav>

            )}
        </ThemeConsumer>
    )
}