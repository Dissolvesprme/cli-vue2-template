const state = {
  lifeCode: sessionStorage.getItem("code") || "",
  token: "",
  parentObject: {},
  childList: [],
  userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || {},
};

const mutations = {
  // 设置token
  SET_TOKEN(context, data) {
    context.token = data;
  },
  // 设置用户信息
  SET_USER(context, data) {
    context.userInfo = data;
    window.addEventListener(
      "beforeunload",
      () => {
        sessionStorage.setItem("userInfo", JSON.stringify(data));
      },
      {
        once: true,
      }
    );
  },
};

const actions = {
  // 设置token
  async setKey(context, data) {
    await context.commit("SET_TOKEN", data);
  },
  // 用户登录
  async userLogin(context, data) {
    // const { code } = await getCode();
    // let res = await login({ code });
    // if (+res.code === 200) {
    //   let { phone } = res.data;
    //   await setToken(phone);
    //   TipsPop({
    //     message: '用户信息已验证'
    //   });
    // }
  },
  // getList(context) {
  //   axios.get('../../../public/mock/list.json').then(({ data }) => {
  //     console.log(data);
  //   });
  // }
};

export default {
  state,
  mutations,
  actions,
};
