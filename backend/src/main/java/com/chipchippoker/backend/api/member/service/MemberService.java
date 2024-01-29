package com.chipchippoker.backend.api.member.service;

import com.chipchippoker.backend.api.member.dto.model.ProfilePageResponse;
import com.chipchippoker.backend.common.util.jwt.dto.TokenResponse;

public interface MemberService {
	ProfilePageResponse getProfilePage(Long id, String nickname);

	TokenResponse reissueToken(String originToken, Long id);
}