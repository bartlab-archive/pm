import MainLoginController from './main-login.controller';
import MainLoginTemplate from './main-login.html';

const mainIndexCompoent = {
    controller: MainLoginController,
    template: MainLoginTemplate,
    bindings: {
        login: '<'
    }
};

export default mainIndexCompoent;