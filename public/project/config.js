/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home-page.view.client.html"
            })
            .when("/event", {
                templateUrl: "views/event/events.view.client.html",
                controller: "EventsController",
                controllerAs: "model"
            })
            .when("/:uid/admin", {
                templateUrl: "views/admin/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkAdmin
                }
            })
            .when("/:uid/admin/users", {
                templateUrl: "views/admin/admin-user.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkAdmin
                }
            })
            .when("/login", {
                templateUrl: "views/user/login-register.view.client.html",
                controller: "LoginRegController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "UserProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "UserProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/event", {
                templateUrl: "views/event/event-list.view.client.html",
                controller: "EventsController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/event/:eventId", {
                templateUrl: "views/event/event-details.view.client.html",
                controller: "EventDetailController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/event/:eventId/invite", {
                templateUrl: "views/event/invites.view.client.html",
                controller: "InviteController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/invites", {
                templateUrl: "views/event/invite-list.view.client.html",
                controller: "InviteListController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/"
            });

        function checkLoggedIn(UserService, $location, $q, $rootScope) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        // console.log(user);
                        if(user == '0') {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (error) {
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }

        function checkAdmin(UserService, $location, $q, $rootScope)
        {
            var deferred = $q.defer();
            // console.log("in checkAdmin config");

            UserService
                .loggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        $rootScope.errorMessage = null;
                        // User is Authenticated
                        if (user !== '0' && user.roles.indexOf("admin") > -1) {
                            $rootScope.user = user;
                            deferred.resolve();
                        }
                        else if (user == '0') {
                            alert("You need to log in.");
                            deferred.reject();
                            $location.url('/login');
                        }
                        else {
                            $location.url('/');
                        }
                    });
            return deferred.promise;
        }
    }
})();