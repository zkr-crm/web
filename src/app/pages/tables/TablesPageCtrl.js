(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables')
      .controller('TablesPageCtrl', TablesPageCtrl);

  /** @ngInject */
  function TablesPageCtrl($scope, $filter, editableOptions, editableThemes) {

    $scope.smartTablePageSize = 10;

    $scope.smartTableData = [
      {
        id: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        username: '@mdo',
        email: 'mdo@gmail.com',
        age: '28'
      },
      {
        id: 2,
        firstName: 'Jacob',
        lastName: 'Thornton',
        username: '@fat',
        email: 'fat@yandex.ru',
        age: '45'
      },
      {
        id: 3,
        firstName: 'Larry',
        lastName: 'Bird',
        username: '@twitter',
        email: 'twitter@outlook.com',
        age: '18'
      },
      {
        id: 4,
        firstName: 'John',
        lastName: 'Snow',
        username: '@snow',
        email: 'snow@gmail.com',
        age: '20'
      },
      {
        id: 5,
        firstName: 'Jack',
        lastName: 'Sparrow',
        username: '@jack',
        email: 'jack@yandex.ru',
        age: '30'
      },
      {
        id: 6,
        firstName: 'Ann',
        lastName: 'Smith',
        username: '@ann',
        email: 'ann@gmail.com',
        age: '21'
      },
      {
        id: 7,
        firstName: 'Barbara',
        lastName: 'Black',
        username: '@barbara',
        email: 'barbara@yandex.ru',
        age: '43'
      },
      {
        id: 8,
        firstName: 'Sevan',
        lastName: 'Bagrat',
        username: '@sevan',
        email: 'sevan@outlook.com',
        age: '13'
      },
      {
        id: 9,
        firstName: 'Ruben',
        lastName: 'Vardan',
        username: '@ruben',
        email: 'ruben@gmail.com',
        age: '22'
      },
      {
        id: 10,
        firstName: 'Karen',
        lastName: 'Sevan',
        username: '@karen',
        email: 'karen@yandex.ru',
        age: '33'
      },
      {
        id: 11,
        firstName: 'Mark',
        lastName: 'Otto',
        username: '@mark',
        email: 'mark@gmail.com',
        age: '38'
      },
      {
        id: 12,
        firstName: 'Jacob',
        lastName: 'Thornton',
        username: '@jacob',
        email: 'jacob@yandex.ru',
        age: '48'
      },
      {
        id: 13,
        firstName: 'Haik',
        lastName: 'Hakob',
        username: '@haik',
        email: 'haik@outlook.com',
        age: '48'
      },
      {
        id: 14,
        firstName: 'Garegin',
        lastName: 'Jirair',
        username: '@garegin',
        email: 'garegin@gmail.com',
        age: '40'
      },
      {
        id: 15,
        firstName: 'Krikor',
        lastName: 'Bedros',
        username: '@krikor',
        email: 'krikor@yandex.ru',
        age: '32'
      },
      {
        "id": 16,
        "firstName": "Francisca",
        "lastName": "Brady",
        "username": "@Gibson",
        "email": "franciscagibson@comtours.com",
        "age": 11
      },
      {
        "id": 17,
        "firstName": "Tillman",
        "lastName": "Figueroa",
        "username": "@Snow",
        "email": "tillmansnow@comtours.com",
        "age": 34
      },
      {
        "id": 18,
        "firstName": "Jimenez",
        "lastName": "Morris",
        "username": "@Bryant",
        "email": "jimenezbryant@comtours.com",
        "age": 45
      },
      {
        "id": 19,
        "firstName": "Sandoval",
        "lastName": "Jacobson",
        "username": "@Mcbride",
        "email": "sandovalmcbride@comtours.com",
        "age": 32
      },
      {
        "id": 20,
        "firstName": "Griffin",
        "lastName": "Torres",
        "username": "@Charles",
        "email": "griffincharles@comtours.com",
        "age": 19
      },
      {
        "id": 21,
        "firstName": "Cora",
        "lastName": "Parker",
        "username": "@Caldwell",
        "email": "coracaldwell@comtours.com",
        "age": 27
      },
      {
        "id": 22,
        "firstName": "Cindy",
        "lastName": "Bond",
        "username": "@Velez",
        "email": "cindyvelez@comtours.com",
        "age": 24
      },
      {
        "id": 23,
        "firstName": "Frieda",
        "lastName": "Tyson",
        "username": "@Craig",
        "email": "friedacraig@comtours.com",
        "age": 45
      },
      {
        "id": 24,
        "firstName": "Cote",
        "lastName": "Holcomb",
        "username": "@Rowe",
        "email": "coterowe@comtours.com",
        "age": 20
      },
      {
        "id": 25,
        "firstName": "Trujillo",
        "lastName": "Mejia",
        "username": "@Valenzuela",
        "email": "trujillovalenzuela@comtours.com",
        "age": 16
      },
      {
        "id": 26,
        "firstName": "Pruitt",
        "lastName": "Shepard",
        "username": "@Sloan",
        "email": "pruittsloan@comtours.com",
        "age": 44
      },
      {
        "id": 27,
        "firstName": "Sutton",
        "lastName": "Ortega",
        "username": "@Black",
        "email": "suttonblack@comtours.com",
        "age": 42
      },
      {
        "id": 28,
        "firstName": "Marion",
        "lastName": "Heath",
        "username": "@Espinoza",
        "email": "marionespinoza@comtours.com",
        "age": 47
      },
      {
        "id": 29,
        "firstName": "Newman",
        "lastName": "Hicks",
        "username": "@Keith",
        "email": "newmankeith@comtours.com",
        "age": 15
      },
      {
        "id": 30,
        "firstName": "Boyle",
        "lastName": "Larson",
        "username": "@Summers",
        "email": "boylesummers@comtours.com",
        "age": 32
      },
      {
        "id": 31,
        "firstName": "Haynes",
        "lastName": "Vinson",
        "username": "@Mckenzie",
        "email": "haynesmckenzie@comtours.com",
        "age": 15
      },
      {
        "id": 32,
        "firstName": "Miller",
        "lastName": "Acosta",
        "username": "@Young",
        "email": "milleryoung@comtours.com",
        "age": 55
      },
      {
        "id": 33,
        "firstName": "Johnston",
        "lastName": "Brown",
        "username": "@Knight",
        "email": "johnstonknight@comtours.com",
        "age": 29
      },
      {
        "id": 34,
        "firstName": "Lena",
        "lastName": "Pitts",
        "username": "@Forbes",
        "email": "lenaforbes@comtours.com",
        "age": 25
      },
      {
        "id": 35,
        "firstName": "Terrie",
        "lastName": "Kennedy",
        "username": "@Branch",
        "email": "terriebranch@comtours.com",
        "age": 37
      },
      {
        "id": 36,
        "firstName": "Louise",
        "lastName": "Aguirre",
        "username": "@Kirby",
        "email": "louisekirby@comtours.com",
        "age": 44
      },
      {
        "id": 37,
        "firstName": "David",
        "lastName": "Patton",
        "username": "@Sanders",
        "email": "davidsanders@comtours.com",
        "age": 26
      },
      {
        "id": 38,
        "firstName": "Holden",
        "lastName": "Barlow",
        "username": "@Mckinney",
        "email": "holdenmckinney@comtours.com",
        "age": 11
      },
      {
        "id": 39,
        "firstName": "Baker",
        "lastName": "Rivera",
        "username": "@Montoya",
        "email": "bakermontoya@comtours.com",
        "age": 47
      },
      {
        "id": 40,
        "firstName": "Belinda",
        "lastName": "Lloyd",
        "username": "@Calderon",
        "email": "belindacalderon@comtours.com",
        "age": 21
      },
      {
        "id": 41,
        "firstName": "Pearson",
        "lastName": "Patrick",
        "username": "@Clements",
        "email": "pearsonclements@comtours.com",
        "age": 42
      },
      {
        "id": 42,
        "firstName": "Alyce",
        "lastName": "Mckee",
        "username": "@Daugherty",
        "email": "alycedaugherty@comtours.com",
        "age": 55
      },
      {
        "id": 43,
        "firstName": "Valencia",
        "lastName": "Spence",
        "username": "@Olsen",
        "email": "valenciaolsen@comtours.com",
        "age": 20
      },
      {
        "id": 44,
        "firstName": "Leach",
        "lastName": "Holcomb",
        "username": "@Humphrey",
        "email": "leachhumphrey@comtours.com",
        "age": 28
      },
      {
        "id": 45,
        "firstName": "Moss",
        "lastName": "Baxter",
        "username": "@Fitzpatrick",
        "email": "mossfitzpatrick@comtours.com",
        "age": 51
      },
      {
        "id": 46,
        "firstName": "Jeanne",
        "lastName": "Cooke",
        "username": "@Ward",
        "email": "jeanneward@comtours.com",
        "age": 59
      },
      {
        "id": 47,
        "firstName": "Wilma",
        "lastName": "Briggs",
        "username": "@Kidd",
        "email": "wilmakidd@comtours.com",
        "age": 53
      },
      {
        "id": 48,
        "firstName": "Beatrice",
        "lastName": "Perry",
        "username": "@Gilbert",
        "email": "beatricegilbert@comtours.com",
        "age": 39
      },
      {
        "id": 49,
        "firstName": "Whitaker",
        "lastName": "Hyde",
        "username": "@Mcdonald",
        "email": "whitakermcdonald@comtours.com",
        "age": 35
      },
      {
        "id": 50,
        "firstName": "Rebekah",
        "lastName": "Duran",
        "username": "@Gross",
        "email": "rebekahgross@comtours.com",
        "age": 40
      },
      {
        "id": 51,
        "firstName": "Earline",
        "lastName": "Mayer",
        "username": "@Woodward",
        "email": "earlinewoodward@comtours.com",
        "age": 52
      },
      {
        "id": 52,
        "firstName": "Moran",
        "lastName": "Baxter",
        "username": "@Johns",
        "email": "moranjohns@comtours.com",
        "age": 20
      },
      {
        "id": 53,
        "firstName": "Nanette",
        "lastName": "Hubbard",
        "username": "@Cooke",
        "email": "nanettecooke@comtours.com",
        "age": 55
      },
      {
        "id": 54,
        "firstName": "Dalton",
        "lastName": "Walker",
        "username": "@Hendricks",
        "email": "daltonhendricks@comtours.com",
        "age": 25
      },
      {
        "id": 55,
        "firstName": "Bennett",
        "lastName": "Blake",
        "username": "@Pena",
        "email": "bennettpena@comtours.com",
        "age": 13
      },
      {
        "id": 56,
        "firstName": "Kellie",
        "lastName": "Horton",
        "username": "@Weiss",
        "email": "kellieweiss@comtours.com",
        "age": 48
      },
      {
        "id": 57,
        "firstName": "Hobbs",
        "lastName": "Talley",
        "username": "@Sanford",
        "email": "hobbssanford@comtours.com",
        "age": 28
      },
      {
        "id": 58,
        "firstName": "Mcguire",
        "lastName": "Donaldson",
        "username": "@Roman",
        "email": "mcguireroman@comtours.com",
        "age": 38
      },
      {
        "id": 59,
        "firstName": "Rodriquez",
        "lastName": "Saunders",
        "username": "@Harper",
        "email": "rodriquezharper@comtours.com",
        "age": 20
      },
      {
        "id": 60,
        "firstName": "Lou",
        "lastName": "Conner",
        "username": "@Sanchez",
        "email": "lousanchez@comtours.com",
        "age": 16
      }
    ];

    $scope.editableTableData = $scope.smartTableData.slice(0, 36);

    $scope.peopleTableData = [
      {
        id: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        username: '@mdo',
        email: 'mdo@gmail.com',
        age: '28',
        status: 'info'
      },
      {
        id: 2,
        firstName: 'Jacob',
        lastName: 'Thornton',
        username: '@fat',
        email: 'fat@yandex.ru',
        age: '45',
        status: 'primary'
      },
      {
        id: 3,
        firstName: 'Larry',
        lastName: 'Bird',
        username: '@twitter',
        email: 'twitter@outlook.com',
        age: '18',
        status: 'success'
      },
      {
        id: 4,
        firstName: 'John',
        lastName: 'Snow',
        username: '@snow',
        email: 'snow@gmail.com',
        age: '20',
        status: 'danger'
      },
      {
        id: 5,
        firstName: 'Jack',
        lastName: 'Sparrow',
        username: '@jack',
        email: 'jack@yandex.ru',
        age: '30',
        status: 'warning'
      }
    ];

    $scope.metricsTableData = [
      {
        image: 'app/browsers/chrome.svg',
        browser: 'Google Chrome',
        visits: '10,392',
        isVisitsUp: true,
        purchases: '4,214',
        isPurchasesUp: true,
        percent: '45%',
        isPercentUp: true
      },
      {
        image: 'app/browsers/firefox.svg',
        browser: 'Mozilla Firefox',
        visits: '7,873',
        isVisitsUp: true,
        purchases: '3,031',
        isPurchasesUp: false,
        percent: '28%',
        isPercentUp: true
      },
      {
        image: 'app/browsers/ie.svg',
        browser: 'Internet Explorer',
        visits: '5,890',
        isVisitsUp: false,
        purchases: '2,102',
        isPurchasesUp: false,
        percent: '17%',
        isPercentUp: false
      },
      {
        image: 'app/browsers/safari.svg',
        browser: 'Safari',
        visits: '4,001',
        isVisitsUp: false,
        purchases: '1,001',
        isPurchasesUp: false,
        percent: '14%',
        isPercentUp: true
      },
      {
        image: 'app/browsers/opera.svg',
        browser: 'Opera',
        visits: '1,833',
        isVisitsUp: true,
        purchases: '83',
        isPurchasesUp: true,
        percent: '5%',
        isPercentUp: false
      }
    ];

    $scope.users = [
      {
        "id": 1,
        "name": "Esther Vang",
        "status": 4,
        "group": 3
      },
      {
        "id": 2,
        "name": "Leah Freeman",
        "status": 3,
        "group": 1
      },
      {
        "id": 3,
        "name": "Mathews Simpson",
        "status": 3,
        "group": 2
      },
      {
        "id": 4,
        "name": "Buckley Hopkins",
        "group": 4
      },
      {
        "id": 5,
        "name": "Buckley Schwartz",
        "status": 1,
        "group": 1
      },
      {
        "id": 6,
        "name": "Mathews Hopkins",
        "status": 4,
        "group": 2
      },
      {
        "id": 7,
        "name": "Leah Vang",
        "status": 4,
        "group": 1
      },
      {
        "id": 8,
        "name": "Vang Schwartz",
        "status": 4,
        "group": 2
      },
      {
        "id": 9,
        "name": "Hopkin Esther",
        "status": 1,
        "group": 2
      },
      {
        "id": 10,
        "name": "Mathews Schwartz",
        "status": 1,
        "group": 3
      }
    ];

    $scope.statuses = [
      {value: 1, text: 'Good'},
      {value: 2, text: 'Awesome'},
      {value: 3, text: 'Excellent'},
    ];

    $scope.groups = [
      {id: 1, text: 'user'},
      {id: 2, text: 'customer'},
      {id: 3, text: 'vip'},
      {id: 4, text: 'admin'}
    ];

    $scope.showGroup = function(user) {
      if(user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : 'Not set';
      } else return 'Not set'
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if(user.status) {
        selected = $filter('filter')($scope.statuses, {value: user.status});
      }
      return selected.length ? selected[0].text : 'Not set';
    };


    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null
      };
      $scope.users.push($scope.inserted);
    };

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';


  }

})();
