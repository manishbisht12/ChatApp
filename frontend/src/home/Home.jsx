import React from 'react'

const Home = () => {
    const {authUser} = authUser();
  return (
    <div className='text-3xl'>
     Hello{authUser?.username} 
    </div>
  )
}

export default Home
