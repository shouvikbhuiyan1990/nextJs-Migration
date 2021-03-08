import axios from 'axios';
import { logout } from './helpers';

(function () {
    axios.interceptors.response.use(undefined, err => {
        const status = err.response ? err.response.status : null;
        if (status === 401) {
            logout();
        }
    });
})();