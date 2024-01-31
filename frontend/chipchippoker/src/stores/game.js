import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

// import SockJS from 'sockjs-client'
import webstomp from 'webstomp-client'
import { useUserStore } from './user'
import { useRoomStore } from './room'
import { useMatchStore } from './match'  

export const useGameStore = defineStore('game', () => {
  const userStore = useUserStore()
  const roomStore = useRoomStore()
  const matchStore = useMatchStore()
  const router = useRouter()

  const url = `ws://i10a804.p.ssafy.io:8082/chipchippoker`

  // const sock = new SockJS("wss://i10a804.p.ssafy.io/chipchippoker")
  const stompClient = webstomp.client(url)

  // 게임 정보
  const gameRoomTitle = ref('')

  const receiveMessage = ref('')

  // const totalParticipantCnt = ref(0)
  const roomInfo = ref({})
  const player = ref([])  // 방에 있는 플레이어들 닉네임 순서
  const roomManagerNickname = ref('')
  const countOfPeople = ref(0)
  const myId = ref('')
  const isMatch = ref(false)


  // 게임 관련 데이터 -> 라운드상태, 최근라운드, 턴, 게임 멤버 정보, 배팅 정보
  const roundState = ref(false)
  const currentRound = ref(0)
  const yourTurn = ref(null)
  const gameMemberInfos = ref([])
  const bettingCoin = ref(0)
  console.log(stompClient.ws);

  // 배팅 잘못했을 때 모달
  const notMatchRound = ref(false)
  const notYourTurn = ref(false)
  const cannotBat = ref(false)

  // stompClient.ws.onclose = event => {
  //   alert("WebSocket connection closed");
  //   console.log("WebSocket connection closed");
  //   stompClient = webstomp.client("wss://i10a804.p.ssafy.io/chipchippoker")

  //   // 재연결 로직
  //   setTimeout(function() {
  //     stompClient.connect({ 'access-token': userStore.accessToken, 'heart-beat':'2000,5000' }, (frame) => {console.log('재연결 성공');})
  //   }, 100); // 0.1초 후에 다시 연결을 시도합니다.
  // }

  stompClient.connect({ 'access-token': userStore.accessToken}, (frame) => {
    console.log("Connect success", gameRoomTitle.value)

    stompClient.reconnect_delay = 2000
    // stompClient.heartbeat.outgoing = 2000;
    // stompClient.heartbeat.incoming = 0;
    console.log(stompClient);
    // 개인 메세지함 구독(기본구독)
    stompClient.subscribe(`/from/chipchippoker/member/${userStore.myNickname}`, (message) => {

      console.log('개인 메세지함 구독 성공')
      receiveMessage.value = JSON.parse(message.body).body
      console.log(receiveMessage.value)

      switch (receiveMessage.value?.code) {

        case "MS004":
          console.log('현재 진행 중인 라운드와 일치하지 않습니다.')
          notMatchRound.value = true
          break

        case "MS005":
          console.log('본인의 차례가 아닙니다.')
          notYourTurn.value = true
          break

        case "MS006":
          console.log('배팅이 불가능합니다.')
          cannotBat.value = true
          break

        case "MS007": // 게임 진행
          // 게임 데이터 저장 -> 5초건 텀 두고 데이터 받기..
          receiveStartGame(receiveMessage.value?.data)
          break

        case "ME002": // 모두 준비상태가 아닙니다
          console.log("모두 준비상태가 아닙니다");
          break
        
        case "ME003": // 방장이 아닌사람이 start 한다면
          console.log("님은 방장이 아님");
          break
      }
    })

  })


    // 구독 핸들러
    const subscribeHandler = (gameRoomTitle) => {
      
      // 토픽 구독 및 수신
      const mySubscribtion = stompClient.subscribe(`/from/chipchippoker/checkConnect/${gameRoomTitle}`, (message) => {
        console.log("subscribe success")
        // 내 구독 아이디 저장 
        
        myId.value = message.headers.subscription
        console.log(myId.value);
        console.log(message.headers);
        receiveMessage.value = JSON.parse(message.body).body
        const response = JSON.parse(message.body)
        console.log(response.body)
        switch (response.body.code) {
          case "MS001": // 방 생성
            console.log(response.body.message);
            receiveCreateRoom(response.body.data)
            break
          case "MS002": // 방 입장
            console.log(response.body.message);
            receiveJoinRoom(response.body.data)
            break
          case "MS003": // 방 나가기
            console.log(response.body.message);
            receiveExitRoom(response.body.data) 
            break     
          case "MS004": // 강퇴(타인)
          // 발행자(방장), 구독자
          // 어느 사용자가 강퇴되었는지 보여줌
          recieveBanYou(receiveMessage.value?.data)
          console.log('강퇴 함 ', receiveMessage.value?.data)
          break
        case "MS005": // 강퇴(본인)
          // 강퇴되었음을 보여줌
          // unsubscribe 시켜줌
          console.log('강퇴 당함 ', receiveMessage.value?.data)
          recieveBanMe(receiveMessage.value?.data)
          mySubscribtion.unsubscribe(myId.value, headers)
          myId.value = null
          router.push('main')
          break
        case "MS006": // 게임 준비 완료
          receiveReady(response.body.data)
          break
        // case "MS007": // 게임 시작 성공
        //   receiveStartGame(response.body.data, response.body.code)
        //   break
        case "MS008": // 라운드 종료
          receiveGameFinish(receiveMessage.value?.data)
          break
        case "200": // 매칭 완료
          console.log(response.body.message);
          receiveMatching(response.body.data)
        }
      })
    }
  
  // 게임 매칭 SEND
  const sendMatching = function(title, countOfPeople, isFirst){
    isMatch.value = true
    console.log(title, countOfPeople, isFirst)
    if (isFirst) {
      stompClient.send(`/to/game/create/${title}`, JSON.stringify({countOfPeople}), {'access-token': userStore.accessToken})
    } else {
      stompClient.send(`/to/game/enter/${title}`, JSON.stringify({}), {'access-token': userStore.accessToken})
    }
  }

  // 게임 매칭 RECEIVE ( 매칭이 완료 됐을 때!! )
  const receiveMatching = function(){
    router.push({
      name:'play',
      params: { roomId: matchStore.roomId },
      state: {
        title: matchStore.title,
        totalParticipantCnt: matchStore.totalParticipantCnt
      }
    })
  }

  // 방 생성 SEND
  const sendCreateRoom = function(title, countOfPeople){
    isMatch.value = false
    console.log(title);
    console.log(countOfPeople);
    const message = { countOfPeople }
    stompClient.send(`/to/game/create/${title}`, JSON.stringify(message), {'access-token': userStore.accessToken})
  }

  // 방 생성 RECEIVE
  const receiveCreateRoom = function(data){
    countOfPeople.value = data.countOfPeople
    player.value = data.memberInfos
    roomManagerNickname.value = data.roomManagerNickname

    if (!isMatch.value) {
      router.push({
        name:'wait',
        params: { roomId: roomStore.roomId },
        state: {
          title: roomStore.title,
          totalParticipantCnt: roomStore.totalParticipantCnt
        }
      })
    }
  }
  // 게임방 입장 SEND
  const sendJoinRoom = function(gameRoomTitle){
    isMatch.value = false
    console.log(gameRoomTitle);
    stompClient.send(`/to/game/enter/${gameRoomTitle}`, JSON.stringify({}), {'access-token': userStore.accessToken})
  }

  // 게임방 입장 RECEIVE
  const receiveJoinRoom = function(data){
    countOfPeople.value = data.countOfPeople
    player.value = data.memberInfos
    roomManagerNickname.value = data.roomManagerNickname

    if (!isMatch.value) {
      router.push({
        name:'wait',
        params: { roomId: roomStore.roomId },
        state: {
          title: roomStore.title,
          totalParticipantCnt: roomStore.totalParticipantCnt
        }
      })
    }
  }

  // 게임방 나가기 SEND
  const sendExitRoom = function (gameRoomTitle) {
    stompClient.send(`/to/game/exit/${gameRoomTitle}`, JSON.stringify({}), { 'access-token': userStore.accessToken })
  }

  // 게임방 나가기 RECEIVE
  const receiveExitRoom = function(data){
    // 내가 나갈때
    if(data.memberInfos.nickname === userStore.myNickname){
      // 게임 관련 데이터 초기화 시켜주기
      roomInfo.value = {}
      player.value = []
      roomManagerNickname.value = ''
      countOfPeople.value = 0
      myId.value = ''
      isMatch.value = false
      roundState.value = false
      currentRound.value = 0
      yourTurn.value = null
      gameMemberInfos.value = []
      bettingCoin.value = 0
      // 구독 취소하고 메인페이지로 보내기
      stompClient.unsubscribe(myId.value)
      router.push({
        name:'main'
      })

    } else {
      countOfPeople.value = data.countOfPeople
      roomManagerNickname.value = data.roomManagerNickname
      // 나가는 사람 player와 gameMemberInfos에서 삭제
      const outMemeberIdx = player.value.indexOf(data.memberInfos.nickname)
      player.value.splice(outMemeberIdx, 1)
      gameMemberInfos.value.splice(outMemeberIdx, 1)
    }    
  }

  // 게임 준비 SEND
  const sendReady = function (gameRoomTitle, isReady) {
    const message = { isReady }
    stompClient.send(`/to/game/ready/${gameRoomTitle}`, JSON.stringify(message), { 'access-token': userStore.accessToken })
  }


  // 게임 준비 RECEIVE
  const receiveReady = function(data){
    countOfPeople.value = data.countOfPeople
    player.value = data.memberInfos
    roomManagerNickname.value = data.roomManagerNickname
  }

  // 게임 시작 SEND
  const sendStartGame = function (gameRoomTitle) {
    console.log('게임시작 send');
    gameRoomTitle.value = gameRoomTitle
    stompClient.send(`/to/game/start/${gameRoomTitle}`, JSON.stringify({}), { 'access-token': userStore.accessToken })
  }

  // 게임 시작 RECEIVE
  const receiveStartGame = function (data) {
    // 게임 시작이라면 게임방으로 이동시켜주기
    if (currentRound.value === 0) {
      router.push({
        name:'play',
        params: { roomId: roomStore.roomId }
      }) 
    }

    // 게임 진행이라면 5초간 텀 두고 데이터 받아서 갱신시켜주기
    setTimeout(()=>{
      roundState.value = data?.roundState
      currentRound.value = data?.currentRound
      yourTurn.value = data?.yourTurn
      gameMemberInfos.value = []
      for (let i = 0; i < player.value.length; i++) {
        // 플레이어 순서에 맞게 데이터 넣기
        const item = data?.gameMemberInfos.filter((p)=>
        {p.nickname === player.value[i]})
        gameMemberInfos.value.push(item)
      }

      console.log('게임시작');
      console.log("roundState", roundState.value);
      console.log("currentRound", currentRound.value);
      console.log("yourTurn", yourTurn.value);
      console.log("gameMemberInfos", gameMemberInfos.value);
    },5000)

   
  }

  // 배팅
  const bet = function (gameRoomTitle, action, bettingCoin ) {
    const message = {
      currentRound:currentRound.value,
      action: action,
      bettingCoin:bettingCoin
    }
    stompClient.send(`/to/game/betting/${gameRoomTitle}`, JSON.stringify(message), { 'access-token': userStore.accessToken })
  }


  const kickUser = function (gameRoomTitle, nickname) {
    stompClient.send(`/to/game/ban/${gameRoomTitle}`, nickname, { 'access-token': userStore.accessToken })
  }


  // 강퇴 타인
  const recieveBanYou = function (response) {
    const countOfPeople = response.body.countOfPeople
    const memberInfos = response.body.memberInfos
    const roomManagerNickname = response.body.roomManagerNickname
    // 플레이어배열에서 강퇴당한 사람을 삭제합니다
    player.value.forEach((item, index) => {
      if (item.nickname === memberInfos.nickname) {
        player.value.splice(index, 1);
      }
    }
    )
  }

  // 라운드 종료
  const receiveGameFinish = function(data){
    console.log('라운드 종료');
    roundState.value = data?.roundState
    currentRound.value = data?.currentRound
    yourTurn.value = data?.yourTurn
    gameMemberInfos.value = data?.gameMemberInfos
    console.log("roundState", roundState.value);
    console.log("currentRound", currentRound.value);
    console.log("yourTurn", yourTurn.value);
    console.log("gameMemberInfos", gameMemberInfos.value);
  }

  return {
    // State
    rooms: ref([]),
    stompClient,
    roundState,
    currentRound,
    yourTurn,
    gameMemberInfos,
    player,



    // Action

    receiveMessage,
    sendMatching, receiveMatching,
    sendCreateRoom, receiveCreateRoom,
    sendJoinRoom, receiveJoinRoom,
    sendExitRoom, receiveExitRoom,
    sendReady, receiveReady,
    sendStartGame,
    bet,
    kickUser,
    subscribeHandler,
    stompClient,
    roundState,
    currentRound,
    yourTurn,
    gameMemberInfos,
    bettingCoin,
    // 배팅 시 오류 메세지
    notMatchRound,
    notYourTurn,
    cannotBat,
  }
}, { persist: true }) 
