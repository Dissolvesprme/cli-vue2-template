const getters = {
  token: state => state.user.token,
  code: state => state.user.lifeCode,
  // list: state => state.user.list,
  childList: state => state.user.childList,
  parentObject: state => state.user.parentObject,
  userInfo: state => state.user.userInfo
};
export default getters;
