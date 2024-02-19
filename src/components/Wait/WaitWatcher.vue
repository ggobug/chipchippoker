<template>
    <div class="watcher-list bg-lightblue h-100 p-2">
        <p>관전자</p>
        <ul class="not-overflow-text">
            <li class="" v-for="watcher in gameStore.watchersNickname" :key="watcher">
                {{ watcher }}</li>
        </ul>
    </div>
</template>

<script setup>
import { useRoomStore } from '@/stores/room';
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore()

</script>

<style scoped>
.watcher-list {
    border-radius: 10px;
}

p {
    color: white;
}

.not-overflow-text {
    overflow: hidden; /* 텍스트 오버플로우를 숨김 */
    text-overflow: ellipsis; /* 텍스트 오버플로우시 말줄임(...) 표시 */
    white-space: nowrap; /*텍스트가 넘치면 줄바꿈을 하지 않음*/ 
    max-height: 70px; 
    overflow-y: auto;
    /* list-style-type: none; */

}

::-webkit-scrollbar {
  width: 10px; /* 스크롤바 너비 */
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2); /* 스크롤바 썸의 배경색 */
  border-radius: 5px; /* 스크롤바 썸의 모서리 둥글게 */
}

::-webkit-scrollbar-track {
  background-color: transparent; /* 스크롤바 트랙의 배경색 투명하게 */
}

</style>