package com.chipchippoker.backend.websocket.matching.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.chipchippoker.backend.common.dto.ApiResponse;
import com.chipchippoker.backend.common.dto.MessageBase;
import com.chipchippoker.backend.common.manager.MapManager;
import com.chipchippoker.backend.common.util.jwt.JwtUtil;
import com.chipchippoker.backend.websocket.game.model.GameManager;
import com.chipchippoker.backend.websocket.matching.dto.GameMatchingMessageRequest;
import com.chipchippoker.backend.websocket.matching.dto.GameMatchingMessageResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class GameMatchingController {
	private final SimpMessagingTemplate template;
	private final JwtUtil jwtUtil;
	private final MapManager mapManager;

	@MessageMapping("/game/matching/{gameRoomTitle}")
	public void gameMatching(
		@Header(name = "access-token") String accessToken,
		@DestinationVariable(value = "gameRoomTitle") String gameRoomTitle,
		GameMatchingMessageRequest gameMatchingMessageRequest
	) {
		log.info("매칭 시작");
		String nickname = jwtUtil.getNickname(accessToken);
		GameManager gameManager = mapManager.getGameManagerMap().get(gameRoomTitle);
		if (gameManager == null) {
			gameManager = new GameManager(gameRoomTitle, gameMatchingMessageRequest.getCountOfPeople(), nickname);
			gameManager.insertMember(nickname);
		} else {
			gameManager.insertMember(nickname);
		}

		if (!gameManager.getRoomManager().equals(nickname)) {
			gameManager.getMemberManagerMap().get(nickname).getMemberInfo().setIsReady(true);
		}
		mapManager.getGameManagerMap().put(gameRoomTitle, gameManager);
		broadcastAllMemberInMainRoom(gameRoomTitle, MessageBase.S200_GAME_MATCHING,
			GameMatchingMessageResponse.create(mapManager.getGameManagerMap().get(gameRoomTitle)));
		log.info("매칭 로직 종료");
	}

	private void broadcastAllMemberInMainRoom(String gameRoomTitle, MessageBase messageBase, Object object) {
		broadcastAllConnected(gameRoomTitle, ResponseEntity.ok(
			ApiResponse.messageSuccess(messageBase, object)));
	}

	public void broadcastAllConnected(String gameRoomTitle, Object object) {
		log.info("메인룸에 있는 모든 사람에게 메시지 전달 시작");
		template.convertAndSend("/from/chipchippoker/checkConnect/".concat(gameRoomTitle), object);
		log.info("메인룸에 있는 모든 사람들에게 메시지 전달 완료");
	}
}
