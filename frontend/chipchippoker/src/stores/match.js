import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from './user'
import { useGameStore } from './game'
import { useRoomStore } from './room'
import { useOpenviduStore } from './openvidu'

export const useMatchStore = defineStore('match', () => {
  const userStore = useUserStore()
  const gameStore = useGameStore()
  const roomStore = useRoomStore()
  const openviduStore = useOpenviduStore()
  const MATCH_API = `${userStore.BASE_API_URL}/matching`
  const router = useRouter()
  
  const roomId = ref('')
  const title = ref('')
  const totalParticipantCnt = ref(0)

  const isSearching = ref(false)    // 경쟁전 매칭 중
  const isMatch = ref(false)        // 
  const isNotExistRoom = ref(false)  // 친선전 남는 방이 없음

  // 경쟁전 빠른 시작
  const matchCompete = async function(payload) {
    try {
      const response = await axios({
        method: 'post',
        url: `${MATCH_API}/competition`,
        headers: { 'access-token': userStore.accessToken },
        data: payload
      })
      const res = response.data
      isSearching.value = true
      roomId.value = res.data.roomId
      title.value = res.data.title
      totalParticipantCnt.value = res.data.totalParticipantCnt
      roomStore.roomId = res.data.roomId
      roomStore.title = res.data.title
      roomStore.totalParticipantCnt = res.data.totalParticipantCnt
      openviduStore.joinSession()
      gameStore.subscribeHandler(title.value)
      return res.code
    } catch (err) {
      if (err.response.data.code === 'FB010') {
        alert('이미 방에 입장해있습니다')
      }
      return console.log(err)
    }
  } 

  // 친선전 빠른 시작
  const matchFriend = async function(payload) {
    try {
      const response = await axios({
        method: 'post',
        url: `${MATCH_API}/friendly`,
        headers: { 'access-token': userStore.accessToken },
        data: payload
      })
      const res = response.data
      if (Object.keys(res.data).length === 0) {
        isNotExistRoom.value = true
        return false
      } else {
        roomId.value = res.data.roomId
        title.value = res.data.title
        totalParticipantCnt.value = res.data.totalParticipantCnt
        roomStore.roomId = res.data.roomId
        roomStore.title = res.data.title
        roomStore.totalParticipantCnt = res.data.totalParticipantCnt
        isNotExistRoom.value = false
        gameStore.subscribeHandler(title.value)
        setTimeout(() => {
          gameStore.sendJoinRoom(title.value)
        }, 100)
        return true
      }
    } catch (err) {
      if (err.response.data.code === 'FB010') {
        alert('이미 방에 입장해있습니다')
      }
      return err.response.data.code
    }
  }  

  // 빠른 게임 찾기 중단
  const stopFindGame = function () {
    axios({
      method: 'post',
      url: `${MATCH_API}/quit`,
      headers: { 'access-token': userStore.accessToken }
    })
    .then(response => {
      const res = response.data
      gameStore.sendExitRoom(title.value)
      roomId.value = ''
      title.value = ''
      totalParticipantCnt.value = 0
      roomStore.roomId = ''
      roomStore.title = ''
      roomStore.totalParticipantCnt = 0
      isSearching.value = false
      // 게임나가기 send
      openviduStore.leaveSession()
      gameStore.resetGameStore()
    })
    .catch(err => console.log(err))
  } 

  return {
    // 경쟁전 빠른 시작
    matchCompete, roomId, title, totalParticipantCnt, isMatch, isSearching,
    // 친선전 빠른 시작
    matchFriend, isNotExistRoom,
    // 빠른 게임 찾기 중단
    stopFindGame
  }
},{persist:true})
