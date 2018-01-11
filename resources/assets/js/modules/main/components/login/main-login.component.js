import MainLoginController from './main-login.controller';
import mainLoginTemplate from './main-login.html';
import './main-login.scss';

export default {
    name: 'mainLoginComponent',
    controller: MainLoginController,
    template: mainLoginTemplate,
    bindings: {
        model: '<'
    }
};