import MainLoginController from './main-login.controller';
import MainLoginTemplate from './main-login.html';
import './main-login.scss';

export default {
    name: 'mainLoginComponent',
    controller: MainLoginController,
    template: MainLoginTemplate,
    bindings: {
        model: '<'
    }
};