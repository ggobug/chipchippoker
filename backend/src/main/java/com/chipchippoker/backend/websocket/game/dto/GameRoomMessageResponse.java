package com.chipchippoker.backend.websocket.game.dto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.chipchippoker.backend.websocket.game.model.GameManager;
import com.chipchippoker.backend.websocket.game.model.GameMemberInfo;
import com.chipchippoker.backend.websocket.game.model.MemberManager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameRoomMessageResponse {
	private Boolean roundState;
	private Integer currentRound;
	private String yourTurn;
	private List<GameMemberInfo> gameMemberInfos = new ArrayList<>();

	public static GameRoomMessageResponse createRoundProceed(
		GameManager gameManager,
		ArrayList<MemberManager> isNotTurnMemberManager,
		MemberManager isTurnMemberManager) {
		return GameRoomMessageResponse.builder()
			.roundState(Boolean.TRUE)
			.currentRound(gameManager.getCurrentRound())
			.yourTurn(gameManager.getOrder().get(gameManager.getTurnNumber()))
			.gameMemberInfos(GameMemberInfo.createListInRoundProceed(isNotTurnMemberManager, isTurnMemberManager))
			.build();
	}

	public static GameRoomMessageResponse roundEnd(
		GameManager gameManager,
		Collection<MemberManager> memberManagers
	) {
		return GameRoomMessageResponse.builder()
			.roundState(Boolean.FALSE)
			.currentRound(gameManager.getCurrentRound())
			.yourTurn(gameManager.getOrder().get(gameManager.getTurnNumber()))
			.gameMemberInfos(GameMemberInfo.createListRoundEnd(memberManagers))
			.build();
	}
}