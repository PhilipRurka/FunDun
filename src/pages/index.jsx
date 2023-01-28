import React from 'react'
import Core from "../components/Core"
import { Base } from '../styled/base'
import { HomepageWrapper } from "../styled/homepage"

const Homepage = () => {
  return (
    <>
      <Base />
      <HomepageWrapper>
        <Core />
      </HomepageWrapper>
    </>
  )
}

export default Homepage