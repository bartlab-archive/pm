<!doctype html>
<html lang="{{ config('app.locale') }}" ng-app="app" ng-strict-di>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}" type='text/css'>
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    <base href="/">
    <title>{{ config('app.name') }}</title>
</head>
<body>
{{--<section>--}}
    <div ui-view>
        <div class="spinner-wrapper">
            <div class="spinner">
                <div class="dot1"></div>
                <div class="dot2"></div>
            </div>
        </div>
    </div>
{{--</section>--}}

{{--<footer>--}}
    {{--Powered by MaybeWorks--}}
{{--</footer>--}}

<script src="{{ mix('js/manifest.js') }}"></script>
<script src="{{ mix('js/vendor.js') }}"></script>
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
