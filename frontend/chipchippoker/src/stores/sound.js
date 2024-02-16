import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import mainBgm from '@/assets/bgm/mainBgm.mp3'
import gameBgm from '@/assets/bgm/gameBgm.mp3'
import alarm from '@/assets/bgm/alarm.mp3'
import cardshuffle from '@/assets/bgm/cardshuffle.mp3'
import cardFlip from '@/assets/bgm/cardFlip.wav'
import chipsound from '@/assets/bgm/chipsound.mp3'
import hover from '@/assets/bgm/hover.mp3'

import gameStart from '@/assets/bgm/gameStart.mp3'
import turnChange from '@/assets/bgm/turnChange.mp3'

import winGame from '@/assets/bgm/winGame.mp3'
import loseGame from '@/assets/bgm/loseGame.mp3'
import winRound from '@/assets/bgm/winRound.mp3'
import loseRound from '@/assets/bgm/loseRound.mp3'

export const useSoundStore = defineStore('sound', () => {
    // 설정 음향 사운드
    const bgmSoundRange = ref(100)
    const effectSoundRange = ref(100)
    const isBgmPlay = ref(false)

    //   음향 객체
    const mainBgmAudio = new Audio(mainBgm)
    const gameBgmAudio = new Audio(gameBgm)

    // 음향 실시간 적용
    watch([bgmSoundRange,effectSoundRange], () => {
      mainBgmAudio.volume = bgmSoundRange.value/100
      gameBgmAudio.volume = bgmSoundRange.value/100
    })

    // 메인 bgm
    const mainBgmOn = async function(){
      // bgm.pause()
      isBgmPlay.value = true
      mainBgmAudio.loop = true
      await mainBgmAudio.play()
    }
    const mainBgmOff = async function(){
      mainBgmAudio.pause()
      isBgmPlay.value = false
    }
    
    // 게임 bgm
    const gameBgmOn = async function () {
      isBgmPlay.value = true
      gameBgmAudio.loop = true
      gameBgmAudio.volume = bgmSoundRange.value/100
      gameBgmAudio.currentTime = 0;
      await gameBgmAudio.play()
    }
    const gameBgmOff = async function(){
      gameBgmAudio.pause()
      isBgmPlay.value = false
    }

    // 음향 플레이 함수
    const alarmAudio = new Audio(alarm);
    const alarmSound = async function(){
      alarmAudio.volume = effectSoundRange.value/100
      alarmAudio.currentTime = 0;
      await alarmAudio.play()
    }

    // 카드 섞기
    const cardshuffleAudio = new Audio(cardshuffle);
    const cardshuffleSound = async function(){
      cardshuffleAudio.currentTime = 0;
      cardshuffleAudio.volume = effectSoundRange.value/100
      await cardshuffleAudio.play()
    }

    // 카드 뒤집기
    const cardFlipAudio = new Audio(cardFlip);
    const cardFlipSound = async function(){
      cardFlipAudio.currentTime = 0;
      cardFlipAudio.volume = effectSoundRange.value/100
      await cardFlipAudio.play()
    }

    // 코인 사운드
    const chipsoundAudio = new Audio(chipsound);
    const chipsoundSound = async function(){
      chipsoundAudio.currentTime = 0 
      chipsoundAudio.volume = effectSoundRange.value/100
      await chipsoundAudio.play()
    }
    
    // 게임 시작 사운드
    const gameStartAudio = new Audio(gameStart)
    const gameStartSound = async function () {
      gameStartAudio.currentTime = 0
      gameStartAudio.volume = effectSoundRange.value/100
      await gameStartAudio.play()
    }

    // 게임 승리 사운드
    const winGameAudio = new Audio(winGame);
    const winGameSound = async function(){
      winGameAudio.currentTime = 0;
      winGameAudio.volume = effectSoundRange.value/100
      await winGameAudio.play()
    }
    
    // 게임 패배 사운드
    const loseGameAudio = new Audio(loseGame);
    const loseGameSound = async function(){
      loseGameAudio.currentTime = 0
      loseGameAudio.volume = effectSoundRange.value/100
      await loseGameAudio.play()
    }

    // 라운드 승리 사운드
    const winRoundAudio = new Audio(winRound)
    const winRoundSound = async function () {
      winRoundAudio.currentTime = 0
      winRoundAudio.volume = effectSoundRange.value/100
      await winRoundAudio.play()
    }

    // 라운드 패배 사운드
    const loseRoundAudio = new Audio(loseRound)
    const loseRoundSound = async function () {
      loseRoundAudio.currentTime = 0
      loseRoundAudio.volume = effectSoundRange.value/100
      await loseRoundAudio.play()
    }

    // 턴 변경 사운드
    const turnChangeAudio = new Audio(turnChange)
    const turnChangeSound = async function () {
      turnChangeAudio.currentTime = 0
      turnChangeAudio.volume = effectSoundRange.value/100
      await turnChangeAudio.play()
    }

    // 호버 사운드
    const hoverAudio = new Audio(hover);
    const hoverSound = async function(){
      hoverAudio.currentTime = 0;
      hoverAudio.volume = effectSoundRange.value/100
      await hoverAudio.play()
    }

  return {
    bgmSoundRange, effectSoundRange, isBgmPlay,
    mainBgmOn, mainBgmOff, gameBgmOn, gameBgmOff,
    alarmSound, cardshuffleSound, cardFlipSound, chipsoundSound,
    gameStartSound, turnChangeSound,
    winRoundSound, loseRoundSound, winGameSound, loseGameSound,
    hoverSound
  }
},{persist:true})
