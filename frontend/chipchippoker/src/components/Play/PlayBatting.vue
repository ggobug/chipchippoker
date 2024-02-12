<template>
  <!-- 배팅 보드 가운데 위치시키기 -->
  <div class="container position-absolute top-50 start-50 translate-middle battingstyle p-0 z-0" style="width: calc(100% - 620px); height: 90%;">
    <div
      class="row position-relative w-100 h-100 d-flex justify-content-center align-items-center">

      <!-- 위쪽 -->
      <div class="row col-12 justify-content-between">

        <!-- 1번 플레이어 -->
        <div class="row col-6">
          <!-- 카드 -->
          <div class="col-5">
            <img id="card" :src="getCardUrl(gameStore?.gameMemberInfos[0]?.cardInfo?.cardSet, gameStore?.gameMemberInfos[0]?.cardInfo?.cardNumber)" alt="앞장">
          </div>
          <!-- 코인 -->
          <div class="col-6 d-flex flex-column justify-content-between align-items-center">
            <!-- 보유 코인 -->
            <div class="text-white text-center mb-3"> 
              <p class="mb-1">보유코인 : {{ gameStore?.gameMemberInfos[0]?.haveCoin }}</p>
              <div class="d-flex justify-content-center flex-wrap" style="width: 100px;">
                <img style="width: 30px;" v-for="index in gameStore?.gameMemberInfos[0]?.haveCoin" :key="index"
                  class="list-overlap-small" :src="getCoinUrl(1)" alt="">
              </div>
            </div>
            <!-- 배팅 코인 -->
            <div class="text-white text-center fw-bold">
              <p class="mb-1">배팅 코인: {{ gameStore?.gameMemberInfos[0]?.bettingCoin }}</p>
              <div class="d-flex justify-content-center flex-wrap" style="width: 100px;">
                <img style="width: 30px;" v-for="index in gameStore?.gameMemberInfos[0]?.bettingCoin" :key="index"
                  class="list-overlap-small" :src="getCoinUrl(1)" alt="">
              </div>
            </div>
          </div>
          <!-- 공백 -->
          <div class="col-1">

          </div>
        </div>

        <!-- 2번 플레이어 -->
        <div class="row col-6" v-if="gameStore.memberInfos && gameStore.memberInfos.length > 1">
          <!-- 공백 -->
          <div class="col-2">

          </div>
          <!-- 코인 -->
          <div class="col-5 d-flex flex-column justify-content-between align-items-center">
            <!-- 코인 -->
            <div class="text-white text-center">
              <p class="mb-1">보유코인: {{ gameStore?.gameMemberInfos[1]?.haveCoin }}</p>
              <div class="d-flex justify-content-center flex-wrap" style="width: 100px;">
                <img style="width: 30px;" v-for="index in gameStore?.gameMemberInfos[1]?.haveCoin" :key="index"
                  class="list-overlap-small" :src="getCoinUrl(2)" alt="">
              </div>
            </div>
            <!-- 배팅 코인 이미지 -->
            <div class="text-white text-center fw-bold">
              <p class="mb-1">배팅 코인: {{ gameStore?.gameMemberInfos[1]?.bettingCoin }}</p>
              <div class="d-flex justify-content-center flex-wrap" style="width: 100px;">
                <img style="width: 30px;" v-for="index in gameStore?.gameMemberInfos[1]?.bettingCoin" :key="index"
                  class="list-overlap-small" :src="getCoinUrl(2)" alt="">
              </div>
            </div>
          </div>
          <!-- 카드 -->
          <div class="col-5">
            <img id="card" :src="getCardUrl(gameStore?.gameMemberInfos[1]?.cardInfo?.cardSet, gameStore?.gameMemberInfos[1]?.cardInfo?.cardNumber)" alt="앞장">
          </div>
        </div>
      </div>
      
      <video
        style="z-index: 2000;
        position: absolute;
        top: 0;
        left: 0;
        width: 1920px;
        height: 1080px;"
          src="/src/assets/icons/startvideo.mp4" alt="비디오 없다" controls autoplay muted>
          이 비디오를 열람할 수 없습니다
      </video>

      <!-- 아래쪽 -->
      <div class="row col-12 justify-content-between" v-if="gameStore.memberInfos && gameStore.memberInfos.length > 2">

        <!-- 3번 플레이어 -->
        <div class="row col-5" v-if="gameStore.memberInfos && gameStore.memberInfos.length > 2">
          <!-- 카드 -->
          <div class="col-5">
            <img id="card" :src="getCardUrl(gameStore?.gameMemberInfos[2]?.cardInfo?.cardSet, gameStore?.gameMemberInfos[2]?.cardInfo?.cardNumber)" alt="앞장">

          </div>
          <!-- 코인 -->
          <div class="col-6 d-flex flex-column justify-content-between align-items-center">
            <!-- 배팅 코인-->
            <div class="text-white text-center fw-bold">
              <p class="mb-1">배팅 코인: {{ gameStore?.gameMemberInfos[2]?.bettingCoin }}</p>
              <div class="d-flex justify-content-center flex-wrap" style="width: 100px;">
                <img style="width: 30px;" v-for="index in gameStore?.gameMemberInfos[2]?.bettingCoin" :key="index"
                  class="list-overlap-small" :src="getCoinUrl(3)" alt="">
              </div>
            </div>
            <!-- 보유코인 -->
            <div class="text-white text-center">
              <p class="mb-1">보유코인: {{ gameStore?.gameMemberInfos[2]?.haveCoin }}</p>
              <div class="d-flex justify-content-center flex-wrap" style="width: 100px;">
                <img style="width: 30px;" v-for="index in gameStore?.gameMemberInfos[2]?.haveCoin" :key="index"
                  class="list-overlap-small" :src="getCoinUrl(3)" alt="">
              </div>
            </div>
          </div>
          <!-- 공백 -->
          <div class="col-1">

          </div>
        </div>

        <!-- 4번 플레이어 -->
        <!-- 코인 -->
        <div class="row col-6" v-if="gameStore.memberInfos && gameStore.memberInfos.length > 3">
          <!-- 공백 -->
          <div class="col-2">

          </div>
          <!-- 코인 -->
          <div class="col-5 d-flex flex-column justify-content-between align-items-center">
            <!-- 배팅 코인 -->
            <div class="text-white text-center fw-bold">
              <p class="mb-1"></p>배팅 코인: {{ gameStore?.gameMemberInfos[3]?.bettingCoin }}
              <div class="d-flex justify-content-center flex-wrap" style="width: 100px;">
                <img style="width: 30px;" v-for="index in gameStore?.gameMemberInfos[3]?.bettingCoin" :key="index"
                  class="list-overlap-small" :src="getCoinUrl(4)" alt="">
              </div>
            </div>
            <!-- 보유 코인 -->
            <div class="text-white text-center">
              <p class="mb-1">보유코인: {{ gameStore?.gameMemberInfos[3]?.haveCoin }}</p>
              <div class="d-flex justify-content-center flex-wrap" style="width: 100px;">
                <img style="width: 30px;" v-for="index in gameStore?.gameMemberInfos[3]?.haveCoin" :key="index"
                  class="list-overlap-small" :src="getCoinUrl(4)" alt="">
              </div>
            </div>
          </div>

          <!-- 카드 -->
          <div class="col-5">
            <img id="card" :src="getCardUrl(gameStore?.gameMemberInfos[3]?.cardInfo?.cardSet, gameStore?.gameMemberInfos[3]?.cardInfo?.cardNumber)" alt="앞장">

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/game';
import { watch,computed, ref } from 'vue';
const gameStore = useGameStore()

