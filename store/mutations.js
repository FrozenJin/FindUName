export const setIsAuthenticated = (state, data) => {
  state.isAuthenticated = data;
};

export const setUser = (state, data) => {
  state.user = data;
};

//用户 的 openId
export const setOpenId = (state, data) => {
  state.openId  = data;
};

//选中 type : boy OR girl
export const setSelectGender = (state, data) => {
  state.selectGender = data;
};

export const setCanGenName =(state, data) => {
  state.canGenName = data;
};

export const setOneName = (state, data) => {
	state.oneName = data;
};

//多语言 index
export const setLanguageIndex = (state, data) => {
  state.languageIndex = data;
};
