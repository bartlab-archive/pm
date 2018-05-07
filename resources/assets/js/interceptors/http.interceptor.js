import InjectableBase from "base/injectable.base";

export default class HttpInterceptor extends InjectableBase {

    static get $inject() {
        return ['$rootScope', '$q'];
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
                this.$rootScope.$emit('authUnauthorized');
                break;

            case (response.status === 403):
                this.$rootScope.$emit('authForbidden');
                break;

            case (response.status === 404):
                this.$rootScope.$emit('notFound');
                break;

            case (response.status === 405):
                this.$rootScope.$emit('notAllowed');
                break;

            case (response.status === 429):
                this.$rootScope.$emit('tooManyRequests');
                break;

            case (response.status >= 500):
                this.$rootScope.$emit('serverError');
        }

        return this.$q.reject(response);
    }


}