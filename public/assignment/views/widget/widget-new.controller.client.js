/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);
    
    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            var newWebsite = WebsiteService.createWebsite(vm.uid, name, description);
            if (newWebsite) {
                $location.url("/user/"+vm.uid+"/website")
            } else {
                vm.error = "Unable to create website";
            }
        }
    }
})();