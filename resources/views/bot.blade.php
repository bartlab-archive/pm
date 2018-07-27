<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    <meta property="og:title" content="{{ $title ?? 'Project Manager' }}"/>
    <meta property="og:site_name" content="{{ config('app.name') }}"/>
    @if (!empty($description))
        <meta property="og:description" content="{{ $description }}"/>
    @endif
    {{--<meta property="og:image" content="" />--}}

    <base href="/">
    <title>PM</title>
</head>
<body>
</body>
</html>
