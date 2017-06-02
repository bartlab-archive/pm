import MainLoginController from './main-login.controller';
import MainLoginTemplate from './main-login.html';
import './main-login.scss';

const mainIndexComponent = {
    controller: MainLoginController,
    template: MainLoginTemplate,
    bindings: {
        model: '<'
    }
};

export default mainIndexComponent;