package com.chipchippoker.backend.websocket.game.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberInfo {
	private String nickname;
	private Boolean isReady;

	public static MemberInfo create(String nickname) {
		return MemberInfo.builder()
			.nickname(nickname)
			.isReady(Boolean.FALSE)
			.build();
	}
}
