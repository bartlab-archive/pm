<?php

namespace App\Http;

use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\HttpFoundation\Request as SymfonyRequest;
use Illuminate\Http\Request as BaseRequest;

class Request extends BaseRequest
{

    /**
     * Parameter pollution
     *
     * @var bool
     */
    protected static $pollution = true;

    public static function capture()
    {
        static::enableHttpMethodParameterOverride();

        $request = SymfonyRequest::createFromGlobals();

        if (self::$pollution === true) {
            $request->query = new ParameterBag(self::properParseStr($request->server->get('QUERY_STRING')));
        }

        return static::createFromBase($request);
    }


    public static function properParseStr($str): array
    {
        $arr = [];
        $pairs = explode('&', $str);

        // loop through each pair
        foreach ($pairs as $i) {
            list($name, $value) = explode('=', $i, 2);

            if (isset($arr[$name])) {
                if (\is_array($arr[$name])) {
                    $arr[$name][] = $value;
                } else {
                    $arr[$name] = array($arr[$name], $value);
                }
            } else {
                $arr[$name] = $value;
            }
        }

        return $arr;
    }
}