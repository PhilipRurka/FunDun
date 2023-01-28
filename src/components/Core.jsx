import React, { useCallback, useRef } from 'react'
import { useEffect, useMemo, useState } from "react"
import { colors } from "../styled/base"
import {
  ButtonWrapper,
  CoreWrapper,
  CoreContainer,
  Level,
  Score,
  Title,
  StatusWrapper,
  Status
} from "../styled/core"
import Button from "./Button"
import { getContrast } from '../utils/getContrast'

const INTERVAL_ADJUST = 300

const INIT_STATE = {
  score: 0,
  level: 1,
  bgColorPosition: 0,
  buttonColorPosition: 0,
  hasLost: false,
  intervalTime: 3000
}

const Core = () => {
  const bgIntervalRef = useRef()
  const [score, setScore] = useState(INIT_STATE.score)
  const [level, setLevel] = useState(INIT_STATE.level)
  const [bgColorPosition, setBgColorPosition] = useState(INIT_STATE.bgColorPosition)
  const [buttonColorPosition, setButtonColorPosition] = useState(INIT_STATE.buttonColorPosition)
  const [hasLost, setHasLost] = useState(INIT_STATE.hasLost)
  const [intervalTime, setIntervalTime] = useState(INIT_STATE.intervalTime)

  const randomColor = useCallback(() => {
    let array = [...colors]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array
  }, [])

  const buttonColorList = useMemo(() => {
    const buttonList = randomColor()
    return buttonList
  }, [])
  
  const bgColorList = useMemo(() => {
    const colorList = randomColor()
    return colorList
  }, [score])

  const handleBgInterval = useCallback(() => {
    setBgColorPosition(bgColorPosition + 1)
  }, [bgColorPosition, bgColorList])

  const fontColor = useMemo(() => {
    const colorContrast = getContrast(bgColorList[bgColorPosition])

    return colorContrast
  }, [bgColorPosition, bgColorList])

  const handleStopClick = () => {
    if(buttonColorList[buttonColorPosition] === bgColorList[bgColorPosition]) {
      setScore(score + 1)
      nextStage()

    } else {
      setHasLost(true)
    }
  }

  const nextStage = () => {
    setButtonColorPosition(buttonColorPosition + 1)
    setBgColorPosition(INIT_STATE.bgColorPosition)
    setIntervalTime(intervalTime - INTERVAL_ADJUST)
  }

  const handleResetClick = () => {
    setScore(INIT_STATE.score)
    setLevel(INIT_STATE.level)
    setBgColorPosition(INIT_STATE.bgColorPosition)
    setButtonColorPosition(INIT_STATE.buttonColorPosition)
    setHasLost(INIT_STATE.hasLost)
    setIntervalTime(INIT_STATE.intervalTime)
  }

  useEffect(() => {
    clearInterval(bgIntervalRef.current)
  }, [hasLost])

  useEffect(() => {
    if(bgColorPosition > bgColorList.length - 1) {
      setHasLost(true)
      return
    }
    
    bgIntervalRef.current = setInterval(handleBgInterval, intervalTime)

    return () => {
      clearInterval(bgIntervalRef.current)
    }
  }, [bgColorList, bgColorPosition, intervalTime])

  return (
    <CoreWrapper
      bgColor={bgColorList[bgColorPosition]}
      fontColor={fontColor} >
      <CoreContainer>
        <Title>The color change challenge</Title>
        <StatusWrapper isExpanded={hasLost}>
          <Status>
          Nope, try again!
          </Status>
        </StatusWrapper>
        <Score>Score: {score}</Score>
        <ButtonWrapper>
          <Button
            bgColor={buttonColorList[buttonColorPosition]}
            handleOnClick={handleStopClick} >
            Stop
          </Button>
          <Button
            bgColor='#000000'
            handleOnClick={handleResetClick} >
            Reset
          </Button>
        </ButtonWrapper>
        <Level>Level: {level}</Level>
      </CoreContainer>
    </CoreWrapper>
  )
}

export default Core