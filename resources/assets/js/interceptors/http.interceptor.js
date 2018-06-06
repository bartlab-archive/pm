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

    // todo: add 422 error emmiter?
    responseError(response) {
        switch (true) {
            case (response.status === 401):
                this.$rootScope.$emit('authUnauthorized', response);
                break;

            case (response.status === 403):
                this.$rootScope.$emit('authForbidden', response);
                break;

            case (response.status === 404):
                this.$rootScope.$emit('notFound', response);
                break;

            case (response.status === 405):
                this.$rootScope.$emit('notAllowed', response);
                break;

            case (response.status === 429):
                this.$rootScope.$emit('tooManyRequests', response);
                break;

            case (response.status >= 500):
                this.$rootScope.$emit('serverError', response);
        }

        return this.$q.reject(response);
    }


}