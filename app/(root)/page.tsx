import Header from '@/components/Header'
import React from 'react'

const Home = () => {
    const LoggedIn = { firstName: 'Manish' };
    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <Header type="greeting" title="Good Morning" user={LoggedIn?.firstName} subtext="Manage and Be productive" />
                </header>
            </div>

        </section>
    )
}

export default Home