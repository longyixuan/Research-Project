import * as type from './mutations_types.js';

export default {
    [type.SETUSERNAME](states, userName) {
        states.userName = userName;
        setTimeout(() => {
            states.isloading = false;
        }, 5000);
    },
    [type.SETCOUNT](states, n) {
        states.count += n;
    }
}