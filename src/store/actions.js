import { getUserName } from '../api/axios.js';
export default {
    setUserName: ({ commit, state}) => {
        state.isloading = true;
        getUserName().then((res) => {
            commit('SETUSERNAME', res.data.username) 
        });
    }
}