const getCoinUrl = function (num) {
  return new URL(`/src/assets/coins/coin${num}.png`, import.meta.url).href;
};

// 카드 가져오기
const getCardUrl = function (setnum, cardnum) {
  return new URL(`/src/assets/cards/set${setnum}/card${cardnum}.png`, import.meta.url).href;
};

// 데이터 저장하기
const updateData = function(){
  gameStore.roundState = gameStore.nextRoundState
  gameStore.currentRound = gameStore.nextCurrentRound
  gameStore.yourTurn = gameStore.nextYourTurn
  gameStore.gameMemberInfos = gameStore.nextGameMemberInfos
  console.log('데이터 새로 저장');
}

const nextRoundState = computed(() => gameStore.nextRoundState); // 현재 라운드 상태 (ex. 진행중)
const nextCurrentRound = computed(() => gameStore.nextCurrentRound) // 현재 라운드

const gameStart = ref(false)
// 게임 시작 애니메이션
const startGameAnimation = function () {
    // 1. 플레이페이지 진입하면 텍스트 애니메이션 (3초 정도)
    console.log('게임 비디오 시작')
    gameStart.value = true
    setTimeout(()=>{
      gameStart.value = false
      console.log(gameStart.value);
    },3000)
    // 2. 애니메이션 종료 되면 startRoundAnimation() 호출

}

// 라운드 상태 감지
watch(() => nextRoundState.value, (newValue, oldValue) => {
  console.log('라운드 변경');
  if (newValue === true && oldValue === false) {
    if (gameStore.nextCurrentRound === 1) {
      console.log('게임시작');
      // 게임 시작
      startGameAnimation()
      updateData()
      
    } else {
      // 라운드 시작
      console.log('라운드시작');
      updateData()
    }
  }
  else if (newValue === false && oldValue === true) {
    // 라운드 종료
    console.log('라운드종료');
    updateData()
  }
})

// 턴 변화
const nextYourTurn = computed(() => gameStore.nextYourTurn);

watch(() => nextYourTurn.value, (newValue, oldValue) => {
  console.log('턴 변경');
  updateData()
})


// 라운드 시작 콜백함수
const startRoundAnimation = function () {
    // 1. 화면 가운데 카드 생성 애니메이션 (createCard)
    
    
    // 2. 각 플레이어에게 카드 분배 애니메이션 (moveCard 카드 이동)
    
    
    // 3. 분배 완료 후 카드 사라짐 (FadeoutCard)
}

// 라운드 종료 콜백함수
const endRoundAnimation = function () {
  // 1. 

  // 2. 

  // 3.
}

// 카드 생성 (가운데)
const createCard = function () {

}

// 카드 분배
const moveCard = function () {

}

// 카드 제거 (희미하게 사라짐)
const removeCard = function () {

}

// 카드 뒤집기
const flipCard = function () {

}

// 카드 모으기
const joinCard = function () {

}

// 코인 배팅
const bettingCoin = function () {

}

// 코인 이동 (승자에게)
const joinCoin = function () {

}



</script>

<style scoped>
.container {
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
}

#card {
  width: 100px;
}
</style>