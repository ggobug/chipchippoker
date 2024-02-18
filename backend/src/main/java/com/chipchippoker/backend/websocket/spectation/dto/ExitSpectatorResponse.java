package com.chipchippoker.backend.websocket.spectation.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExitSpectatorResponse {
	private List<String> spectatorList;

	public static ExitSpectatorResponse create(List<String> spectators) {
		return ExitSpectatorResponse.builder()
			.spectatorList(spectators)
			.build();
	}
}
