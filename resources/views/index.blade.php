<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="stylesheet" href="{{ mix('styles.css', 'pm') }}" type='text/css'>
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    <base href="/">
    <title>{{ config('app.name') }}</title>
</head>
<body>
{{--<section>--}}
<app-root>
    <div class="spinner-wrapper">
        <div class="spinner">
            <div class="dot1"></div>
            <div class="dot2"></div>
        </div>
    </div>
</app-root>
{{--</section>--}}

{{--<footer>--}}
{{--Powered by MaybeWorks--}}
{{--</footer>--}}

<script src="{{ mix('vendor.js', 'pm') }}"></script>
<script src="{{ mix('vendors.js', 'pm') }}"></script>
<script src="{{ mix('polyfills.js', 'pm') }}"></script>
<script src="{{ mix('app.js', 'pm') }}"></script>
</body>
</html>
