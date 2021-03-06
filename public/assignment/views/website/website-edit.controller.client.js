/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.isEmptyName = false;
        vm.editWebsite = undefined;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(
                    function (response) {
                        vm.website = response.data;
                    },
                    function (error) {
                        vm.error = "Website not read";
                    });
        }
        init();

        function updateWebsite(website) {
            vm.isEmptyName = vm.editWebsite.name.$error.required;
            if(!vm.isEmptyName) {
                WebsiteService
                    .updateWebsite(vm.websiteId, website)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.uid + "/website");
                        },
                        function (error) {
                            vm.error = "Website not updated";
                        });
            }
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.uid + "/website");
                    },
                    function (error) {
                        vm.error = "Unable to delete website";
                    });
        }
    }
})();