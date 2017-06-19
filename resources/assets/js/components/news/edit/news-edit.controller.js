import ControllerBase from 'base/controller.base';

export default class NewsEditController extends ControllerBase{

    static get $inject() {
        return ['NewsService', '$stateParams'];
    }

    $onInit() {

        this.NewsService.one(this.$stateParams.id).then((response) => {
            this.news = response.data;
            console.log(response.data);
        });



    }


}