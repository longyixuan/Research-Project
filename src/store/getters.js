export default {
    getUserName (states) {
        return states.userName;
    },
    getTitle: (states, getters) => {
        return "标题：" + getters.getUserName;
    }
}