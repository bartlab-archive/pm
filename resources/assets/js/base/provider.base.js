import ServiceBase from "./service.base";

export default class ProviderBase extends ServiceBase {

    static getName() {
        return super.getName().replace('Provider', 'Service');
    }

}