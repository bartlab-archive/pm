<!doctype html>
<html lang="{{ config('app.locale') }}" ng-app="app">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/css/app.css" type='text/css'>

        <base href="/">
        <title>PM</title>
    </head>
    <body>
        <toaster-container toaster-options="{'time-out': 15000,'position-class': 'toast-bottom-right'}"></toaster-container>
        <div ui-view></div>
        <script src="/js/app.js"></script>
    </body>
</html>
