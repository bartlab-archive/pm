import MainLoginController from './main-login.controller';
import MainLoginTemplate from './main-login.html';

const mainIndexComponent = {
    controller: MainLoginController,
    template: MainLoginTemplate,
    bindings: {
        login: '<'
    }
};

export default mainIndexComponent;