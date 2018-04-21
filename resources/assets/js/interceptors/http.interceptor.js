import InjectableBase from "base/injectable.base";

export default class HttpInterceptor extends InjectableBase {

    static get $inject() {
        return ['$rootScope'];
    }

    $return() {
        return {
            responseError: (...args) => this.responseError(...args)
        };
    }

    // request(req) {
    // ...
    // }

    // requestError(err) {
    // ...
    // }

    // response(res) {
    // ...
    // }

    responseError(response) {
        switch (true) {
            case (response.status === 401):
                this.$rootScope.$broadcast('authUnauthorized');
                break;

            case (response.status === 403):
                this.$rootScope.$broadcast('authForbidden');
                break;

            case (response.status === 404):
                this.$rootScope.$broadcast('notFound');
                break;

            case (response.status === 405):
                this.$rootScope.$broadcast('notAllowed');
                break;

            case (response.status >= 500):
                this.$rootScope.$broadcast('serverError');
        }
    }


}