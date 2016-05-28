/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);
    
    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            var website = {
                _id: (new Date()).getTime()+"",
                name: name,
                description: description
            };
            var newWebsite = WebsiteService.createWebsite(vm.uid, website);
            if (newWebsite) {
                $location.url("/user/"+vm.uid+"/website");
            } else {
                vm.error = "Unable to create website";
            }
        }
    }
})();