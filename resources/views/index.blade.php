<!doctype html>
<html lang="{{ config('app.locale') }}" ng-app="app">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}" type='text/css'>

    <base href="/">
    <title>PM</title>
</head>
<body>
<div ui-view>
    <div class="spinner-wrapper">
        <div class="spinner">
            <div class="dot1"></div>
            <div class="dot2"></div>
        </div>
    </div>
</div>


<div id="footer">
    <div class="bgl">
        <div class="bgr">
            Powered by MaybeWorks
        </div>
    </div>
</div>
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
